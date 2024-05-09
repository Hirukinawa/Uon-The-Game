import "./styles/style.css";
import "./styles/App.css";

function App() {

  /* function printCartas(cards: ICarta[]) {
    return cards.map((carta: ICarta) => {
      return <Carta key={carta.id} id={carta.id} name={carta.name} color={carta.color} power={carta.power}></Carta>
    })
  } */

  return (
    <section>
      <h1>Uon</h1>
      <h2>The Game</h2>
      <button><a href="/uon">COMEÇAR</a></button>
    </section>
  )
}

export default App
