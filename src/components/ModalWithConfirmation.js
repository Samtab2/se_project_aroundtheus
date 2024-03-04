import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  constructor(modalSelector, { submitButtonSelector }) {
    super(modalSelector);
    this._button = this._modalElement.querySelector(submitButtonSelector);
    this._callback = null;
  }

  renderingSaving(isSaving) {
    isSaving
    ? (this._button.textContent = "Saving...")
    : (this._button.textContent = this._originalButtonText);
  }

  setCallback(callback) {
    this._callback = callback;
  }


  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formSubmit(inputValues, e);
      if (this._callback) {
        this._callback(inputValues, e);
      }
      this.renderingSaving(false);
    });
  }
}
}