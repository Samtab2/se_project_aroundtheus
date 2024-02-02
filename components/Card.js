export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".cards__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteIcon();
      });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".list")
      .cloneNode(true);

    this._cardImageEl = this._cardElement.querySelector(".cards__image");
    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._trashButton = this._cardElement.querySelector(".cards__trash-button");
    this._cardTitleEl = this._cardElement.querySelector(".cards__title");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    this._setEventListeners();
    
    return this._cardElement;
  }
}
