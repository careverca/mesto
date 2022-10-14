// Default data
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//console.log(popupEditForm.className);

// Profile elements
const editBtn = document.querySelector('.profile__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Popup edit-form elements
const popupEditForm = document.querySelector('.popup_type_edit-form');
const popupEditFormCloseBtn = popupEditForm.querySelector('.popup__close-btn');
const inputName = popupEditForm.querySelector('.popup__input_field-name');
const inputJob = popupEditForm.querySelector('.popup__input_field-job');
const popupSubmitEditForm = popupEditForm.querySelector('.popup__form');

// Popup add-card elements
const popupAddCardForm = document.querySelector('.popup_type_add-card');
const popupAddCardCloseBtn = popupAddCardForm.querySelector('.popup__close-btn');
const inputPlace = popupAddCardForm.querySelector('.popup__input_field-place');
const inputUrl = popupAddCardForm.querySelector('.popup__input_field-url');
const popupSubmitAddCard = popupAddCardForm.querySelector('.popup__form');

// Popup pic elements
const popupPic = document.querySelector('.popup_type_pic');
const popupPicImage = popupPic.querySelector('.popup__image');
const popupPicText = popupPic.querySelector('.popup__text');
const popupPicCloseBtn = popupPic.querySelector('.popup__close-btn');
popupPicCloseBtn.addEventListener('click', () => { togglePopup(popupPic); })

// Other elements
const elements = document.querySelector('.elements');
const template = elements.querySelector('.template').content;

// Filling card data
initialCards.forEach((el) => {
    el = createCard(el.name, el.link);
    addCard(el, 'bottom');
})

// Popup edit-form handling
editBtn.addEventListener('click', openEditForm);

function openEditForm() {
    togglePopup(popupEditForm);
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

popupSubmitEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    togglePopup(popupEditForm);
})

popupEditFormCloseBtn.addEventListener('click', () => {
    togglePopup(popupEditForm);
})


// Popup add-card handling
addCardBtn.addEventListener('click', openAddCardForm);

function openAddCardForm() {
    togglePopup(popupAddCardForm);
    inputPlace.value = '';
    inputUrl.value = '';
}

popupSubmitAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const title = inputPlace.value;
    const url = inputUrl.value;
    const card = createCard(title, url);
    addCard(card, 'top');
    togglePopup(popupAddCardForm);
})

popupAddCardCloseBtn.addEventListener('click', () => {
    togglePopup(popupAddCardForm);
})

function createCard(title, url) {
    const element = template.querySelector('.element').cloneNode(true);
    
    const text = element.querySelector('.element__title');
    text.textContent = title;

    const pic = element.querySelector('.element__image');
    pic.src = url;
    pic.alt = title;
    
    const picBtn = element.querySelector('.element__image');
    picBtn.addEventListener('click', () => { openPicPopup(pic, text) })
    
    const removeBtn = element.querySelector('.element__remove');
    removeBtn.addEventListener('click', () => { element.remove(); })

    const likeBtn = element.querySelector('.element__like')
    likeBtn.addEventListener('click', () => { likeBtn.classList.toggle('element__like_active'); })
    
    return element;
}

function addCard(card, pos) {
    if (pos === 'top') {
        elements.prepend(card);
    } else {
        elements.append(card);
    }
}

// Handling "pic popup"
function openPicPopup(pic, text) {
    popupPicImage.src = pic.src;
    popupPicImage.alt = pic.alt;
    popupPicText.textContent = text.textContent;
    togglePopup(popupPic);
}

// Universal "toggle popup"
function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}