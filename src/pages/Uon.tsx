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
    const [lastCard, setLastCard] = useState<ICarta>(baralho[getRandomInt(1, baralho.length - 2) - 1])

    useEffect(() => {
        setPlayers(game.gameStart())
    }, []);

    function checaJogada(jogador: Player, carta: ICarta) {
        if (jogador.podeJogar(lastCard, carta)) {
            jogador.jogar(carta);
            setLastCard(carta);
            console.log(jogador.podeJogar(lastCard, carta))
        } else {
            alert("Esta carta não pode ser jogada agora!");
        }
    }


    function printCartas(cards: ICarta[]) {
        return cards.map((carta: ICarta) => {
            return <div className="divClick" onClick={() => checaJogada(players[0], carta)}><Carta  key={carta.id} id={carta.id} name={carta.name} color={carta.color} power={carta.power}></Carta></div>
        })
    }

    return (
        <div className="uon">
            <h1>Última carta:</h1>
            <div className="deck">
                {printCartas([lastCard])}
            </div>
            <h1>Cartas do jogador:</h1>
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