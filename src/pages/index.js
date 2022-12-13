// Imports
import './index.css';
import { initialCards, validationData } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';

// Profile elements
const userId = '025d241ad4a5747411c316a4'
const editingBtn = document.querySelector('.profile__edit-btn');
const addingCardBtn = document.querySelector('.profile__add-btn');
const editProfileImg = document.querySelector('.profile__avatar-box');
const popupEditProfileImg = document.querySelector('.popup_type_edit-profile-img');
const profileImg = document.querySelector('.profile__avatar');
const formInputProfileImg = document.querySelector('.form__input_img');
const editProfileImgForm = document.querySelector('.form-edit-profile-img');
const submitProfileImgBtn = popupEditProfileImg.querySelector('.form__submit');

// Popup edit-card elements
const popupEditCard = document.querySelector('.popup_type_edit-card');
const editingForm = popupEditCard.querySelector('.form-edit');
const inputName = popupEditCard.querySelector('.form__input_field-name');
const inputJob = popupEditCard.querySelector('.form__input_field-job');
const submitEditBtn = popupEditCard.querySelector('.form__submit');

// Popup add-card elements
const popupAddCard = document.querySelector('.popup_type_add-card');
const addingForm = popupAddCard.querySelector('.form-add');
const submitAddBtn = popupAddCard.querySelector('.form__submit');

// Other data
const cardsContainerSel = '.elements';
const cardsContainerEl = document.querySelector(cardsContainerSel);
const editingFormValidator = new FormValidator(validationData, editingForm);
const addingFormValidator = new FormValidator(validationData, addingForm);
const updatingImageFormValidator = new FormValidator(validationData, editProfileImgForm);
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const submitCardDeletion = popupDeleteCard.querySelector('.form__submit');
editingFormValidator.enableValidation();
addingFormValidator.enableValidation();
updatingImageFormValidator.enableValidation();


// Setting initial Cards from API
(function queryCards() {
  api.getInitialCards()
    .then(initialCards => {
      setInitialCards(initialCards);
    })
})();
function setInitialCards(initialCards) {
  const initialCardsList = new Section({
    renderer: (cardItem) => {
      const owned = cardItem.owner._id === userId;
      const card = createCard(cardItem.name, cardItem.link, cardItem._id, cardItem.likes, owned);
      initialCardsList.addItem(card, 'bottom');
    },
  },
    cardsContainerSel
  )
  initialCardsList.renderItems(initialCards);
}

// Setting User Info
const userInfo = new UserInfo({ profileNameSel: '.profile__name', profileJobSel: '.profile__job' });
api.getProfileData()
  .then(data => {
    userInfo.setUserInfo(data)
  })

// Popup Edit User Info handling
const popupWithEditForm = new PopupWithForm(
  '.popup_type_edit-card',
  {
    openCallback: () => {
      const userInfoData = userInfo.getUserInfo();
      inputName.value = userInfoData.name;
      inputJob.value = userInfoData.job;
      editingFormValidator.validateOnOpen();
    },
    submitCallback: (inputValues) => {
      submitEditBtn.innerText = 'Сохранение...';
      api.setProfileData(inputValues)
        .then(() => {
          api.getProfileData()
            .then(data => {
              userInfo.setUserInfo(data)
            })
        })
        .finally(res => {
          popupWithEditForm.close()
          submitEditBtn.innerText = 'Сохранить';
        })
    }
  }
)
popupWithEditForm.setEventListeners();

// Popup Add-Card handling
const popupWithAddCardForm = new PopupWithForm(
  '.popup_type_add-card',
  {
    openCallback: () => {
      addingFormValidator.validateOnOpen();
    },
    submitCallback: (inputValues) => {
      submitAddBtn.innerText = 'Сохранение...';
      api.addNewCard({ place: inputValues.place, url: inputValues.url })
        .then(res => {
          const card = createCard(res.name, res.link, res._id, res.likes, true);
          addCard(card, 'top')
        })
        .finally(res => {
          popupWithAddCardForm.close()
          submitAddBtn.innerText = 'Сохранить';
        })
    }
  }
)
popupWithAddCardForm.setEventListeners();

// Popup Image handling 
const popupWithImage = new PopupWithImage('.popup_type_pic');
popupWithImage.setEventListeners();

// Popup with Confimation handling
const popupWithConfirmation = new PopupWithForm('.popup_type_delete-card',
  {
    openCallback: () => { },
    submitCallback: () => {
      console.log('New submit handler will be made');
    }
  });
popupWithConfirmation.setEventListeners();

// Edit Profile image handling
const popupWithProfileImgEditing = new PopupWithForm('.popup_type_edit-profile-img',
  {
    openCallback: () => { },
    submitCallback: () => {
      console.log('New submit handler will be made');
    }
  });
popupWithProfileImgEditing.setEventListeners();
popupWithProfileImgEditing.changeSumbitHandler(() => {
  submitProfileImgBtn.innerText = 'Сохранение...';
  api.updateProfileImage(formInputProfileImg.value)
    .then(res => {
      console.log(res);
      profileImg.src = res.avatar;
    })
    .finally(res => {
      popupWithProfileImgEditing.close()
      submitProfileImgBtn.innerText = 'Сохранить';
    })
})


// Eventlisteners
editingBtn.addEventListener('click', () => { popupWithEditForm.open() });
addingCardBtn.addEventListener('click', () => { popupWithAddCardForm.open() });
editProfileImg.addEventListener('click', () => { popupWithProfileImgEditing.open() })

// Creating card
export function createCard(title, url, id, likes, owned) {
  const card = new Card(
    title,
    url,
    id,
    likes,
    owned,
    {
      handleImageClick: (imgSrc, imgAlt, text) => {
        popupWithImage.open(imgSrc, imgAlt, text);
      },
      handleDeletionClick: (id) => {
        popupWithConfirmation.open()
        popupWithConfirmation.changeSumbitHandler(() => {
          submitCardDeletion.innerText = 'Удаление...';
          api.deleteCard(id)
            .then(() => {
              card.deleteCard();
            })
            .finally(() => {
              popupWithConfirmation.close();
              submitCardDeletion.innerText = 'Сохранить';
            })
        }
        )
      }
    },
  );
  return card.getCard();
}

// Adding card 
export function addCard(card, pos) {
  pos === 'top'
    ? cardsContainerEl.prepend(card)
    : cardsContainerEl.append(card);
}