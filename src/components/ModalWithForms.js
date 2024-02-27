import Modal from "./Modal.js";

export default class ModalWithForms extends Modal {
  constructor(
    modalSelector,
    formSubmit,
    { formSelector, submitButtonSelector }
  ) {
    super(modalSelector);
    this._form = this._modalElement.querySelector(formSelector);
    this._formSubmit = formSubmit;
    this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
    this._originalButtonText = this._button.textContent;
    this._button = this._modalElement.querySelector(submitButtonSelector);
  }

  // METHOD FOR CHANGING THE BUTTON TEXT

  renderingSaving() {
    isSaving
      ? (this._button.textContent = "Saving...")
      : (this._button.textContent = this._originalButtonText);
  }

  // METHODS COLLECTS THE INPUTS VALUES

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // ADDS FUNCTIONALITY TO THE SETEVENTLISTENERS METHOD

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._formSubmit(inputValues, e);
    });
  }
}

console.log(textContent);
