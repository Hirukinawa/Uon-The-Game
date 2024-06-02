import React from 'react';
import '../styles/Modal.css';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onChoice: (choice: string) => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onChoice }) => {
    if (!isOpen) return null;

    const handleChoice = (choice: string) => {
        onChoice(choice);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <p>Escolha uma cor:</p>
                <button className="modal-btn" onClick={() => handleChoice('red')}>Vermelho</button>
                <button className="modal-btn" onClick={() => handleChoice('green')}>Verde</button>
                <button className="modal-btn" onClick={() => handleChoice('blue')}>Azul</button>
                <button className="modal-btn" onClick={() => handleChoice('yellow')}>Amarelo</button>
            </div>
        </div>
    );
};

export default Modal;
