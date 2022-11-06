// Imports
import { initialCards, validationData} from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";

// Profile elements
const editingBtn = document.querySelector('.profile__edit-btn');
const addingCardBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Popup edit-card elements
const popupEditCard = document.querySelector('.popup_type_edit-card');
const editingForm = popupEditCard.querySelector('.form-edit');
const popupEditCardCloseBtn = popupEditCard.querySelector('.popup__close-btn');
const inputName = popupEditCard.querySelector('.form__input_field-name');
const inputNameError = popupEditCard.querySelector('#field-name-error');
const inputJob = popupEditCard.querySelector('.form__input_field-job');
const inputJobError = popupEditCard.querySelector('#field-job-error');

// Popup add-card elements
const popupAddCard = document.querySelector('.popup_type_add-card');
const addingForm = popupAddCard.querySelector('.form-add');
const popupAddCardCloseBtn = popupAddCard.querySelector('.popup__close-btn');
const inputPlace = popupAddCard.querySelector('.form__input_field-place');
const inputPlaceError = popupEditCard.querySelector('#field-place-error');
const inputUrl = popupAddCard.querySelector('.form__input_field-url');
const inputUrlError = popupEditCard.querySelector('#field-url-error');

// Popup pic elements
const popupPic = document.querySelector('.popup_type_pic');
const popupPicImage = popupPic.querySelector('.popup__image');
const popupPicText = popupPic.querySelector('.popup__text');
const popupPicCloseBtn = popupPic.querySelector('.popup__close-btn');
popupPicCloseBtn.addEventListener('click', () => {
  togglePopup(popupPic);
});

// Other data
const elements = document.querySelector('.elements');
const templateSelector = '.template';
const editingFormValidator = new FormValidator(validationData, editingForm);
editingFormValidator.enableValidation();
const addingFormValidator = new FormValidator(validationData, addingForm);
addingFormValidator.enableValidation();

// Filling card data
initialCards.forEach((el) => {
  addCard(el.name, el.link, 'bottom');
});

// Popup edit-card handling
editingBtn.addEventListener('click', handleEditClick);

function handleEditClick() {
  togglePopup(popupEditCard);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  // Validating form on open
  editingFormValidator.validateOnOpen();
}

editingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  togglePopup(popupEditCard);
});

popupEditCardCloseBtn.addEventListener('click', () => {
  togglePopup(popupEditCard);
});

// Popup add-card handling
addingCardBtn.addEventListener('click', handleAddCardClick);

function handleAddCardClick() {
  togglePopup(popupAddCard);
  addingForm.reset()
  addingFormValidator.validateOnOpen();
}

addingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const title = inputPlace.value;
  const url = inputUrl.value;
  addCard(title, url, 'top');
  togglePopup(popupAddCard);
});

popupAddCardCloseBtn.addEventListener('click', () => {
  togglePopup(popupAddCard);
});

function addCard(title, url, pos) {
  const card = new Card(title, url, templateSelector).getCard();
  if (pos === 'top') {
    elements.prepend(card);
  } else {
    elements.append(card);
  }
}

// Handling 'pic popup'
export function openPicPopup(pic, text) {
  popupPicImage.src = pic.src;
  popupPicImage.alt = pic.alt;
  popupPicText.textContent = text.textContent;
  togglePopup(popupPic);
}

// Universal 'toggle popup'
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', handleEscapePress);
  } else {
    document.removeEventListener('keydown', handleEscapePress);
  }
}

// Closing by click on Overlay (.popup)
popupEditCard.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    togglePopup(popupEditCard);
  }
});

popupAddCard.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    togglePopup(popupAddCard);
  }
});

popupPic.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    togglePopup(popupPic);
  }
});

// Closing by pressing 'ESC'
function handleEscapePress(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    togglePopup(openedPopup);
  }
}