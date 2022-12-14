export default class UserInfo {
    constructor({ profileNameSel, profileJobSel, profileImageSel}) {
        this._profileName = document.querySelector(profileNameSel);
        this._profileJob = document.querySelector(profileJobSel);
        this._profileImg = document.querySelector(profileImageSel);
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

    setUserImage(url) {
        this._profileImg.src = url;
    }

}