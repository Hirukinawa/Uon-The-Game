
import { getRandomInt } from "../service/functions";
import baralho from "./Baralho";
import { ICarta } from "./Carta";
import { Player } from "./Player";

export class Game {

    constructor () {
    }

    distribuiCartas(): ICarta[] {
        let cartas: ICarta[] = [];
        for (let i:number = 0; i < 9; i++) {
            cartas.push(baralho[getRandomInt(1, baralho.length) - 1]);
        }
        return cartas;
    }

    gameStart(players:Player[], actual_Player: Player): Player[] {
        let player1: Player = new Player(1, this.distribuiCartas());
        let player2: Player = new Player(2, this.distribuiCartas());
        let player3: Player = new Player(3, this.distribuiCartas());
        let player4: Player = new Player(4, this.distribuiCartas());

        players = [player1, player2, player3, player4];
        actual_Player = players[0];
        return players;
    }
}