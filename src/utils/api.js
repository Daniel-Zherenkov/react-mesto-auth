// ПРИМЕР ИНИЦИАЛИЗАЦИИ КЛАССА 
// const api = new Api({
//     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
//     headers: {
//       authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//       'Content-Type': 'application/json'
//     }
//   }); 


// fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
//   headers: {
//     authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8'
//   }
// })



export class Api {
    constructor(options) {
        this._url = options.baseUrl
        this._token = options.headers
        this._method = options.method
        this._body = options.body
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
        
    } 

    getProfile() {
        return fetch(this._url + '/users/me', {
            headers: this._token
        }).then(res => this._getResponseData(res))
    }

    getCards() {
        return fetch(this._url + '/cards', {
            headers: this._token
        }).then(res => this._getResponseData(res))
    }

    changeProfile({ name, about }) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: this._token,
            body: JSON.stringify({
                name,
                about
            })
        }).then(res => this._getResponseData(res))
    }

    changeAvatar({ avatar }) {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._token,
            body: JSON.stringify({
                avatar
            })
        }).then(res => this._getResponseData(res))
    }

    addCard({name, link}) {
        return fetch(this._url + '/cards', {
            method: 'POST',
            headers: this._token,
            body: JSON.stringify({
                name,
                link
            })
        }).then(res => this._getResponseData(res))
    }

    deleteCard(id_card) {
        return fetch(this._url +`/cards/${id_card}`, {
            method: 'DELETE',
            headers: this._token
        }).then(res => this._getResponseData(res))
    }

    addLike(id_card) {
        return fetch(this._url +`/cards/likes/${id_card}`, {
            method: 'PUT',
            headers: this._token
        }).then(res => this._getResponseData(res))
    }

    deleteLike(id_card) {
        return fetch(this._url +`/cards/likes/${id_card}`, {
            method: 'DELETE',
            headers: this._token
        }).then(res => this._getResponseData(res))
    }

    changeLikeCardStatus(id_card, isLiked) {
        if (isLiked) {
            
            return fetch(`${this._url}/cards/likes/${id_card}`, {
                method: "PUT",
                headers: this._token,
            }).then(res => this._getResponseData(res));
        } else {
            
            return fetch(`${this._url}/cards/likes/${id_card}`, {
                method: "DELETE",
                headers: this._token,
            }).then(res => this._getResponseData(res));
        }
    }


}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: 'f90511a9-a668-46c2-887c-d809b9797fe7',
        'Content-Type': 'application/json'
    }
})

export default api;