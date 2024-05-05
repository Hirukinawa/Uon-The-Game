import { ICarta } from "../model/Carta";
import "./Carta.css";

export default function Carta(card: ICarta) {

    function contentNameCard(name: string): string {
        if (name == "block") {
            return "Ø";
        } else if (name == "reverse") {
            return "⮂";
        } else if (name == "change_color") {
            return "⭖";
        } else {
            return card.name
        }
        /* {card.name == "block" ? "Ø" : card.name == "reverse" ? "⮂" : card.name == "change_color" ? "⭖" : card.name} */
    }

    return (
        <div className="cards" style={{backgroundColor: card.color}}>
            <div className="content">
                <div style={{backgroundColor: card.color}}>
                    <h1 style={{color: "white"}}>{contentNameCard(card.name)}</h1>
                </div>
            </div>
        </div>
    )
}
/* Ø ⮂ ⭖*/