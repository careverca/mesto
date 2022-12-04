import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, { openCallback, submitCallback }) {
        super(selector);
        this._openCallback = openCallback;
        this._submitCallback = submitCallback;
        this._popupForm = this._popup.querySelector('.form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
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
        this._popupForm.reset();
        super.close();
    }

    _getInputValues() {
        const _form = this._popup.querySelector('.form');
        const _formInputs = _form.querySelectorAll('.form__input');
        const _inputValues = {};
        _formInputs.forEach((formInput) => {
            const key = formInput.name;
            const val = formInput.value;
            _inputValues[key] = val;
        })
        return _inputValues;
    }

}