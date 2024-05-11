import Carta from "../components/Carta";
import { ICarta } from "../model/Carta";
import { Game } from "../model/Game";
import { Player } from "../model/Player";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Uon.css"
import baralho from "../model/Baralho";
import { getRandomInt } from "../service/functions";

const Uon: React.FC = () => {

    const { numberOfPlayers } = useParams<{ numberOfPlayers: string }>();
    const nop = parseInt(numberOfPlayers || "4", 10);
    const numberPlayers:number = nop < 2 ? 2 : nop > 4 ? 4 : nop;

    const playerModel: Player = {id: 0, cards: baralho, comprar: ()=> {}, jogar: () => {}, podeJogar: () => {return false}};

    const [game] = useState<Game>(new Game(numberPlayers));
    const [players, setPlayers] = useState<Player[]>([playerModel]);
    const [auxPlayers, setAuxPlayers] = useState<Player[]>(players);
    const [lastCard, setLastCard] = useState<ICarta>(baralho[getRandomInt(1, baralho.length - 2) - 1])

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
        console.log("Passou")
    }

    async function awaitForNextPlay() {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    async function jogadaDosAdversarios() {

        if (auxPlayers[0].id !== 1 && auxPlayers[0].id !== 0) {

            const jogadorAtual = auxPlayers[0];
            console.log(`Vez do jogador: ${jogadorAtual.id}`)

            for (let i:number = 0; i < jogadorAtual.cards.length; i++) {
                if (jogadorAtual.podeJogar(lastCard, jogadorAtual.cards[i])) {
                    setLastCard(jogadorAtual.cards[i]);
                    jogadorAtual.jogar(jogadorAtual.cards[i])
                } else {
                    jogadorAtual.comprar();
                }
            }

            passaParaOProximo(auxPlayers);

            await awaitForNextPlay();

        }

    }

    function checaJogada(jogador: Player, carta: ICarta) {
        if (jogador.podeJogar(lastCard, carta)) {
            jogador.jogar(carta);
            passaParaOProximo(auxPlayers)
            setLastCard(carta);
        } else {
            alert("Esta carta não pode ser jogada agora!");
        }
    }


    function printCartas(cards: ICarta[]) {
        return cards.map((carta: ICarta) => {
            return <div className="divClick" onClick={() => checaJogada(players[0], carta)}><Carta  key={carta.id} id={carta.id} name={carta.name} color={carta.color} power={carta.power}></Carta></div>
        })
    }

    const printaInimigos = players.map((player:Player, index) => {
            if (index != 0) {
                return <div className="row"><h2>Jogador {player.id}</h2><h3>Cartas: {player.cards.length}</h3></div>
            }
        }
    )

    return (
        <div className="uon">
            <h1>Última carta:</h1>
            <div className="row">
                <h1>Vez do jogador {auxPlayers[0].id}</h1>
                <div className="deck">
                    {printCartas([lastCard])}
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
                <button onClick={() => players[0].comprar()} style={{alignSelf:"flex-start", marginLeft:"1rem"}}>COMPRAR</button>
            </div>
        </div>
    )


}

export default Uon;