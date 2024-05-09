import { ICarta } from "../model/Carta";
import "../styles/Carta.css";

export default function Carta(card: ICarta) {
    return (
        <div className="cards" style={{backgroundColor: card.color}}>
            <div className="content">
            <h1>{card.name == "block" ? "Ø" : card.name == "reverse" ? "⮂" : card.name == "change_color" ? "⭖" : card.name}</h1>
            </div>
        </div>
    )
}
/* Ø ⮂ ⭖*/