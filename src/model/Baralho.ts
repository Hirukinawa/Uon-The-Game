import { Player } from "./Player";
import { ICarta } from "./Carta";

function block(players:Player[]): Player[] {
    const firstPlayer:Player = players[0]
    const playersList:Player[] = players.filter((p) => p.id !== firstPlayer.id)
    playersList.push(firstPlayer)
    return playersList;
}


const baralho: ICarta[] = [
    {
        id: 1,
        name: "0",
        color: "red",
        power: () => {return true;},
    },
    {
        id: 2,
        name: "1",
        color: "red",
        power: () => {return true;},
    },
    {
        id: 3,
        name: "2",
        color: "red",
        power: () => {return true;},
    },
    {
        id: 4,
        name: "3",
        color: "red",
        power: () => {return true;},
    },
    {
        id: 5,
        name: "4",
        color: "red",
        power: () => {return true;},
    },
    {
        id: 6,
        name: "5",
        color: "red",
        power: () => {return true;},
    },
    {
        id: 7,
        name: "6",
        color: "red",
        power: () => {return true;},
    },
    {
        id: 8,
        name: "7",
        color: "red",
        power: () => {return true;},
    },
    {
        id: 9,
        name: "+2",
        color: "red",
        power: (players: Player[]) => {
            const nextPlayer:Player = players[1];
            for (let i = 0; i < 2; i++) {
                nextPlayer.comprar();
            }
            players[1] = nextPlayer;
            return block(players);
        },
    },
    {
        id: 10,
        name: "block",
        color: "red",
        power: (players:Player[]) => {
            return block(players);
        },
    },
    {
        id: 11,
        name: "reverse",
        color: "red",
        power: (players: Player[]) => {

            const jogadorAtual:Player | undefined = players.shift();
            players.reverse()
            players.unshift(jogadorAtual!)

            return players;
        },
    },
    {
        id: 12,
        name: "0",
        color: "green",
        power: () => {return true;},
    },
    {
        id: 13,
        name: "1",
        color: "green",
        power: () => {return true;},
    },
    {
        id: 14,
        name: "2",
        color: "green",
        power: () => {return true;},
    },
    {
        id: 15,
        name: "3",
        color: "green",
        power: () => {return true;},
    },
    {
        id: 16,
        name: "4",
        color: "green",
        power: () => {return true;},
    },
    {
        id: 17,
        name: "5",
        color: "green",
        power: () => {return true;},
    },
    {
        id: 18,
        name: "6",
        color: "green",
        power: () => {return true;},
    },
    {
        id: 19,
        name: "7",
        color: "green",
        power: () => {return true;},
    },
    {
        id: 20,
        name: "+2",
        color: "green",
        power: (players: Player[]) => {
            const nextPlayer:Player = players[1];
            for (let i = 0; i < 2; i++) {
                nextPlayer.comprar();
            }
            players[1] = nextPlayer;
            return block(players);
        },
    },
    {
        id: 21,
        name: "block",
        color: "green",
        power: (players:Player[]) => {
            return block(players);
        },
    },
    {
        id: 22,
        name: "reverse",
        color: "green",
        power: (players: Player[]) => {

            const jogadorAtual:Player | undefined = players.shift();
            players.reverse()
            players.unshift(jogadorAtual!)

            return players;
        },
    },
    {
        id: 23,
        name: "0",
        color: "blue",
        power: () => {return true;},
    },
    {
        id: 24,
        name: "1",
        color: "blue",
        power: () => {return true;},
    },
    {
        id: 25,
        name: "2",
        color: "blue",
        power: () => {return true;},
    },
    {
        id: 26,
        name: "3",
        color: "blue",
        power: () => {return true;},
    },
    {
        id: 27,
        name: "4",
        color: "blue",
        power: () => {return true;},
    },
    {
        id: 28,
        name: "5",
        color: "blue",
        power: () => {return true;},
    },
    {
        id: 29,
        name: "6",
        color: "blue",
        power: () => {return true;},
    },
    {
        id: 30,
        name: "7",
        color: "blue",
        power: () => {return true;},
    },
    {
        id: 31,
        name: "+2",
        color: "blue",
        power: (players: Player[]) => {
            const nextPlayer:Player = players[1];
            for (let i = 0; i < 2; i++) {
                nextPlayer.comprar();
            }
            players[1] = nextPlayer;
            return block(players);
        },
    },
    {
        id: 32,
        name: "block",
        color: "blue",
        power: (players:Player[]) => {
            return block(players);
        },
    },
    {
        id: 33,
        name: "reverse",
        color: "blue",
        power: (players: Player[]) => {

            const jogadorAtual:Player | undefined = players.shift();
            players.reverse()
            players.unshift(jogadorAtual!)

            return players;
        },
    },
    {
        id: 34,
        name: "0",
        color: "yellow",
        power: () => {return true;},
    },
    {
        id: 35,
        name: "1",
        color: "yellow",
        power: () => {return true;},
    },
    {
        id: 36,
        name: "2",
        color: "yellow",
        power: () => {return true;},
    },
    {
        id: 37,
        name: "3",
        color: "yellow",
        power: () => {return true;},
    },
    {
        id: 38,
        name: "4",
        color: "yellow",
        power: () => {return true;},
    },
    {
        id: 39,
        name: "5",
        color: "yellow",
        power: () => {return true;},
    },
    {
        id: 40,
        name: "6",
        color: "yellow",
        power: () => {return true;},
    },
    {
        id: 41,
        name: "7",
        color: "yellow",
        power: () => {return true;},
    },
    {
        id: 42,
        name: "+2",
        color: "yellow",
        power: (players: Player[]) => {
            const nextPlayer:Player = players[1];
            for (let i = 0; i < 2; i++) {
                nextPlayer.comprar();
            }
            players[1] = nextPlayer;
            return block(players);
        },
    },
    {
        id: 43,
        name: "block",
        color: "yellow",
        power: (players:Player[]) => {
            return block(players);
        },
    },
    {
        id: 44,
        name: "reverse",
        color: "yellow",
        power: (players: Player[]) => {

            const jogadorAtual:Player | undefined = players.shift();
            players.reverse()
            players.unshift(jogadorAtual!)

            return players;
        },
    },
    {
        id: 45,
        name: "+4",
        color: "red",
        power: (players: Player[], carta: ICarta, cor: string) => {
            const nextPlayer:Player = players[1];
            carta.color = cor;
            for (let i = 0; i < 4; i++) {
                nextPlayer.comprar();
            }
            players[1] = nextPlayer;
            return block(players);
        },
    },
    {
        id: 46,
        name: "change_color",
        color: "red",
        power: (carta: ICarta, cor: string) => {
            carta.color = cor;
            return true;
        },
    },
]

export default baralho;