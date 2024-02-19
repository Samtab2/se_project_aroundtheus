import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._previewImage = this._modalElement.querySelector(".modal__image");
    this._previewImage = this._modalElement.querySelector(
      ".modal__image-title"
    );
  }

  // ADD FUNCTIONALITY TO OPEN
  open({ name, link }) {
    this._previewImage.setAttribute("src", link);
    this._previewImage.setAttribute("alt", name);
    this._previewTitle.textContent = name;
    super.open();
  }
}
