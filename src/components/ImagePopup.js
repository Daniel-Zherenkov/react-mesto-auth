function ImagePopup({ dataInCard, card, onClose }) {

    return (
        <div className={`img-popup ${ dataInCard ? 'popup_opened' : ''}`}>
            <div className="img-popup__container">
                <button onClick={onClose} type="button" className="popup-close img-popup__close-button"></button>
                <img src={card.link} alt={card.name} className="img-popup__image" />
                <p className="img-popup__title">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;