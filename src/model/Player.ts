import { getRandomInt } from "../service/functions";
import baralho from "./Baralho";
import { ICarta } from "./Carta";

export class Player {
    id: number;
    cards: ICarta[];

    constructor(id: number, cards: ICarta[]) {
        this.id = id;
        this.cards = cards;
    }

    comprar():ICarta[] {
        const newId = getRandomInt(0, baralho.length - 1);
        const newCard:ICarta = {id: baralho[newId].id, name: baralho[newId].name, color: baralho[newId].color, power: baralho[newId].power}
        this.cards.push(newCard)
        return this.cards;
    }

    podeJogar(lastCard: ICarta, cartaJogador: ICarta): boolean {
        if (cartaJogador.name === lastCard.name ||
            cartaJogador.color === lastCard.color ||
            cartaJogador.color === "black" ||
            lastCard.color === undefined) {
            return true;
        } else {
            return false;
        }
    }

    jogar(carta: ICarta) {
        var index = this.cards.findIndex(card => card.id === carta.id);
        if (index !== -1) {
            var novoBaralho = [...this.cards];
            novoBaralho.splice(index, 1);
            this.cards = novoBaralho;
        }
    }
}