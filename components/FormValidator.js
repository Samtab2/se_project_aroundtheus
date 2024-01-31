export default class FormValidator {
    constructor(formElement, config,) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
    }


_showInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
}

_hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.remove(errorClass);
}

_checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
        return this._showInputError(formElement, inputElement, options);
    }
    this._hideInputError(formElement, inputElement, options);
}


  _toggleButtonState() {
    let foundInvalid = false;
    this._inputList.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        foundInvalid = true;
      }
    });
    if (foundInvalid) {
        submitButton.classList.add(inactiveButtonClass);
        return (submitButton.disabled = true);
    }
    this._submitButton.classList.remove(inactiveButtonClass);
    this._submitButton.disabled = false;
  }
  

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputElement,config);
        this._toggleButtonState();

    });
  });
}
}


  



  

   

  
  























