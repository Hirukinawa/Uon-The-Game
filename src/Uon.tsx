import { useEffect, useState } from "react";
import { Player } from "./model/Player";
import { Game } from "./model/Game";
import { ICarta } from "./model/Carta";
import Carta from "./view/Carta";
import baralho from "./model/Baralho";

export default function Uon() {
    const [players, setPlayers] = useState<Player[]>([{id: 0, cards: baralho, comprar: () => {}}]);
    const [actualPlayer, setActualPlayer] = useState(new Player(0, baralho));
    const [game] = useState(new Game);

    function printCartas(cards: ICarta[]) {
    return cards.map((carta: ICarta) => {
        return <Carta key={carta.id} id={carta.id} name={carta.name} color={carta.color} power={carta.power}></Carta>
        })
    }

    useEffect(() => {
        setPlayers(game.gameStart(players, actualPlayer));
    }, []);

    useEffect(() => {
        setActualPlayer(players[0]);
    },[players]);

    return (
        <section>
            <h1>Uon</h1>
            <h2>The Game</h2>
            <h3>Cartas:</h3>
            <div className='deck'>
                {players[0].cards.length > 1 ? printCartas(players[0].cards) : printCartas(baralho)}
            </div>
        </section>
    )
}