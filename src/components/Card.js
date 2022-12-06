export class Card {
  constructor(title, url, { handleCardClick }) {
    this._title = title;
    this._url = url;

    this._templateSelector = '.template';
    this._template = document.querySelector(this._templateSelector).content;
    this._card = this._template.querySelector('.element').cloneNode(true);
    this._text = this._card.querySelector('.element__title');
    this._img = this._card.querySelector('.element__image');
    this._removeBtn = this._card.querySelector('.element__remove');
    this._likeBtn = this._card.querySelector('.element__like');

    this._handleCardClick = handleCardClick;
  }

  _createCard() {
    this._setEventListeners();
    this._insertData();
  }

  _setEventListeners() {
    this._img.addEventListener('click', () => {
      this._handleCardClick(
        this._img.src,
        this._img.alt,
        this._text.textContent
      );
    });
    this._likeBtn.addEventListener('click', this._toggleLike);
    this._removeBtn.addEventListener('click', this._clickRemove);
  }

  _toggleLike = () => {
      this._likeBtn.classList.toggle('element__like_active');
  }

  _clickRemove = () => {
      this._card.remove();
      this._template = null;
      delete this._template;
  }

  _insertData() {
    this._img.src = this._url;
    this._img.alt = this._title;
    this._text.textContent = this._title;
  }

  getCard() {
    this._createCard();
    return this._card;
  }
}
