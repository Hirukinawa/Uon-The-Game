
import { getRandomInt } from "../service/functions";
import baralho from "./Baralho";
import { ICarta } from "./Carta";
import { Player } from "./Player";

export class Game {

    numberOfPlayers: number;

    constructor (numberOfPlayers: number) {
        this.numberOfPlayers = numberOfPlayers;
    }

    distribuiCartas(): ICarta[] {
        let cartas: ICarta[] = [];
        for (let i:number = 0; i < 7; i++) {
            const newNumber = getRandomInt(0, baralho.length - 1);
            const newCard:ICarta = {id: baralho[newNumber].id, name:  baralho[newNumber].name, power:  baralho[newNumber].power, color:  baralho[newNumber].color}
            cartas.push(newCard)
            /* cartas.push(baralho[getRandomInt(1, baralho.length) - 1]); */
        }
        return cartas;
    }

    gameStart(): Player[] {
        var players: Player[] = [];

        for (let i = 0; i < this.numberOfPlayers; i++) {
            players.push(new Player(i + 1, this.distribuiCartas()));
        }
        return players;
    }
}