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
        this.cards.push(baralho[getRandomInt(1, baralho.length) - 1])
        return this.cards;
    }

    podeJogar(lastCard: ICarta, cartaJogador: ICarta): boolean {
        if ((cartaJogador.name === lastCard.name) || (cartaJogador.color === lastCard.color || lastCard.color === "black")) {
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
        /* alert(`Jogador ${this.id} jogou ${carta.name} ${carta.color}`) */
    }
}