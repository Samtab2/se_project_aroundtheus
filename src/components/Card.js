export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._id = data._id;
    this.isLiked = data.isLiked;
  }

  // METHOD FOR CARD ELEMENT OUT OF THE TEMPLATE
  getId() {
    return this._id;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this); 
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  // METHODS FOR CARD ELEMENT IN THE TEMPLATE
  toggleLikeCard(isLiked) {
    this.isLiked = isLiked;
    this.renderLikeCard();
  }

  renderLikeCard() {
    this.isLiked
      ? this._likeButton.classList.add("cards__like-button_active")
      : this._likeButton.classList.remove("cards__like-button_active");
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCard() {
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
    this.renderLikeCard();

    return this._cardElement;
  }
}
