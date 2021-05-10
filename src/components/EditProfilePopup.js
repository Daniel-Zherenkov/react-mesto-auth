import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";


function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleNameChange = (evt) => {
        setName(evt.target.value);
        
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value);
        
    }

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name="profile" title="Редактировать профиль" buttonText="Сохранить">
            <input
                required minLength="2"
                maxLength="40"
                name="profileName"
                placeholder="Имя" 
                type="text"
                className="input popup__input-filed profile-popup__input-filed_name"
                id="name-input"
                value={name || ' '} 
                onChange={handleNameChange}
                
            />
            <span className="popup-error__text-input-error" id="name-input-error"></span>
            <input
                required minLength="2"
                maxLength="200" name="profileAbout"
                placeholder="О вас"
                type="text"
                className="input popup__input-filed profile-popup__input-filed_about"
                id="about-input"
                value={description || ' '} 
                onChange={handleDescriptionChange}
            
            />
            <span className="popup-error__text-input-error" id="about-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
