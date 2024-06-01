import Carta from "../components/Carta";
import { ICarta } from "../model/Carta";
import { Game } from "../model/Game";
import { Player } from "../model/Player";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Uon.css"
import baralho from "../model/Baralho";
import { getRandomInt } from "../service/functions";

const Uon: React.FC = () => {

    const { numberOfPlayers } = useParams<{ numberOfPlayers: string }>();
    const nop = parseInt(numberOfPlayers || "4", 10);
    const numberPlayers:number = nop < 2 ? 2 : nop > 4 ? 4 : nop;

    const playerModel: Player = {id: 0, cards: baralho, comprar: ()=> {return []}, jogar: () => {}, podeJogar: () => {return false}};

    const [game] = useState<Game>(new Game(numberPlayers));
    const [players, setPlayers] = useState<Player[]>([playerModel]);
    const [auxPlayers, setAuxPlayers] = useState<Player[]>(players);
    const [lastCard, setLastCard] = useState<ICarta>(baralho[getRandomInt(1, baralho.length - 2) - 1]);
    const [winner, setWinner] = useState<number>(-1);

    const listaDeCores = ["red", "green", "blue", "yellow"];
    console.log(listaDeCores)

    useEffect(() => {
        iniciarJogo()
    }, []);

    useEffect(() => {
        if (auxPlayers.length > 0 && auxPlayers[0].id !== 0 && auxPlayers[0].id !== 1) {
            const timer = setTimeout(() => {
                jogadaDosAdversarios();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [auxPlayers]);

    function passaParaOProximo(jogadores: Player[]) {
        // Verificação para garantir que 'jogadores' é um array
        if (!Array.isArray(jogadores)) {
            console.error("Erro: 'jogadores' não é um array", jogadores);
            return;
        }
    
        // Verificação para garantir que 'jogadores' não está vazio
        if (jogadores.length === 0) {
            console.error("Erro: 'jogadores' está vazio");
            return;
        }
    
        const firstPlayer: Player = jogadores[0];
    
        // Verificação para garantir que 'firstPlayer' é um objeto válido
        if (!firstPlayer || typeof firstPlayer.id !== 'number') {
            console.error("Erro: 'firstPlayer' não é válido", firstPlayer);
            return;
        }
    
        // Filtra e adiciona o primeiro jogador ao final da lista
        const newPlayers: Player[] = jogadores.filter((j: Player) => j.id !== firstPlayer.id);
        newPlayers.push(firstPlayer);
    
        setAuxPlayers(newPlayers);
    }
    

    async function awaitForNextPlay() {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    function executaCarta(carta:ICarta): Player[] {

        let updatedPlayers:Player[] = [...auxPlayers];

        try {
            if (carta.name === "+4") {
                if (auxPlayers[0].id === 1) {
                    updatedPlayers = carta.power(auxPlayers, carta, "red");
                } else {
                    updatedPlayers = carta.power(auxPlayers, carta, "blue");
                }
            } else if (carta.name === "+2") {
                updatedPlayers = carta.power(auxPlayers);
            } else if (carta.name === "block") {
                updatedPlayers = carta.power(auxPlayers)
            } else if (carta.name === "reverse") {
                updatedPlayers = carta.power(auxPlayers)
            } else if (carta.name === "change_color") {
                /* carta.color = listaDeCores[getRandomInt(0,listaDeCores.length)]; */
                carta.power(carta, "blue");
            }
        } catch (error) {
            console.log("Erro ao executar a carta", error)
            return auxPlayers;
        }

        return updatedPlayers;

    }

    async function jogadaDosAdversarios() {

        if (auxPlayers[0].id !== 1 && auxPlayers[0].id !== 0) {

            const jogador = auxPlayers[0];

            let temCarta:boolean = false;

            while (!temCarta) {

                for (let i:number = 0; i < jogador.cards.length; i++) {
                    if (jogador.podeJogar(lastCard, jogador.cards[i])) {


                        jogador.jogar(jogador.cards[i]);
                        if (jogador.cards.length == 0) setWinner(jogador.id)
                        const updatedPlayers:Player[] = executaCarta(jogador.cards[i]);
                        passaParaOProximo(updatedPlayers)
                        setLastCard(jogador.cards[i]);
                        temCarta = true;
                        break
                    } else {
                        jogador.comprar();
                    }
                }

            }

            await awaitForNextPlay();

        }

    }

    const compra = () => {
        if (auxPlayers[0].id === 1) {
            const novaLista = [...players]
            novaLista[0].cards = novaLista[0].comprar()
            setPlayers(novaLista)
        }
    }

    function checaJogada(jogador: Player, carta: ICarta) {
        if (auxPlayers[0].id === 1) {
            if (jogador.podeJogar(lastCard, carta)) {
                jogador.jogar(carta);
                if (jogador.cards.length == 0) setWinner(jogador.id)
                passaParaOProximo(executaCarta(carta))
                setLastCard(carta);
            } else {
                alert("Esta carta não pode ser jogada agora!");
            }
        }
    }

    function printCartas(cards: ICarta[]) {
        return cards.map((carta: ICarta) => {
            return <div className="divClick" onClick={() => checaJogada(auxPlayers[0], carta)}><Carta  key={carta.id} id={carta.id} name={carta.name} color={carta.color} power={carta.power}></Carta></div>
        })
    }

    const printaInimigos = players.map((player:Player, index) => {
            if (index != 0) {
                return <div className="row"><h2>Jogador {player.id}</h2><h3>Cartas: {player.cards.length}</h3></div>
            }
        }
    )

    function restart() {
        /* window.scrollTo(0, 0);
        navigate(`/uon/${nop}`, { state: { numberOfPlayers } }); */
        iniciarJogo()
    }

    function acabar() {
        setWinner(1);
    }

    function iniciarJogo() {
        setWinner(0)
        const arrayDePlayers:Player[] = game.gameStart();
        setPlayers(arrayDePlayers);
        setAuxPlayers(arrayDePlayers);
    }

    const ordem = auxPlayers.map((pl, index) => <h4 key={index}>{pl.id}</h4>)

    return (
        <div className="uon">
            {winner > 0
            ? <div>
                <h1>Jogador {winner} venceu</h1>
                <button onClick={restart}>Recomeçar</button>
            </div>
            : <div className="uon">
                <h1>Última carta:</h1>
                <div className="row">
                    <div className="column">
                        <h1>Vez do jogador {auxPlayers[0].id}</h1>
                        {ordem}
                    </div>
                    <div className="deck">
                        <Carta {...lastCard}></Carta>
                    </div>
                    <div className="column">
                        <h1>Adversários:</h1>
                        {printaInimigos}
                    </div>
                </div>
                <button onClick={compra} style={{marginLeft:"1rem"}}>COMPRAR</button>
                <button onClick={acabar} style={{marginLeft:"1rem"}}>Acabar</button>
                <h1>Suas cartas:</h1>
                <div className="deck">
                    {printCartas(players[0].cards)}
                </div>
            </div>}
        </div>
    )


}

export default Uon;