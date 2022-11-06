export class FormValidator {
  constructor (validationData, validationObject) {
    this._validationData = validationData;
    this._validationObject = validationObject;
    this._submittingButton = this._validationObject.querySelector(this._validationData.submittingButtonSelector);
    this._inputList = Array.from(this._validationObject.querySelectorAll(this._validationData.inputSelector));
  }

  enableValidation() {
    this._setEventListener();
  }
  
  validateOnOpen() {
    // If no input is made, show no error
    const inputIsEmpty = this._inputList.every((inputElement) => { 
      return inputElement.value === ''; });
    if (inputIsEmpty) { return; }

    this._checkIfAllInputIsValid();
    this._inputList.forEach((inputElement) => {
        this._checkInputValidity(inputElement);
    })
  }

  _setEventListener() {
    // Querying every .form__input
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // Handling Error message (span) & Red underline warning
        this._checkInputValidity(inputElement);
        // Handling Submit Button state:
        this._checkIfAllInputIsValid();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _checkIfAllInputIsValid() {
    // Return FALSE if at least 1 inputElement is NOT valid
    const valid = !this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    if (valid) {
      this._toggleSubmitState(true);
    } else {
      this._toggleSubmitState(false);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._validationObject.querySelector(
      '#' + inputElement.name + '-error'
    );
    inputElement.classList.add(this._validationData.inputInvalid);
    errorElement.classList.add(this._validationData.errorVisible);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this.validationObject.querySelector(
      '#' + inputElement.name + '-error'
    );
    inputElement.classList.remove(this._validationData.inputInvalid);
    errorElement.classList.remove(this._validationData.errorVisible);
    errorElement.textContent = '';
  }

  _toggleSubmitState(state) {
    if (state) {
      this._submittingButton.classList.remove(this._validationData.submittingButtonInvalid);
      this._submittingButton.removeAttribute('disabled');
    } else {
      this._submittingButton.classList.add(this._validationData.submittingButtonInvalid);
      this._submittingButton.setAttribute('disabled', true);
    }
  }

}