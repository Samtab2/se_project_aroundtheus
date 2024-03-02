import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  constructor(modalSelector, { submitButtonSelector }) {
    super(modalSelector);
    this._button = this._modalElement.querySelector(submitButtonSelector);
    this._originalButtonText = this._button.textContent;
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
    this._button.addEventListener("click", () => {
      this._callback();
    });

    super.setEventListeners();
  }
}
