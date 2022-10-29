const enableValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submittingButtonSelector: '.form__submit',
  inputErrorSelector: '.error',
  inputErrorVisible: 'error_visible',
  submittingButtonInvalid: 'form__submit_invalid',
  inputInvalid: 'form__input_invalid',
  errorVisible: 'error__visible'
};

function validateOnOpen(card) {
  const formElement = card.querySelector(enableValidation.formSelector);
  const inputList = Array.from(card.querySelectorAll(enableValidation.inputSelector));
  const submittingButton = card.querySelector(enableValidation.submittingButtonSelector);
  checkIfAllInputIsValid(inputList, submittingButton);
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
  const submittingButton = formElement.querySelector(enableValidation.submittingButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      // Handling Error message (span) & Red underline warning
      checkInputValidity(formElement, inputElement);
      // Handling Submit Button state:
      checkIfAllInputIsValid(inputList, submittingButton);
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

function checkIfAllInputIsValid(inputList, submittingButton) {
  // Return FALSE if at least 1 inputElement is NOT valid
  const valid = !inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  if (valid) {
    toggleSubmitState(true, submittingButton);
  } else {
    toggleSubmitState(false, submittingButton);
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

function toggleSubmitState(state, submittingButton) {
  if (state) {
    submittingButton.classList.remove(enableValidation.submittingButtonInvalid);
    submittingButton.removeAttribute('disabled');
  } else {
    submittingButton.classList.add(enableValidation.submittingButtonInvalid);
    submittingButton.setAttribute('disabled', true);
  }
}

checkIfValid();