import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
        avatarRef.current.value = '';
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name="edit-avatar" title="Обновить аватар" buttonText="Сохранить">
            <input 
            required type="url" 
            name="avatar" 
            placeholder="Ссылка" 
            className="popup__input-filed input" 
            id="avatar"
            ref={avatarRef} 
        />
        </PopupWithForm>

    )
}

export default EditAvatarPopup;