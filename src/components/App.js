import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import '../blocks/popup-opened/popup-opened.css'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CardsContext } from '../contexts/CardsContext'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
import { register, authorization, getContent } from './../utils/auth'




function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [initialCards, setInitialCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [regSuccessStatus, setRegSuccessStatus] = useState(false)
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('')
    const history = useHistory()

    const handleRegister = (email, password) => {
        register(email, password)
        .then((res) => {
            if (res) {
                setLoggedIn(true)
                setRegSuccessStatus(true)
                setIsInfoToolTipOpen(true)
                history.push("/sign-in")
            }
        })
        .catch((err) => {
            setIsInfoToolTipOpen(true)
            setRegSuccessStatus(false)
            if (err === "Error 400") {
                return console.log(`${err} - некорректно заполнено одно из полей `)
            }
            return console.log(err)
        })
    }

    const handleAuthorizations = (email, password) => {
        authorization(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    setLoggedIn(true);
                    setUserEmail(email);
                    history.push("/");
                }
            })
            .catch((err) => {
                setIsInfoToolTipOpen(true)
                setRegSuccessStatus(false)
                if (err === "Error 400") {
                    return console.log(`${err} - некорректно заполнено одно из полей `)
                }
                console.log(err);
            });
    }

    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        history.push("/sign-in");
    };

    const tokenCheck = () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            getContent(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setUserEmail(res.data.email);
                        history.push("/");
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    };

    useEffect(() => {
        tokenCheck();
    }, [loggedIn]);



    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(false)
        setIsInfoToolTipOpen(false)
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        // console.log(card)
    }
    
    

    useEffect(() => {
        Promise.all([api.getProfile(), api.getCards()]).then(([userData, cardsData]) => {
            setCurrentUser(userData)
            setInitialCards(cardsData)
        }).catch(err => { console.log(err) })

    }, [])
    
    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                const newCards = initialCards.map((c) =>
                    c._id === card._id ? newCard : c
                );
                setInitialCards(newCards)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setInitialCards(initialCards.filter((item) => item._id !== card._id))
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser(userData) {
        api.changeProfile(userData)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleUpdateAvatar(avatarData) {
        api.changeAvatar(avatarData)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleAddPlace(placeData) {
        api.addCard(placeData)
            .then((data) => {
                setInitialCards([data, ...initialCards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }




    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={initialCards}>
                <div className="page">

                    <Header userEmail={userEmail} onSignOut={handleLogOut} />
                    <Switch>

                        <Route path="/sign-up">
                            <Register onRegister={handleRegister}/>
                        </Route>


                        <Route path="/sign-in">
                            <Login onLogin={handleAuthorizations} />
                        </Route>

                        
                        <ProtectedRoute
                            exact path="/"
                            loggedIn={loggedIn}
                            component={Main}
                            onCardDelete={handleCardDelete}
                            onCardLike={handleCardLike}
                            onCardClick={handleCardClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                        />

                        <Route>
                            {
                                loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />
                            }
                        </Route>


                    </Switch>
                    

                    <Footer />

                    <InfoToolTip
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                    isSuccses={regSuccessStatus} 
                    />

                    <PopupWithForm name="approve" title="Вы уверены?" buttonText="Да" />

                    <EditProfilePopup 
                    onUpdateUser={handleUpdateUser} 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups} 
                    />

                    <EditAvatarPopup 
                    onUpdateAvatar={handleUpdateAvatar} 
                    isOpen={isEditAvatarPopupOpen} 
                    onClose={closeAllPopups} 
                    />

                    <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                    />

                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                </div>
            </CardsContext.Provider>
        </CurrentUserContext.Provider>

    );
}

export default App;
