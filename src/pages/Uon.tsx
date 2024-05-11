import Carta from "../components/Carta";
import { ICarta } from "../model/Carta";
import { Game } from "../model/Game";
import { Player } from "../model/Player";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Uon.css"
import baralho, { block } from "../model/Baralho";
import { getRandomInt } from "../service/functions";

const Uon: React.FC = () => {

    const { numberOfPlayers } = useParams<{ numberOfPlayers: string }>();
    const nop = parseInt(numberOfPlayers || "4", 10);
    const numberPlayers:number = nop < 2 ? 2 : nop > 4 ? 4 : nop;

    const playerModel: Player = {id: 0, cards: baralho, comprar: ()=> {return []}, jogar: () => {}, podeJogar: () => {return false}};

    const [game] = useState<Game>(new Game(numberPlayers));
    const [players, setPlayers] = useState<Player[]>([playerModel]);
    const [auxPlayers, setAuxPlayers] = useState<Player[]>(players);
    const [lastCard, setLastCard] = useState<ICarta>(baralho[getRandomInt(1, baralho.length - 2) - 1]);

    const listaDeCores = ["red", "green", "blue", "yellow"];

    useEffect(() => {
        const arrayDePlayers:Player[] = game.gameStart();
        setPlayers(arrayDePlayers);
        setAuxPlayers(arrayDePlayers);
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
        const firstPlayer:Player = jogadores[0]
        const newPlayers:Player[] = [...jogadores];
        newPlayers.splice(0,1);
        newPlayers.push(firstPlayer);
        setAuxPlayers(newPlayers);
    }

    async function awaitForNextPlay() {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    function executaCarta(carta:ICarta) {
        if (carta.name === "+4") {
            if (auxPlayers[0].id === 1) {
                carta.power(auxPlayers, carta, listaDeCores[getRandomInt(0, listaDeCores.length)]);
            } else {
                carta.power(auxPlayers, carta, listaDeCores[getRandomInt(0, listaDeCores.length)]);
            }
            setAuxPlayers(block(auxPlayers))
        } else if (carta.name === "+2") {
            carta.power(auxPlayers)
            setAuxPlayers(block(auxPlayers))
        } else if (carta.name === "block") {
            setAuxPlayers(carta.power(auxPlayers))
        } else if (carta.name === "reverse") {
            setAuxPlayers(carta.power(auxPlayers))
        } else if (carta.name === "change_color") {
            carta.power(carta, listaDeCores[getRandomInt(0, listaDeCores.length)]);
            carta.color = listaDeCores[getRandomInt(0,listaDeCores.length)];
        }

    }

    async function jogadaDosAdversarios() {

        if (auxPlayers[0].id !== 1 && auxPlayers[0].id !== 0) {

            const jogadorAtual = auxPlayers[0];

            let temCarta:boolean = false;

            while (temCarta === false) {

                for (let i:number = 0; i < jogadorAtual.cards.length; i++) {
                    if (jogadorAtual.podeJogar(lastCard, jogadorAtual.cards[i])) {
                        setLastCard(jogadorAtual.cards[i]);
                        jogadorAtual.jogar(jogadorAtual.cards[i])
                        executaCarta(jogadorAtual.cards[i])
                        temCarta = true;
                        break
                    } else {
                        jogadorAtual.comprar();
                    }
                }

            }

            passaParaOProximo(auxPlayers);

            await awaitForNextPlay();

        }

    }

    const compra = () => {
        if (auxPlayers[0].id === 1) {
            const novaLista = [...players]
            novaLista[0].cards = novaLista[0].comprar()
            setPlayers(novaLista)
        }
    }

    function checaJogada(jogador: Player, carta: ICarta) {
        if (auxPlayers[0].id === 1) {
            if (jogador.podeJogar(lastCard, carta)) {
                jogador.jogar(carta);
                executaCarta(carta)
                passaParaOProximo(auxPlayers)
                const last = carta;
                setLastCard(last);
            } else {
                alert("Esta carta não pode ser jogada agora!");
            }
        }
    }

    function printCartas(cards: ICarta[]) {
        return cards.map((carta: ICarta) => {
            return <div className="divClick" onClick={() => checaJogada(auxPlayers[0], carta)}><Carta  key={carta.id} id={carta.id} name={carta.name} color={carta.color} power={carta.power}></Carta></div>
        })
    }

    const printaInimigos = players.map((player:Player, index) => {
            if (index != 0) {
                return <div className="row"><h2>Jogador {player.id}</h2><h3>Cartas: {player.cards.length}</h3></div>
            }
        }
    )

    const ordem = auxPlayers.map((pl, index) => <h4 key={index}>{pl.id}</h4>)

    return (
        <div className="uon">
            <h1>Última carta:</h1>
            <div className="row">
                <div className="column">
                    <h1>Vez do jogador {auxPlayers[0].id}</h1>
                    {ordem}
                </div>
                <div className="deck">
                    <Carta {...lastCard}></Carta>
                </div>
                <div className="column">
                    <h1>Adversários:</h1>
                    {printaInimigos}
                </div>
            </div>
            <h1>Suas cartas:</h1>
            <div className="row">
                <div className="deck">
                    {printCartas(players[0].cards)}
                </div>
                <button onClick={compra} style={{alignSelf:"flex-start", marginLeft:"1rem"}}>COMPRAR</button>
            </div>
        </div>
    )


}

export default Uon;