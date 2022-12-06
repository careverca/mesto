import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, { openCallback, submitCallback }) {
        super(selector);
        this._openCallback = openCallback;
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.form');
        this._formInputs = this._form.querySelectorAll('.form__input');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }

    open() {
        super.open();
        this._openCallback();
    }

    close() {
        this._form.reset();
        super.close();
    }

    _getInputValues() {
        let _inputValues = {};
        this._formInputs.forEach((formInput) => {
            const key = formInput.name;
            const val = formInput.value;
            _inputValues[key] = val;
        })
        return _inputValues;
    }

}