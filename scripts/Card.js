import { openPicPopup } from './script.js';

export class Card {
  constructor(title, url, templateSelector) {
    this._title = title;
    this._url = url;
    this._templateSelector = templateSelector;
    
    this._template = document.querySelector(this._templateSelector).content;
    this._card = this._template.querySelector('.element').cloneNode(true);
    this._text = this._card.querySelector('.element__title');
    this._pic = this._card.querySelector('.element__image');
    this._removeBtn = this._card.querySelector('.element__remove');
    this._likeBtn = this._card.querySelector('.element__like');
    this._createCard();
  }

  _createCard() {
    this._addEventListeners();
    this._insertData();
  }

  _addEventListeners() {
    this._pic.addEventListener('click', () => {
      openPicPopup(this._pic, this._text);
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
    this._pic.src = this._url;
    this._pic.alt = this._title;
    this._text.textContent = this._title;
  }

  getCard() {
    return this._card;
  }
}
