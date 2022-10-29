// Profile elements
const editBtn = document.querySelector(".profile__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");


// Popup edit-card elements
const popupEditCard = document.querySelector(".popup_type_edit-card");
const editForm = popupEditCard.querySelector(".form-edit");
const popupEditCardCloseBtn = popupEditCard.querySelector(".popup__close-btn");
const inputName = popupEditCard.querySelector(".form__input_field-name");
const inputNameError = popupEditCard.querySelector("#field-name-error");
const inputJob = popupEditCard.querySelector(".form__input_field-job");
const inputJobError = popupEditCard.querySelector("#field-job-error");

// Popup add-card elements
const popupAddCard = document.querySelector(".popup_type_add-card");
const addForm = popupAddCard.querySelector(".form-add");
const popupAddCardCloseBtn = popupAddCard.querySelector(".popup__close-btn");
const inputPlace = popupAddCard.querySelector(".form__input_field-place");
const inputPlaceError = popupEditCard.querySelector("#field-place-error");
const inputUrl = popupAddCard.querySelector(".form__input_field-url");
const inputUrlError = popupEditCard.querySelector("#field-url-error");

// Popup pic elements
const popupPic = document.querySelector(".popup_type_pic");
const popupPicImage = popupPic.querySelector(".popup__image");
const popupPicText = popupPic.querySelector(".popup__text");
const popupPicCloseBtn = popupPic.querySelector(".popup__close-btn");
popupPicCloseBtn.addEventListener("click", () => {
  togglePopup(popupPic);
});

// Other elements
const elements = document.querySelector(".elements");
const template = elements.querySelector(".template").content;

// Filling card data
initialCards.forEach((el) => {
  el = createCard(el.name, el.link);
  addCard(el, "bottom");
});

// Popup edit-card handling
editBtn.addEventListener("click", openEditForm);

function openEditingForm() {
  togglePopup(popupEditCard);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  // Validating form on open
  validateOnOpen(popupEditCard);
}

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  togglePopup(popupEditCard);
});

popupEditCardCloseBtn.addEventListener("click", () => {
  togglePopup(popupEditCard);
});

// Popup add-card handling
addCardBtn.addEventListener("click", openAddCardForm);

function openAddCardForm() {
  const submitButton = popupAddCard.querySelector(".form__submit");
  togglePopup(popupAddCard);
  inputPlace.parentElement.reset();
}

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = inputPlace.value;
  const url = inputUrl.value;
  const card = createCard(title, url);
  addCard(card, "top");
  togglePopup(popupAddCard);
});

popupAddCardCloseBtn.addEventListener("click", () => {
  togglePopup(popupAddCard);
});

function createCard(title, url) {
  const element = template.querySelector(".element").cloneNode(true);

  const text = element.querySelector(".element__title");
  text.textContent = title;

  const pic = element.querySelector(".element__image");
  pic.src = url;
  pic.alt = title;

  const picBtn = element.querySelector(".element__image");
  picBtn.addEventListener("click", () => {
    openPicPopup(pic, text);
  });

  const deletionBtn = element.querySelector(".element__remove");
  deletionBtn.addEventListener("click", () => {
    element.remove();
  });

  const likeBtn = element.querySelector(".element__like");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("element__like_active");
  });

  return element;
}

function addCard(card, pos) {
  if (pos === "top") {
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
  popup.classList.toggle("popup_opened");
  if (popup.classList.contains('popup_opened')) {
    document.addEventListener("keydown", closeByEscape);
  } else {
    document.removeEventListener("keydown", closeByEscape);
  }
}

// Closing by click on Overlay (.popup)
popupEditCard.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) {
    togglePopup(popupEditCard);
  }
});

popupAddCard.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) {
    togglePopup(popupAddCard);
  }
});

popupPic.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) {
    togglePopup(popupPic);
  }
});

// Closing by pressing 'ESC'
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    togglePopup(openedPopup);
  }
}