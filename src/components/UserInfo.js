export default class UserInfo {
    constructor({ userName, userInfo }) {
        this._userName = userName;
        this._userInfo = userInfo;
        this._profileName = document.querySelector('.profile__name');
        this._profileJob = document.querySelector('.profile__job');
    }

    getUserInfo() {
        const name = this._profileName.textContent;
        const job = this._profileJob.textContent;
        return { name, job };
    }

    setUserInfo(inputValues) {
        this._profileName.textContent = inputValues.name;
        this._profileJob.textContent = inputValues.job;

    }

}