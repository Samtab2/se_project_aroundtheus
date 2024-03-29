import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  constructor(modalSelector, { submitButtonSelector, formSelector }) {
    super(modalSelector);
    this._button = this._modalElement.querySelector(submitButtonSelector);
    this._callback = null;
    this._form = this._modalElement.querySelector(formSelector);
    this._originalButtonText = this._button.textContent;
  }

  setCallback(callback) {
    this._callback = callback;
  }

  renderingLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Deleting...";
    } else {
      this._button.textContent = this._originalButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._callback) {
        this._callback(e);
      }
    });
  }
  }
}