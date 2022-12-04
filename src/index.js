// Imports
import './pages/index.css'; 
import { initialCards, validationData } from './utils/constants.js';
import { Card } from './components/Card.js';
import { FormValidator } from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

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

// Other data
const cardsContainer = '.elements';
const cardsContainerEl = document.querySelector(cardsContainer);
const editingFormValidator = new FormValidator(validationData, editingForm);
editingFormValidator.enableValidation();
const addingFormValidator = new FormValidator(validationData, addingForm);
addingFormValidator.enableValidation();
//const popupWithImage = new PopupWithImage('.popup_type_pic');

// Filling cards data
const initialCardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(
      cardItem.name,
      cardItem.link,
      {
        handleCardClick: (imgSrc, imgAlt, text) => {
          popupWithImage.open(imgSrc, imgAlt, text);
        }
      }
    ).getCard();
    initialCardsList.addItem(card, 'bottom');
  },
},
  cardsContainer
)

initialCardsList.renderItems();

// Popup edit-card handling
editingBtn.addEventListener('click', handleEditBtnClick);
function handleEditBtnClick() {
  const userInfo = new UserInfo(profileName.textContent, profileJob.textContent);
  const popupWithForm = new PopupWithForm(
    '.popup_type_edit-card',
    {
      openCallback: () => {
        const userInfoData = userInfo.getUserInfo();
        inputName.value = userInfoData.name;
        inputJob.value = userInfoData.job;
        editingFormValidator.validateOnOpen();
  popupWithForm.setEventListeners();
      },
      submitCallback: (inputValues) => {
        userInfo.setUserInfo(inputValues);
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
        //addingForm.reset()
        addingFormValidator.validateOnOpen();
      },
      submitCallback: (inputValues) => {
        const title = inputValues.place;
        const url = inputValues.url;
        addCard(title, url, 'top');
      }
    }
  )
  popupWithForm.setEventListeners();
  popupWithForm.open();
}

function addCard(title, url, pos) {
  const card = new Card(
    title,
    url,
    {
      handleCardClick: (imgSrc, imgAlt, text) => {
        popupWithImage.open(imgSrc, imgAlt, text);
      }
    }
  ).getCard();
  console.log(card);

  pos === 'top'
    ? cardsContainerEl.prepend(card)
    : cardsContainerEl.append(card);
}