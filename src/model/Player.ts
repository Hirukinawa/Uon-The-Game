import { getRandomInt } from "../App";
import baralho from "./Baralho";
import { ICarta } from "./Carta";

export class Player {
    id: number;
    cards: ICarta[];

    constructor(id: number, cards: ICarta[]) {
        this.id = id;
        this.cards = cards;
    }

    comprar(cards: ICarta[]) {
        cards.push(baralho[getRandomInt(1, baralho.length) - 1])
    }
}