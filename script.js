// Querying elements
//let likes = document.querySelectorAll(".element__like");
let editForm = document.querySelector(".popup");
let editBtn = document.querySelector(".profile__edit");
let closeBtn = editForm.querySelector(".popup__close");
let submitBtn = editForm.querySelector(".popup__submit");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let inputName = editForm.querySelector(".popup__input_type_name");
let inputJob = editForm.querySelector(".popup__input_type_job");

function openPopup() {
    togglePopup()
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

function togglePopup() {
    editForm.classList.toggle('popup_opened');
}

// Handling "like buttons"
/*likes.forEach(like => {
    like.addEventListener("click", function likeToggle() {
        like.classList.toggle('element__like_active');
    })
} )*/

// Handling "edit button"
editBtn.addEventListener("click", openPopup);

// Handling "close button"
closeBtn.addEventListener("click", togglePopup);

// Handling "submit button"
submitBtn.addEventListener("click", function submit(evt){
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    togglePopup();
})
