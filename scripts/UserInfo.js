export default class UserInfo {
    constructor({ userName, userInfo }) {
        this._userName = userName;
        this._userInfo = userInfo;
        this._inputName = document.querySelector('.form__input_field-name');
        this._inputJob = document.querySelector('.form__input_field-job');
        this._profileName = document.querySelector('.profile__name');
        this._profileJob = document.querySelector('.profile__job');
    }

    getUserInfo() {
        const name = this._profileName.textContent;
        const job = this._profileJob.textContent;
        return { name, job };
    }

    setUserInfo() {
        this._profileName.textContent = this._inputName.value;
        this._profileJob.textContent = this._inputJob.value;

    }

}