import React, { useState } from "react";

function Login ({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitForm = (evt) => {
        evt.preventDefault()
        onLogin(email, password)
    }

    return (
        <section className="register">
        <form onSubmit={handleSubmitForm} className="form">
            <h1 className="form__title">Вход</h1>
            <input
                id="email"
                className="form__input"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(evt) => {setEmail(evt.target.value)}}
            />
            <input
                id="password"
                className="form__input"
                name="password"
                type="password"
                placeholder="Пароль"
                required
                value={password}
                onChange={(evt) => {setPassword(evt.target.value)}}
            />
            <button
                type="submit"
                className="form__submit"
            >
                Войти
            </button>
        </form>
    </section>
    )
}

export default Login;