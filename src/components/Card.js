export default class Card {
  constructor(title, url, id, likes, { owned, userId }, { handleImageClick, handleDeletionClick }, { api }) {
    this._title = title;
    this._url = url;
    this._id = id;
    this._likes = likes;
    this._likesCount = likes.length;
    this._owned = owned;
    this._userId = userId;
    this._api = api;

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
    this._toggleDeleteBtnIfOwned();
    this._checkIfLiked();
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

  _checkIfLiked() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._blackenLike()
      }
    })
  }

  _blackenLike() {
    this._likeBtn.classList.add('element__like_active');
  }

  _toggleLike = () => {
    if (this._likeBtn.classList.contains('element__like_active')) {
      this._api.unlikeCard(this._id)
        .then(res => {
          this._likeBtn.classList.remove('element__like_active');
          this._likesCount = res.likes.length;
          this._setLikeCount();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this._api.likeCard(this._id)
        .then(res => {
          this._likeBtn.classList.add('element__like_active');
          this._likesCount = res.likes.length;
          this._setLikeCount();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  _setLikeCount() {
    if (this._likesCount > 0) {
      this._likeCount.style.display = 'block';
      this._likeCount.textContent = this._likesCount;
    } else {
      this._likeCount.style.display = 'none';
    }
  }

  _toggleDeleteBtnIfOwned() {
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