const enableValidation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__sumbit",
  inactiveButtonClass: ".form__sumbit_invalid",
  inputErrorClass: ".error",
  inputErrorVisibleClass: ".error_visible",
};

function validateOnOpen(card) {
  const formElement = card.querySelector('.form');
  const inputList = Array.from(card.querySelectorAll('.form__input'));
  const submitButton = card.querySelector('.form__submit');
  checkIfAllInputIsValid(inputList, submitButton);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  })
}

function checkIfValid() {
  // Querying every .form
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

function setEventListeners(formElement) {
  // Querying every .form__input
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  const submitButton = formElement.querySelector('.form__submit');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      // Handling Error message (span) & Red underline warning
      checkInputValidity(formElement, inputElement);
      // Handling Submit Button state:
      checkIfAllInputIsValid(inputList, submitButton);
    });
  });
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function checkIfAllInputIsValid(inputList, submitButton) {
  // Return FALSE if at least 1 inputElement is NOT valid
  const valid = !inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  if (valid) {
    toggleSubmitState(true, submitButton);
  } else {
    toggleSubmitState(false, submitButton);
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  console.log("#" + inputElement.name + "-error");
  const errorElement = formElement.querySelector(
    "#" + inputElement.name + "-error"
  );
  inputElement.classList.add("form__input_invalid");
  errorElement.classList.add("error_visible");
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    "#" + inputElement.name + "-error"
  );
  inputElement.classList.remove("form__input_invalid");
  errorElement.classList.remove("error_visible");
  errorElement.textContent = "";
}

function toggleSubmitState(state, submitButton) {
  if (state) {
    submitButton.classList.remove("form__submit_invalid");
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.classList.add("form__submit_invalid");
    submitButton.setAttribute("disabled", true);
  }
}

checkIfValid();