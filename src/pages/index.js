import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForms from "../components/ModalWithForms.js";
import Api from "../components/Api.js";

import {
  config,
  profileEditButton,
  profileAddButton,
  profileInputList,
  formList,
  formValidators
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

// CREATE NEW USER INFO
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    "Content-Type": "application/json",
    authorization: "084a20b4-0f85-402b-8b18-0788371f1b7e"
  }
})

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      description: res.about,
    });
    userInfo.setUserAvatar(res.avatar);
  })
  .catch(console.error);

let cardsContainer;

// FORM VALIDATOR CREATOR AND ENABLING

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  const formName = form.getAttribute("name");
  validator.enableValidation();
  formValidators[formName] = validator;
});

// PREVIEW IMAGE
function handleImageClick(name, link) {
  previewModal.open({ name, link });
}

const previewModal = new ModalWithImage("#preview__image-modal");

// CREATE CARDS CONTAINER
api
  .getInitialCards()
  .then((res) => {
    const cardsContainer = new Section(
      { items: res, renderer: createCard },
      ".cards__list"
    );

    // CALL RENDER FUNCTION
    cardsContainer.renderItems();
  })

  .catch(console.error);

// CREATE CARD
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.getCard();
}

// CREATE PROFILE EDIT MODAL
const profileEditModal = new ModalWithForms(
  "#profile-edit-modal",
  handleProfileFormSubmit,
  config
);

// CREATE ADD IMAGE
const addImageModal = new ModalWithForms(
  "#add-card-modal",
  handleAddImageFormSubmit,
  config
);

// CREATE A MODALWITHFORM FOR CHANGE PICTURE
const avatarEditModal = new ModalWithForms(
  "#modal-change-picture",
  handleAvatarFormSubmit,
  config
);

const avatarEditButton = document.querySelector("#avatar-edit-button");

// CREATE A MODALWITHFORM FOR DELETE CONFIRMATION
const deleteConfirmationModal = new ModalWithForms(
  "#delete-confirmation-modal",
  handleDeleteClick,
  config
);

// FUNCTION PROFILE EDIT SUBMIT
function handleProfileFormSubmit(data) {
  profileEditModal.renderingSaving(true);
  api
    .editUserInfo({
      name: data.name,
      description: data.description,
    })
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.description,
      });
      profileEditModal.close();
    })
    .catch(console.error)
    .finally(() => {
      profileEditModal.renderingSaving(false);
    });

  userInfo.setUserInfo(data);
  profileEditModal.close();
}

// FUNCTION ADD IMAGE SUBMIT
function handleAddImageFormSubmit(data) {
  addImageModal.renderingSaving(true);
  api
    .addCard(data)
    .then((res) => {
      const cardElement = createCard(res);
      cardsContainer.addItem(cardElement);
      addImageModal.close();
      formValidators.disableSubmitButton();
      formValidators.resetForm();
    })
    .catch(console.error)
    .finally(() => {
      addImageModal.renderingSaving(false);
    });
}

// DELETE CARD FUNCTION
function handleDeleteClick(card) {
  deleteConfirmationModal.open();
  deleteConfirmationModal.setCallback(() => {
    deleteConfirmationModal.renderingSaving(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        deleteConfirmationModal.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteConfirmationModal.renderingSaving(false);
      });
  });
}

// LIKE CLICK FUNCTION
function handleLikeClick(card) {
  api
    .likeCard(card.getId(), card.isLiked)
    .then((res) => card.toggleLikeCard(res.isLiked))
    .catch(console.error);
}

// AVATAR EDIT SUBMIT
function handleAvatarFormSubmit(Values) {
  avatarEditModal.renderingSaving(true);
  api
    .changeAvatar(Values)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      avatarEditModal.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarEditModal.renderingSaving(false);
    });
}

// ADD A CLICK EVENT LISTENER TO THE PROFILE EDIT BUTTON
profileEditButton.addEventListener("click", () => {
  const userCurrentInfo = userInfo.getUserInfo();
  profileInputList[0].value = userCurrentInfo.name;
  profileInputList[1].value = userCurrentInfo.description;
  profileEditModal.open();
});

// ADD A CLICK EVENT LISTENER TO THE PROFILE ADD BUTTON
profileAddButton.addEventListener("click", () => {
  addImageModal.open();
});

// ADD A CLICK EVENT LISTENER TO THE EDIT PROFILE MODAL
profileEditModal.setEventListeners();

// ADD A CLICK EVENT LISTENER TO THE ADD IMAGE MODAL
addImageModal.setEventListeners();

// ADD EVENT LISTENERS TO TEHE PREVIEW IMAGE MODAL
previewModal.setEventListeners();

// ADD EVENT LISTENERS TO THE AVATAR EDIT MODAL
avatarEditModal.setEventListeners();

// ADD EVENT LISTENERS TO THE DELETE CONFIRMATION MODAL
deleteConfirmationModal.setEventListeners();

// ADD EVENT LISTENERS TO THE AVATAR EDIT BUTTON
avatarEditButton.addEventListener("click", () => {
  avatarEditModal.open();
});
