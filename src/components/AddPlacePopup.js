import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);


    function handleAddPlaceSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name,
            link
        })
    }

    function handleNameChange (evt) {
        setName(evt.target.value)
    }


    function handleLinkChange (evt) {
        setLink(evt.target.value)
    }


    return (
        <PopupWithForm
            onSubmit={handleAddPlaceSubmit}
            onClose={onClose}
            isOpen={isOpen}
            name="add"
            title="Новое место"
            buttonText="Создать"
        >
            <input required
                minLength="2"
                maxLength="31"
                name="placeName"
                placeholder="Название"
                type="text"
                className="input popup__input-filed add-popup__input-filed_place"
                id="name-add-input"
                value={name || ''}
                onChange={handleNameChange}
            />
            <span className="popup-error__text-input-error" id="name-add-input-error"></span>
            <input required
                type="url"
                name="link"
                placeholder="Ссылка"
                className="input popup__input-filed add-popup__input-filed_link"
                id="link"
                value={link || ''}
                onChange={handleLinkChange}
            />
            <span className="popup-error__text-input-error" id="link-error"></span>
        </PopupWithForm>

    )
}

export default AddPlacePopup;