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

// Querying elements
const popupEditForm = document.querySelector('.popup');
const editBtn = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const addBtn = document.querySelector('.profile__add');
const submitBtn = popupEditForm.querySelector('.popup__submit');
const popupForm = popupEditForm.querySelector('.popup__form');
const popupTitle = popupEditForm.querySelector('.popup__title');
const inputFieldName = popupEditForm.querySelector('.popup__input_field-name');
const inputFieldJob = popupEditForm.querySelector('.popup__input_field-job');
const inputFieldPlace = popupEditForm.querySelector('.popup__input_field-place');
const inputFieldUrl = popupEditForm.querySelector('.popup__input_field-url');
const popupImg = document.querySelector('.img-popup');
const popupImgPic = document.querySelector('.img-popup__pic');
const popupImgText = document.querySelector('.img-popup__text');

// Filling elements
const elements = document.querySelector('.elements');
const template = elements.querySelector('.template').content;
initialCards.forEach((el) => {
    const element = template.querySelector('.element').cloneNode(true);
    element.querySelector('.element__title').textContent = el.name;
    element.querySelector('.element__image').src = el.link;
    elements.append(element);
})

// Handling 'edit button'
editBtn.addEventListener('click', showEditPopup);

// Handling 'close buttons'
const closeBtn = document.querySelectorAll('.close-btn');
closeBtn.forEach(el => {
    el.addEventListener('click', evt => {
        console.log(evt.target.className);
        const evtTarget = evt.target;
        console.log(evtTarget.parentElement.className);
        if (evtTarget.parentElement.className === 'popup__container') {
            popupEditForm.classList.remove('popup_opened');
        } else if (evtTarget.parentElement.className === 'img-popup__container') {
            popupImg.classList.toggle('img-popup_opened');
        }
    })
});

// Handling 'submit buttons'
popupForm.addEventListener('submit', function submit(evt){
    evt.preventDefault();
    if (popupTitle.textContent === 'Редактировать профиль') {
        profileName.textContent = inputFieldName.value;
        profileJob.textContent = inputFieldJob.value;
        togglePopup();
    } else if (popupTitle.textContent === 'Новое место') {
        createCard();
    }
})

// Handling 'add button'
addBtn.addEventListener('click', showAddPopup);

// Handling 'like buttons'
function queryLikes() {
    const likeBtns = document.querySelectorAll('.element__like');
    likeBtns.forEach(el => {
        el.addEventListener('click', evt => {
            const evtTarget = evt.target;
            console.log(evtTarget);
            evtTarget.classList.toggle('element__like_active');
        })
    })
}

// Handling 'remove buttons'
function queryRm() {
    const rmBtns = document.querySelectorAll('.element__remove');
    rmBtns.forEach(el => {
        el.addEventListener('click', evt => {
            const evtTarget = evt.target;
            console.log(rmBtns);
            evtTarget.parentNode.remove();
            queryLikes();
            handleImgs();
        })
    })
}

// Handling 'img buttons' & showing 'img-popup'
function handleImgs() {
    const imgBtn = document.querySelectorAll('.element__image');
    imgBtn.forEach(el => {
        el.addEventListener('click', evt => {
            const evtTarget = evt.target;
            popupImg.classList.add('img-popup_opened');
            popupImgPic.src = evtTarget.src;
            popupImgText.textContent = evtTarget.nextElementSibling.firstElementChild.textContent;
        })
    })
}

// Showing 'edit popup'
function showEditPopup() {
    if (!popupEditForm.classList.contains('popup_opened')) {
        popupTitle.textContent = 'Редактировать профиль';
        submitBtn.textContent = 'Сохранить';
        inputFieldName.style.display = "block";
        inputFieldJob.style.display = "block";
        inputFieldPlace.style.display = "none";
        inputFieldUrl.style.display = "none";
        inputFieldName.value = profileName.textContent;
        inputFieldJob.value = profileJob.textContent;
    }
    togglePopup();
}

// Showing 'add popup'
function showAddPopup() {
    if (!popupEditForm.classList.contains('popup_opened')) {
        popupTitle.textContent = 'Новое место';
        submitBtn.textContent = 'Создать';
        inputFieldPlace.style.display = "block";
        inputFieldUrl.style.display = "block";
        inputFieldName.style.display = "none";
        inputFieldJob.style.display = "none";
        inputFieldPlace.value = '';
        inputFieldUrl.value = '';
    }
    togglePopup();
}

// Creating a new card
function createCard() {
    const element = template.querySelector('.element').cloneNode(true);
    element.querySelector('.element__title').textContent = inputFieldPlace.value;
    element.querySelector('.element__image').src = inputFieldUrl.value;
    elements.prepend(element);
    queryLikes();
    handleImgs();
    queryRm();
    togglePopup();
}

function togglePopup() {
    popupEditForm.classList.toggle('popup_opened');
}

queryLikes();
queryRm();
handleImgs();