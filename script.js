// Querying elements
let likes = document.querySelectorAll(".element__like");
let editForm = document.querySelector(".popup");
let editBtn = document.querySelector(".profile__edit");
let closeBtn = editForm.querySelector(".popup__close");
let submitBtn = editForm.querySelector(".popup__submit");

// Handling "like buttons"
likes.forEach(like => {
    like.addEventListener("click", function likeToggle() {
        like.classList.toggle('element__like_active');
    })
} )

// Handling "edit button"
editBtn.addEventListener("click", function openPopup() {
    editForm.classList.toggle('popup_opened');
    let profileName = document.querySelector(".profile__name");
    let profileJob = document.querySelector(".profile__job");
    editForm.querySelector(".popup__input_name").value = profileName.innerHTML;
    editForm.querySelector(".popup__input_job").value = profileJob.innerHTML;
})

// Handling "close button"
closeBtn.addEventListener("click", function closePopup() {
    editForm.classList.toggle('popup_opened');
})

// Handling "submit button"
submitBtn.addEventListener("click", function submit(evt){
evt.preventDefault();
let inputName = editForm.querySelector(".popup__input_name");
let inputJob = editForm.querySelector(".popup__input_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
profileName.innerHTML = inputName.value;
profileJob.innerHTML = inputJob.value;
editForm.classList.toggle('popup_opened');
})