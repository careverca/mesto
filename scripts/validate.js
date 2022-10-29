const enableValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inputErrorSelector: '.error',
  inputErrorVisible: 'error_visible',
  submitButtonInvalid: 'form__submit_invalid',
  inputInvalid: 'form__input_invalid',
  errorVisible: 'error__visible'
};

function validateOnOpen(card) {
  const formElement = card.querySelector(enableValidation.formSelector);
  const inputList = Array.from(card.querySelectorAll(enableValidation.inputSelector));
  const submitButton = card.querySelector(enableValidation.submitButtonSelector);
  checkIfAllInputIsValid(inputList, submitButton);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  })
}

function checkIfValid() {
  // Querying every .form
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

function setEventListeners(formElement) {
  // Querying every .form__input
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  const submitButton = formElement.querySelector(enableValidation.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
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
  const errorElement = formElement.querySelector(
    '#' + inputElement.name + '-error'
  );
  inputElement.classList.add(enableValidation.inputInvalid);
  errorElement.classList.add(enableValidation.errorVisible);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    '#' + inputElement.name + '-error'
  );
  inputElement.classList.remove(enableValidation.inputInvalid);
  errorElement.classList.remove(enableValidation.errorVisible);
  errorElement.textContent = '';
}

function toggleSubmitState(state, submitButton) {
  if (state) {
    submitButton.classList.remove(enableValidation.submitButtonInvalid);
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.classList.add(enableValidation.submitButtonInvalid);
    submitButton.setAttribute('disabled', true);
  }
}

checkIfValid();