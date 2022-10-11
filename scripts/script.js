// Default data
const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: '/images/kch.jpg'
  },
  {
    name: 'Горный Алтай',
    link: '/images/altay.jpg'
  },
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
const editForm = document.querySelector('.popup');
const editBtn = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const addBtn = document.querySelector('.profile__add');
const submitBtn = editForm.querySelector('.popup__submit');
const popupForm = editForm.querySelector('.popup__form');
const popupTitle = editForm.querySelector('.popup__title');
const inputField1 = editForm.querySelector('.popup__input_field-1');
const inputField2 = editForm.querySelector('.popup__input_field-2');
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
            editForm.classList.remove('popup_opened');
        } else if (evtTarget.parentElement.className === 'img-popup__container') {
            popupImg.classList.toggle('img-popup_opened');
        }
    })
});

// Handling 'submit buttons'
popupForm.addEventListener('submit', function submit(evt){
    evt.preventDefault();
    if (popupTitle.textContent === 'Редактировать профиль') {
        profileName.textContent = inputField1.value;
        profileJob.textContent = inputField2.value;
        togglePopup();
    } else if (popupTitle.textContent === 'Новое место') {
        createCard();
    }
})

// Handling 'add button'
addBtn.addEventListener('click', showAddPopup);

// Handling 'like buttons'
function queryLikes() {
    let likeBtn = document.querySelectorAll('.element__like');
    likeBtn.forEach(el => {
        el.addEventListener('click', evt => {
            const evtTarget = evt.target;
            evtTarget.classList.toggle('element__like_active');
        })
    })
}

// Handling 'remove buttons'
function queryRm() {
    let rmBtn = document.querySelectorAll('.element__remove');
    rmBtn.forEach(el => {
        el.addEventListener('click', evt => {
            const evtTarget = evt.target;
            evtTarget.parentNode.remove();
        })
    })
}

// Handling 'img buttons' & showing 'img-popup'
function imgPopup() {
    let imgBtn = document.querySelectorAll('.element__image');
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
    if (!editForm.classList.contains('popup_opened')) {
        popupTitle.textContent = 'Редактировать профиль';
        submitBtn.textContent = 'Сохранить';
        inputField1.setAttribute('placeholder', 'Имя');
        inputField2.setAttribute('placeholder', 'Специальность');
        inputField1.value = profileName.textContent;
        inputField2.value = profileJob.textContent;
    }
    togglePopup();
}

// Showing 'add popup'
function showAddPopup() {
    if (!editForm.classList.contains('popup_opened')) {
        popupTitle.textContent = 'Новое место';
        submitBtn.textContent = 'Создать';
        inputField1.setAttribute('placeholder', 'Название');
        inputField2.setAttribute('placeholder', 'Ссылка на картинку');
        inputField1.value = '';
        inputField2.value = '';
    }
    togglePopup();
}

// Creating a new card
function createCard() {
    const element = template.querySelector('.element').cloneNode(true);
    element.querySelector('.element__title').textContent = inputField1.value;
    element.querySelector('.element__image').src = inputField2.value;
    elements.prepend(element);
    queryLikes();
    queryRm();
    queryImg();
    togglePopup();
}

function togglePopup() {
    editForm.classList.toggle('popup_opened');
}

queryLikes();
queryRm();
imgPopup();