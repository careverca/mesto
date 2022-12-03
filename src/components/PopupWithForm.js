import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, { openCallback, submitCallback }) {
        super(selector);
        this._openCallback = openCallback;
        this._submitCallback = submitCallback;
        this._openCallback();
        this._popupForm = this._popup.querySelector('.form');
        this._getInputValues();
        this.setEventListeners();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            this._submitCallback(evt);
        });

    }

    close() {
        super.close();
    }

    _getInputValues() {
        const _form = this._popup.querySelector('.form');
        const _inputValues = _form.querySelectorAll('.form__input');
    }

}