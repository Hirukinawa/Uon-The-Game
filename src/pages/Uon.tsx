import Carta from "../components/Carta";
import { ICarta } from "../model/Carta";
import { Game } from "../model/Game";
import { Player } from "../model/Player";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Uon.css"
import baralho from "../model/Baralho";

const Uon: React.FC = () => {

    const { numberOfPlayers } = useParams<{ numberOfPlayers: string }>();
    const nop = parseInt(numberOfPlayers || "4", 10);
    const numberPlayers:number = nop < 2 ? 2 : nop > 4 ? 4 : nop;

    const [game] = useState<Game>(new Game(numberPlayers));
    const [players, setPlayers] = useState<Player[]>([{id: 0, cards: baralho, comprar: ()=> {}}]);

    useEffect(() => {
        setPlayers(game.gameStart())
    }, []);


    function printCartas(cards: ICarta[]) {
        return cards.map((carta: ICarta) => {
            return <Carta key={carta.id} id={carta.id} name={carta.name} color={carta.color} power={carta.power}></Carta>
        })
    }

    return (
        <div className="uon">
            {numberPlayers}
            <div className="deck">
                {printCartas(players[0].cards)}
            </div>
        </div>
    )


}

export default Uon;