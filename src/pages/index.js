// Imports
import './index.css';
import { initialCards, validationData } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Profile elements
const editingBtn = document.querySelector('.profile__edit-btn');
const addingCardBtn = document.querySelector('.profile__add-btn');

// Popup edit-card elements
const popupEditCard = document.querySelector('.popup_type_edit-card');
const editingForm = popupEditCard.querySelector('.form-edit');
const inputName = popupEditCard.querySelector('.form__input_field-name');
const inputJob = popupEditCard.querySelector('.form__input_field-job');

// Popup add-card elements
const popupAddCard = document.querySelector('.popup_type_add-card');
const addingForm = popupAddCard.querySelector('.form-add');

// Other data
const cardsContainerSel = '.elements';
const cardsContainerEl = document.querySelector(cardsContainerSel);
const editingFormValidator = new FormValidator(validationData, editingForm);
editingFormValidator.enableValidation();
const addingFormValidator = new FormValidator(validationData, addingForm);
addingFormValidator.enableValidation();

// Filling cards data
const initialCardsList = new Section({
  renderer: (cardItem) => {
    const card = createCard(cardItem.name, cardItem.link);
    initialCardsList.addItem(card, 'bottom');
  },
},
  cardsContainerSel
)

initialCardsList.renderItems(initialCards);

// Popup Edit-Card handling
const popupWithEditForm = new PopupWithForm(
  '.popup_type_edit-card',
  {
    openCallback: () => {
      const userInfo = new UserInfo({ profileNameSel: '.profile__name', profileJobSel: '.profile__job' });
      const userInfoData = userInfo.getUserInfo();
      inputName.value = userInfoData.name;
      inputJob.value = userInfoData.job;
      editingFormValidator.validateOnOpen();
      popupWithEditForm.setEventListeners();
    },
    submitCallback: (inputValues) => {
      const userInfo = new UserInfo({ profileNameSel: '.profile__name', profileJobSel: '.profile__job' });
      userInfo.setUserInfo(inputValues);
    }
  }
)

// Popup Add-Card handling
const popupWithAddCardForm = new PopupWithForm(
  '.popup_type_add-card',
  {
    openCallback: () => {
      addingFormValidator.validateOnOpen();
      popupWithAddCardForm.setEventListeners();
    },
    submitCallback: (inputValues) => {
      const card = createCard(inputValues.place, inputValues.url);
      addCard(card, 'top');
    }
  }
)

// Popup Image handling 
const popupWithImage = new PopupWithImage('.popup_type_pic');
popupWithImage.setEventListeners();

// Eventlisteners
editingBtn.addEventListener('click', () => { popupWithEditForm.open() });
addingCardBtn.addEventListener('click', () => { popupWithAddCardForm.open() });

// Creating card
export function createCard(title, url) {
  const card = new Card(
    title,
    url,
    {
      handleCardClick: (imgSrc, imgAlt, text) => {
        popupWithImage.open(imgSrc, imgAlt, text);
      }
    }
  ).getCard();
  return card;
}

// Adding card 
export function addCard(card, pos) {
  pos === 'top'
    ? cardsContainerEl.prepend(card)
    : cardsContainerEl.append(card);
}