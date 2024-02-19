
export default class Modal {
  constructor(modalSelector) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleModalEscape = this._handleModalEscape.bind(this);
  }

  // METHODS ITEMS RENDER
  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleModalEscape);
  }

  // METHODS ITEM ADD

  close = () => {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleModalEscape);
  };

  // METHODS CLOSES MODAL WITH PRESS OF ESCAPE

  _handleModalEscape = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  // METHODS CLICK EVENT LISTENER TO CLOSE ICON

  setEventListeners() {
    this._closeButton = this._modalElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", this.close);
    this._modalElement.addEventListener("mousedown", (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
  }
}