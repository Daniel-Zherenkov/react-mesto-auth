import mainLogo from '../images/logo.svg'
import { Route, Link } from "react-router-dom";

function Header({userEmail, onSignOut} ) {
    return(
        <header className="header">
            <img className="header__logo" src={mainLogo} alt="логотип" />

            <Route path="/sign-up">
                <Link to="sign-in" className="header__login">
                    Войти
                </Link>
            </Route>

            <Route path="/sign-in">
                <Link to="sign-up" className="header__login">
                    Регистрация
                </Link>
            </Route>
            
            <Route exact path="/">
                <p className="header__email">
                    {userEmail} &nbsp;
                    <Link to="sign-in" className="header__login" onClick={onSignOut}>
                        Выйти
                    </Link>
                </p>
            </Route>
        </header>
    )
}

export default Header;