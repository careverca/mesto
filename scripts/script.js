// Imports
import { initialCards, validationData } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// Profile elements
const editingBtn = document.querySelector('.profile__edit-btn');
const addingCardBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Popup edit-card elements
const popupEditCard = document.querySelector('.popup_type_edit-card');
const editingForm = popupEditCard.querySelector('.form-edit');
const inputName = popupEditCard.querySelector('.form__input_field-name');
const inputJob = popupEditCard.querySelector('.form__input_field-job');

// Popup add-card elements
const popupAddCard = document.querySelector('.popup_type_add-card');
const addingForm = popupAddCard.querySelector('.form-add');
const inputPlace = popupAddCard.querySelector('.form__input_field-place');
const inputUrl = popupAddCard.querySelector('.form__input_field-url');

// Other data
const templateSelector = '.template';
const cardsContainer = '.elements';
const cardsContainerEl = document.querySelector(cardsContainer);
const editingFormValidator = new FormValidator(validationData, editingForm);
editingFormValidator.enableValidation();
const addingFormValidator = new FormValidator(validationData, addingForm);
addingFormValidator.enableValidation();

// Filling cards data
const initialCardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem.name, cardItem.link).getCard();
    initialCardsList.addItem(card, 'bottom');
  },
},
  cardsContainer
)

initialCardsList.renderItems();

// Popup edit-card handling
editingBtn.addEventListener('click', handleEditBtnClick);
const userInfo = new UserInfo(profileName.textContent, profileJob.textContent);

function handleEditBtnClick() {
  const popupWithForm = new PopupWithForm(
    '.popup_type_edit-card',
    {
      openCallback: () => {
        const userInfoData = userInfo.getUserInfo();
        inputName.value = userInfoData.name;
        inputJob.value = userInfoData.job;
        editingFormValidator.validateOnOpen();
      },
      submitCallback: (evt) => {
        evt.preventDefault();
        userInfo.setUserInfo();
        popupWithForm.close();
      }
    }
  )
  popupWithForm.open();
}

// Popup add-card handling
addingCardBtn.addEventListener('click', handleAddCardBtnClick);

function handleAddCardBtnClick() {
  const popupWithForm = new PopupWithForm(
    '.popup_type_add-card',
    {
      openCallback: () => {
        addingForm.reset()
        addingFormValidator.validateOnOpen();
      },
      submitCallback: (evt) => {
        evt.preventDefault();
        const title = inputPlace.value;
        const url = inputUrl.value;
        addCard(title, url, 'top');
        popupWithForm.close();
      }
    }
  )
  popupWithForm.open();
}

function addCard(title, url, pos) {
  const card = new Card(title, url, templateSelector).getCard();
  pos === 'top'
    ? cardsContainerEl.prepend(card)
    : cardsContainerEl.append(card);
}