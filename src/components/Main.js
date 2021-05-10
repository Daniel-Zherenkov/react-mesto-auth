import React, { useContext } from "react";
import editButton from '../images/editButton.svg'
import addButton from '../images/addButton.svg'
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";


function Main(props) {

    const {about, avatar, name } = useContext(CurrentUserContext)
    const cards = useContext(CardsContext)

    return (
        <main>
            <div className="profile">
                <div className="profile__left">
                    <img src={avatar} className="profile__avatar" alt="аватар" />
                    <button onClick={props.onEditAvatar} className="profile__edit-avatar"></button>
                    <div className="profile__info">
                        <div className="profile__name-edit-flex">
                            <h1 className="profile__name">{name}</h1>
                            <button onClick={props.onEditProfile} type="button" className="profile__edit-button">
                                <img src={editButton} alt="редактировать" className="profile__edit-button-img" />
                            </button>
                        </div>
                        <p className="profile__about-self">{about}</p>
                    </div>

                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__add-button">
                    <img src={addButton} alt="добавить" />
                </button>
            </div>


            <div className="elements">
                {cards.map(card => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                ))}
            </div>
        </main>

    )
}

export default Main;