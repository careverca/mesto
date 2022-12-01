import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._img = this._popup.querySelector('.popup__image');
        this._text = this._popup.querySelector('.popup__text');
        this.setEventListeners();
    }

    open(imgSrc, imgAlt, text) {
        super.open();
        this._img.src = imgSrc;
        this._img.alt = imgAlt;
        this._text.textContent = text;
    }
}