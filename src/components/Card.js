import { api } from "./Api.js";
import PopupWithForm from "./PopupWithForm.js";
export default class Card {
  constructor(title, url, id, likes, owned, { handleImageClick, handleDeletionClick }) {
    this._title = title;
    this._url = url;
    this._id = id;
    this._likes = likes.length;
    this._owned = owned;

    this._templateSelector = '.template';
    this._template = document.querySelector(this._templateSelector).content;
    this._card = this._template.querySelector('.element').cloneNode(true);
    this._text = this._card.querySelector('.element__title');
    this._img = this._card.querySelector('.element__image');
    this._removeBtn = this._card.querySelector('.element__remove');
    this._likeBtn = this._card.querySelector('.element__like');
    this._likeCount = this._card.querySelector('.element__like-count');

    this._handleImageClick = handleImageClick;
    this._handleDeletionClick = handleDeletionClick;
  }

  _createCard() {
    this._setEventListeners();
    this._insertData();
    this._setLikeCount();
    this._toggleDeleteBtn();
  }

  _setEventListeners() {
    this._img.addEventListener('click', () => {
      this._handleImageClick(
        this._img.src,
        this._img.alt,
        this._text.textContent
      );
    });
    this._likeBtn.addEventListener('click', this._toggleLike);
    this._removeBtn.addEventListener('click', this._clickRemove);
  }

  _toggleLike = () => {
    if (this._likeBtn.classList.contains('element__like_active')) {
      this._likeBtn.classList.remove('element__like_active');
      this._likes--;
      api.unlikeCard(this._id)
        .then(res => {
          console.log(res);
          this._setLikeCount();
        })
    } else {
      this._likeBtn.classList.add('element__like_active');
      this._likes++;
      api.likeCard(this._id)
        .then(res => {
          console.log(res);
          this._setLikeCount();
        })
      this._setLikeCount();
    }
  }

  _setLikeCount() {
    if (this._likes > 0) {
      this._likeCount.style.display = 'block';
      this._likeCount.textContent = this._likes;
    } else {
      this._likeCount.style.display = 'none';
    }
  }

  _toggleDeleteBtn() {
    this._owned 
      ? this._removeBtn.style.display = 'block'
      : this._removeBtn.style.display = 'none'
  }

  _clickRemove = () => {
    this._handleDeletionClick(this._id);
  }

  deleteCard() {
    this._card.remove();
    this._template = null;
    this._card = null;
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