import "./styles/style.css";
import "./styles/App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {

  const navigate = useNavigate();
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);

  function navigateToUon() {
    window.scrollTo(0, 0);
    navigate(`/uon/${numberOfPlayers}`, { state: { numberOfPlayers } });
  }

  const handleChangeNumberOfPlayers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPlayers(parseInt(e.target.value, 10));
  };

  return (
    <div className="app">
      <h1>Uon</h1>
      <h2>The Game</h2>
      <label htmlFor="inputPlayers">
        <p>Número de jogadores:</p>
      <input id="inputPlayers" onChange={handleChangeNumberOfPlayers} type="number" min={2} max={4} value={numberOfPlayers} />
      </label>
      <button onClick={() => navigateToUon()}><a>COMEÇAR</a></button>
    </div>
  )
}

export default App
