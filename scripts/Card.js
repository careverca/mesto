import PopupWithImage from './PopupWithImage.js';

export class Card {
  constructor(title, url) {
    this._title = title;
    this._url = url;
    this._templateSelector = '.template';
    
    this._template = document.querySelector(this._templateSelector).content;
    this._card = this._template.querySelector('.element').cloneNode(true);
    this._text = this._card.querySelector('.element__title');
    this._img = this._card.querySelector('.element__image');
    this._removeBtn = this._card.querySelector('.element__remove');
    this._likeBtn = this._card.querySelector('.element__like');
    this._createCard();

    this._popup = new PopupWithImage('.popup_type_pic');
  }

  _createCard() {
    this._addEventListeners();
    this._insertData();
  }

  _addEventListeners() {
    this._img.addEventListener('click', () => {
      this._popup.open(this._img, this._text);
    });
    
    this._removeBtn.addEventListener('click', () => {
      this._card.remove();
      this._template = null;
    });
    
    this._likeBtn.addEventListener('click', () => {
      this._likeBtn.classList.toggle('element__like_active');
    });

  }

  _insertData() {
    this._img.src = this._url;
    this._img.alt = this._title;
    this._text.textContent = this._title;
  }

  getCard() {
    return this._card;
  }
}
