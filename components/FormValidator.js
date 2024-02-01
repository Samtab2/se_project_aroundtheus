export default class FormValidator {
    constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = form;
    this._inputEls = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    }



_showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
}

_hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);

}

_checkInputValidity = (inputEl) => {
  if (!inputEl.validity.valid) {
    this._showInputError(inputEl);
  } else {
    this._hideInputError(inputEl);
  }
}


  _toggleButtonState() {
    if (!this._hasInvalidInput(inputEl)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
       this._submitButton.disabled = true;
  } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
};

  _hasInvalidInput() {
    return this._inputEls.every((inputEl) => {
      return inputEl.validity.valid;
    });
  
  };


  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(inputList);
      });
    });
  

  enableValidation() 
     this._formElement.addEventListener("submit", (e) => {
       e.preventDefault();
     });
     this._setEventListeners();
  }

  enableValidation() {
    this._setEventListeners();
  }

  disableSubmit() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", true);
  }

  formRest() {
    this._formElement.reset();
  }


  

   

  
  






















}
