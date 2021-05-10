import React, { useContext } from 'react'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext)
    const { name, link, likes, owner } = card
    //проверяем владельца карточки и в зависимости от статуса отрисовываем (или нет) кнопку удаления карточки
    const isOwn = owner._id === currentUser._id;
    const cardDeleteButtonClassName = `${isOwn ? 'element__trash' : 'element_deleted'}`
    //проверяем поставлен ли лайк и в зависимости от этого отрисовываем пустой или заполненный лйак
    const isLiked = likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_fill' : 'element__like'}`

    function handleClick () {
        return onCardClick({name, link})
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }


    return(
                <div className="element">
                    <img onClick={handleClick} src={link} alt={name} className="element__image" />
                    <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName}></button>
                    <div className="element__footer">
                        <h2 className="element__title">{name}</h2>
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>
                            <p className="element__like-count">{likes.length}</p>
                        </button>
                    </div>
                </div>
    )
}

export default Card;