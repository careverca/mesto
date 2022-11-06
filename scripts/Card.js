import { openPicPopup } from './script.js';

export class Card {
  constructor(title, url, templateSelector) {
    this.title = title;
    this.url = url;
    this.templateSelector = templateSelector;
    
    this.template = document.querySelector(this.templateSelector).content;
    this.card = this.template.querySelector('.element').cloneNode(true);
    this.text = this.card.querySelector('.element__title');
    this.pic = this.card.querySelector('.element__image');
    this.picBtn = this.card.querySelector('.element__image');
    this.removeBtn = this.card.querySelector('.element__remove');
    this.likeBtn = this.card.querySelector('.element__like');
    this._createCard();
  }

  _createCard() {
    this._addEventListeners();
    this._insertData();
  }

  _addEventListeners() {
    this.picBtn.addEventListener('click', () => {
      openPicPopup(this.pic, this.text);
    });
    
    this.removeBtn.addEventListener('click', () => {
      this.card.remove();
    });
    
    this.likeBtn.addEventListener('click', () => {
      this.likeBtn.classList.toggle('element__like_active');
    });

  }

  _insertData() {
    this.pic.src = this.url;
    this.pic.alt = this.title;
    this.text.textContent = this.title;
  }

  getCard() {
    return this.card;
  }
}
