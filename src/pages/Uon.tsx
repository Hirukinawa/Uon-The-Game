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

            while (!temCarta) {
                for (let i = 0; i < jogador.cards.length; i++) {
                    if (jogador.podeJogar(lastCard, jogador.cards[i])) {
                        jogador.jogar(jogador.cards[i]);
                        if (jogador.cards.length === 0) setWinner(jogador.id);
                        const updatedPlayers: Player[] = executaCarta(jogador.cards[i]);
                        passaParaOProximo(updatedPlayers);
                        setLastCard(jogador.cards[i]);
                        temCarta = true;
                        break;
                    } else {
                        jogador.comprar();
                    }
                }
            }

            await awaitForNextPlay();
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
                    setLastCard(carta);
                }
            } else {
                alert(`Esta carta não pode ser jogada agora! ${carta.color} != ${lastCard.color} | ${carta.name} != ${lastCard.name}`);
            }
        }
    }

    function printCartas(cards: ICarta[]) {
        return cards.map((carta: ICarta) => (
            <div className="divClick" onClick={() => checaJogada(auxPlayers[0], carta)} key={carta.id}>
                <Carta id={carta.id} name={carta.name} color={carta.color} power={carta.power}></Carta>
            </div>
        ));
    }

    const printaInimigos = players.map((player: Player, index) => {
        if (index !== 0) {
            return (
                <div className="row" key={index}>
                    <h3>Jogador {player.id} <EnemyCard /> x{player.cards.length}</h3>
                </div>
            );
        }
    });

    function restart() {
        iniciarJogo();
    }

    /* function acabar() {
        setWinner(1);
    } */

    function iniciarJogo() {
        setWinner(0);
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

    const ordem = auxPlayers.map((pl, index) => <h4 key={index}>{pl.id}</h4>);

    return (
        <div className="uon">
            {winner > 0 ? (
                <div>
                    <h1>Jogador {winner} venceu</h1>
                    <button onClick={restart}>Recomeçar</button>
                </div>
            ) : (
                <div className="uon">
                    <div className="row">
                        <div className="column">
                            <h1>Vez do jogador {auxPlayers[0].id}</h1>
                            {ordem}
                        </div>
                        <div>
                            <p>{lastCard.name}</p>
                            <p>{lastCard.color}</p>
                        </div>
                        <div className="deck">
                            <Carta {...lastCard}></Carta>
                        </div>
                        <div id="enemyCards" className="column">
                            {printaInimigos}
                        </div>
                    </div>
                    <button onClick={compra} style={{ marginLeft: "1rem" }}>COMPRAR</button>
                    <div className="deck">
                        {printCartas(players[0].cards)}
                    </div>
                    {/* <button onClick={acabar} style={{ marginLeft: "1rem" }}>Acabar</button> */}
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onChoice={handleModalChoice} />
        </div>
    );
}

export default Uon;
