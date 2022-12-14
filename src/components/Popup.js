export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this._popup = document.querySelector(this._selector);
        this._popupCloseBtn = this._popup.querySelector('.popup__close-btn');
        this._handleEscClose = this._handleEscClose.bind(this); 
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);

    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        // Closing by click on Overlay
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
        // Closing by click on Close Button
        this._popupCloseBtn.addEventListener('click', () => {
            this.close();
        });

    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

}