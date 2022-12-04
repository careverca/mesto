import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._img = this._popup.querySelector('.popup__image');
        this._text = this._popup.querySelector('.popup__text');
    }

    open(imgSrc, imgAlt, text) {
        this._img.src = imgSrc;
        this._img.alt = imgAlt;
        this._text.textContent = text;
        super.open();
    }
}