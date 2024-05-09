import Carta from "../components/Carta";
import { ICarta } from "../model/Carta";
import { Game } from "../model/Game";
import { Player } from "../model/Player";
import baralho from "../model/Baralho";
import { useEffect, useState } from "react";

function Uon() {

    const [jogo, setJogo] = useState(new Game());

    useEffect(() => {
        jogo.gameStart
    },[]);

    function printCartas(cards: ICarta[]) {
        return cards.map((carta: ICarta) => {
          return <Carta key={carta.id} id={carta.id} name={carta.name} color={carta.color} power={carta.power}></Carta>
        })
    }

    return (
        <div>
        </div>
    )


}

export default Uon;