class Api {
   constructor({ baseUrl, headers }) {
      // тело конструктора
      this._baseUrl = baseUrl;
      this._headers = headers;
      this._token = headers.authorization;
   }

   getProfileData() {
      return fetch(`${this._baseUrl}/users/me/`, {
         headers: this._headers,
      })
         .then(this._checkResponse);
   }

   setProfileData(inputValues) {
      return fetch(`${this._baseUrl}/users/me/`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            name: inputValues.name,
            about: inputValues.job
         })
      })
         .then(this._checkResponse);
   }

   getInitialCards() {
      return fetch(`${this._baseUrl}/cards/`, {
         headers: this._headers,
      })
         .then(this._checkResponse);
   }

   addNewCard(inputValues) {
      return fetch(`${this._baseUrl}/cards/`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            name: inputValues.place,
            link: inputValues.url
         })
      })
         .then(this._checkResponse);

   }

   deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
         method: 'DELETE',
         headers: this._headers,
      })
         .then(this._checkResponse);
   }

   likeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
         method: 'PUT',
         headers: this._headers,
      })
         .then(this._checkResponse);
   }

   unlikeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
         method: 'DELETE',
         headers: this._headers,
      })
         .then(this._checkResponse);
   }

   getProfileImage() {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'GET',
         headers: this._headers,
      })
         .then(this._checkResponse);
   }

   updateProfileImage(url) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            avatar: url,
         })
      })
         .then(this._checkResponse);
   }

   _checkResponse(res) {
         return res.ok ? res.json() : Promise.reject(res.status);
    }

}

export const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
   headers: {
      authorization: 'a110f406-654f-4c53-bae6-3b8905b49b43',
      'Content-Type': 'application/json'
   },
});