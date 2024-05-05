import "./style.css";
import "./App.css";
import { Route } from 'react-router-dom';

export function getRandomInt (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {

  return (
    <section>
      <h1>Uon</h1>
      <h2>The Game</h2>
      <button><a href="./Uon.tsx">COMEÇAR</a></button>
    </section>
  )
}

export default App
