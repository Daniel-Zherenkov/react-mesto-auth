import React from "react";
import addButton from '../images/addButton.svg'

function InfoToolTip({ isOpen, onClose, isSuccses }) {
    return (
        <section
            className={`popup popup__infotooltip ${isOpen ? "popup_opened" : " "}`}
        >
            <div className="popup__container">
            <button onClick={onClose} type="button" className="popup__close-button">
                    <img src={addButton} alt="закрыть" className="popup__close-button-img" />
                </button>
                <div
                    className={`popup__img ${isSuccses ? " " : "popup__img_err"}`}
                />
                <p className="popup__text">{isSuccses ? "Вы успешно зарегистрировались!" : "Что то пошло не так! Попробуйте ещё раз"}</p>
                
            </div>
        </section>
    );
}

export default InfoToolTip;