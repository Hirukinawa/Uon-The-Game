import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carta from "../components/Carta";
import { ICarta } from "../model/Carta";
import { Game } from "../model/Game";
import { Player } from "../model/Player";
import baralho from "../model/Baralho";
import { getRandomInt } from "../service/functions";
import Modal from '../components/Modal';
import "../styles/Uon.css";
import EnemyCard from "../components/EnemyCard";

const Uon: React.FC = () => {
    const { numberOfPlayers } = useParams<{ numberOfPlayers: string }>();
    const nop = parseInt(numberOfPlayers || "4", 10);
    const numberPlayers = Math.max(2, Math.min(4, nop));

    const playerModel: Player = {
        id: 0, cards: baralho, comprar: () => { return [] }, jogar: () => { }, podeJogar: () => { return false }
    };

    const [game] = useState<Game>(new Game(numberPlayers));
    const [players, setPlayers] = useState<Player[]>([playerModel]);
    const [auxPlayers, setAuxPlayers] = useState<Player[]>(players);
    const [lastCard, setLastCard] = useState<ICarta>(baralho[getRandomInt(1, baralho.length - 2) - 1]);
    const [winner, setWinner] = useState<number>(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingCard, setPendingCard] = useState<ICarta | null>(null);

    const listaDeCores = ["red", "green", "blue", "yellow"];

    useEffect(() => {
        iniciarJogo();
    }, []);

    useEffect(() => {
        if (auxPlayers.length > 0 && auxPlayers[0].id !== 0 && auxPlayers[0].id !== 1) {
            const timer = setTimeout(() => {
                jogadaDosAdversarios();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [auxPlayers]);

    function passaParaOProximo(jogadores: Player[]) {
        const firstPlayer: Player = jogadores[0];
        const newPlayers: Player[] = jogadores.filter((j: Player) => j.id !== firstPlayer.id);
        newPlayers.push(firstPlayer);
        setAuxPlayers(newPlayers);
    }

    async function awaitForNextPlay() {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    function executaCarta(carta: ICarta, corEscolhida?: string): Player[] {
        let updatedPlayers: Player[] = [...auxPlayers];

        try {
            if (carta.name === "+4" || carta.name === "change_color") {
                if (auxPlayers[0].id === players[0].id) {
                    if (corEscolhida) {
                        updatedPlayers = carta.power(auxPlayers, carta, corEscolhida);
                    }
                } else {
                    updatedPlayers = carta.power(auxPlayers, carta, listaDeCores[getRandomInt(0, listaDeCores.length)]);
                }
            } else if (carta.name === "+2") {
                updatedPlayers = carta.power(auxPlayers);
            } else if (carta.name === "block") {
                updatedPlayers = carta.power(auxPlayers)
            } else if (carta.name === "reverse") {
                updatedPlayers = carta.power(auxPlayers)
            }
        } catch (error) {
            console.log("Erro ao executar a carta", error);
            return auxPlayers;
        }
        return updatedPlayers;
    }

    async function jogadaDosAdversarios() {
        if (auxPlayers[0].id !== 1 && auxPlayers[0].id !== 0) {
            const jogador = auxPlayers[0];
            let temCarta: boolean = false;

            for (let i = 0; i < jogador.cards.length; i++) {
                const carta: ICarta = jogador.cards[i];
                if (jogador.podeJogar(lastCard, carta)) {
                    jogador.jogar(carta);
                    if (jogador.cards.length === 0) setWinner(jogador.id);
                    const updatedPlayers: Player[] = executaCarta(carta);
                    passaParaOProximo(updatedPlayers);
                    setLastCard(carta);
                    temCarta = true;
                    break;
                }
            }

            while (!temCarta) {
                jogador.comprar();
                const novaCarta = jogador.cards[jogador.cards.length - 1];
                if (jogador.podeJogar(lastCard, novaCarta)) {
                    jogador.jogar(novaCarta);
                    const updatedPlayers: Player[] = executaCarta(novaCarta);
                    passaParaOProximo(updatedPlayers);
                    setLastCard(novaCarta);
                    temCarta = true;
                }
            }
            await awaitForNextPlay();
            if (jogador.cards.length === 0) setWinner(jogador.id);
        }
    }

    const compra = () => {
        if (auxPlayers[0].id === 1) {
            const novaLista = [...players];
            novaLista[0].cards = novaLista[0].comprar();
            setPlayers(novaLista);
        }
    }

    function checaJogada(jogador: Player, carta: ICarta) {
        if (auxPlayers[0].id === 1) {
            if (jogador.podeJogar(lastCard, carta)) {
                if (carta.name === "+4" || carta.name === "change_color") {
                    setIsModalOpen(true);
                    setPendingCard(carta);
                } else {
                    jogador.jogar(carta);
                    if (jogador.cards.length === 0) setWinner(jogador.id);
                    passaParaOProximo(executaCarta(carta));
                    if (carta.color === undefined) carta.color = listaDeCores[getRandomInt(0, listaDeCores.length - 1)]
                    setLastCard(carta);
                }
            } else {
                alert(`Esta carta não pode ser jogada agora! ${carta.color} != ${lastCard.color} | ${carta.name} != ${lastCard.name}`);
            }
        }
    }

    function printCartas(cards: ICarta[]) {
        return cards.map((carta: ICarta, index) => (
            <div className="divClick" onClick={() => checaJogada(auxPlayers[0], carta)} key={index}>
                <Carta id={carta.id} name={carta.name} color={carta.color} power={carta.power}></Carta>
            </div>
        ));
    }

    const printaInimigos = players.map((player: Player, index) => {
        if (index !== 0) {
            return (
                <div className="row" key={index}>
                    {window.innerWidth < 800
                    ? <h4>{player.id} <EnemyCard /> x{player.cards.length}</h4>
                    : <h4>Jogador {player.id} <EnemyCard /> x{player.cards.length}</h4>
                    }
                </div>
            );
        }
    });

    function restart() {
        iniciarJogo();
    }

    function iniciarJogo() {
        setWinner(-1);
        const arrayDePlayers: Player[] = game.gameStart();
        setPlayers(arrayDePlayers);
        setAuxPlayers(arrayDePlayers);
    }

    const handleModalChoice = (choice: string) => {
        if (pendingCard) {
            const jogador = auxPlayers[0];
            jogador.jogar(pendingCard);
            if (jogador.cards.length === 0) setWinner(jogador.id);
            const updatedPlayers = executaCarta(pendingCard, choice);
            passaParaOProximo(updatedPlayers);
            setLastCard(pendingCard);
            setPendingCard(null);
            setIsModalOpen(false);
        }
    };

    if (lastCard.color === undefined && auxPlayers[0].id === 1) alert(`[ERRO] Você pode jogar qualquer carta!`)

    const ordem = auxPlayers.map((pl, index) => index === nop - 1 ? <h4 key={index}>{pl.id}</h4> : <h4 style={{marginRight: "4px"}} key={index}>{`${pl.id} -`}</h4>);

    return (
        <div className="uon">
            {winner > 0 ? (
                <div className="divRestart">
                    <h1>{winner > 1 ? `Jogador ${winner} venceu` : `Você venceu`}</h1>
                    <button id="buttonRestart" onClick={restart}>REINICIAR</button>
                </div>
            ) : (
                <div className="uon">
                    <div id="rowOrdem" className="row">
                        <h5>Ordem:</h5>
                            {ordem}
                        </div>
                    <div className="row">
                        <div className="deck">
                            <Carta {...lastCard}></Carta>
                        </div>
                        <div id="enemyCards" className="column">
                            {printaInimigos}
                        </div>
                    </div>
                    <button id="compraButton" onClick={compra} style={{ marginLeft: "1rem" }}>COMPRAR</button>
                    <div id="yourCards" className="deck">
                        {printCartas(players[0].cards)}
                    </div>
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onChoice={handleModalChoice} />
        </div>
    );
}

export default Uon;
