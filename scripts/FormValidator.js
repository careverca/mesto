export class FormValidator {
  constructor (validationData, validationObject) {
    this.validationData = validationData;
    this.validationObject = validationObject;
    this.submittingButton = this.validationObject.querySelector(this.validationData.submittingButtonSelector);
    this.inputList = Array.from(this.validationObject.querySelectorAll(this.validationData.inputSelector));
  }

  enableValidation() {
    this._setEventListener(this.validationObject);
  }
  
  validateOnOpen() {
    // If no input is made, show no error
    if (this.inputList[0].value === '' && this.inputList[1].value === '') { 
      this._toggleSubmitState(false)
      return; 
    };
    this._checkIfAllInputIsValid(this.inputList, this.submittingButton);
    this.inputList.forEach((inputElement) => {
        this._checkInputValidity(this.validationObject, inputElement);
    })
  }

  _setEventListener(validationObject) {
    // Querying every .form__input
    const inputList = Array.from(validationObject.querySelectorAll(this.validationData.inputSelector));
    const submittingButton = validationObject.querySelector(this.validationData.submittingButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // Handling Error message (span) & Red underline warning
        this._checkInputValidity(validationObject, inputElement);
        // Handling Submit Button state:
        this._checkIfAllInputIsValid(inputList, submittingButton);
      });
    });
  }

  _checkInputValidity(validationObject, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(validationObject, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(validationObject, inputElement);
    }
  }

  _checkIfAllInputIsValid(inputList, submittingButton) {
    // Return FALSE if at least 1 inputElement is NOT valid
    const valid = !inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    if (valid) {
      this._toggleSubmitState(true);
    } else {
      this._toggleSubmitState(false);
    }
  }

  _showInputError(validationObject, inputElement, errorMessage) {
    const errorElement = validationObject.querySelector(
      '#' + inputElement.name + '-error'
    );
    inputElement.classList.add(this.validationData.inputInvalid);
    errorElement.classList.add(this.validationData.errorVisible);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(validationObject, inputElement) {
    const errorElement = validationObject.querySelector(
      '#' + inputElement.name + '-error'
    );
    inputElement.classList.remove(this.validationData.inputInvalid);
    errorElement.classList.remove(this.validationData.errorVisible);
    errorElement.textContent = '';
  }

  _toggleSubmitState(state) {
    if (state) {
      this.submittingButton.classList.remove(this.validationData.submittingButtonInvalid);
      this.submittingButton.removeAttribute('disabled');
    } else {
      this.submittingButton.classList.add(this.validationData.submittingButtonInvalid);
      this.submittingButton.setAttribute('disabled', true);
    }
  }

}