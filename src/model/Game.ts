
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
        for (let i:number = 0; i < 9; i++) {
            cartas.push(baralho[getRandomInt(1, baralho.length) - 1]);
        }
        return cartas;
    }

    gameStart(): Player[] {
        var players: Player[] = [];

        for (let i = 0; i < this.numberOfPlayers; i++) {
            players.push(new Player(i + 2, this.distribuiCartas()));
        }
        return players;
    }
}