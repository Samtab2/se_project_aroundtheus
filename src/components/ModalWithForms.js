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
    this._inputList = Array.from(this._form ? this._form.querySelectorAll(".modal__input"): []);
    this._button = this._modalElement.querySelector(submitButtonSelector);
    this._originalButtonText = this._button.textContent;
  }

  // METHOD FOR CHANGING THE BUTTON TEXT

  renderingSaving(isSaving) {
    if (isSaving) {
      this._button.textContent = "Saving...";
    } else {
      this._button.textContent = this._originalButtonText;
    }
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

  setFormValue(name, value) {
    const input = this._form.querySelector(`[name="${name}"]`);
    if (input) {
      input.value = value;
    }
  }

  // ADDS FUNCTIONALITY TO THE SETEVENTLISTENERS METHOD

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._formSubmit(inputValues, e);
    });
  }
}
}


