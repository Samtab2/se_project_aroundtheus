import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForms from "../components/ModalWithForms.js";
import Api from '../components/Api.js';

import {
  config,
  profileEditButton,
  profileAddButton,
  profileInputList,
  formList,
  formValidators,
  options,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

// CREATE NEW USER INFO
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const api = new Api(options);

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
api.getInitialCards().then((res) => {
  
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
  const card = new Card(cardData, "#card-template", handleImageClick, handleDeleteClick, handleLikeClick);
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

// CREATE A MODALWITHFORM FOR DELETE CONFIRMATION
const deleteConfirmationModal = new ModalWithForms(
  "#delete-confirmation-modal",
  config
);

// FUNCTION PROFILE EDIT SUBMIT
function handleProfileFormSubmit(values) {
  profileEditModal.renderSaving(true);
  api
    .editProfile(values)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
      });
      profileEditModal.close();
    })
    .catch(console.error)
    .finally(() => {
      profileEditModal.renderSaving(false);
    })



  userInfo.setUserInfo(values);
  profileEditModal.close();
}

// FUNCTION ADD IMAGE SUBMIT
function handleAddImageFormSubmit(inputValues) {
  addImageModal.renderSaving(true);
  api
    .addCard(inputValues)
    .then((res) => {
      const cardElement = createCard(res);
      cardsContainer.addItem(cardElement);
      addImageModal.close();
      formValidators.disableSubmitButton();
      formValidators.resetForm();
    })
    .catch(console.error)
    .finally(() => {
      addImageModal.renderSaving(false);
    })
}

// DELETE CARD FUNCTION
function handleDeleteClick(card) {
  deleteConfirmationModal.open();
  deleteConfirmationModal.setCallback(() => {
    deleteConfirmationModal.renderSaving(true);
    api
    .deleteCard(card.getId())
    .then(() => {
      card.deleteCard();
      deleteConfirmationModal.close();
    })
    .catch(console.error)
    .finally(() => {
      deleteConfirmationModal.renderSaving(false);
    })
  })
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
  avatarEditModal.renderSaving(true);
  api
   .changeAvatar(Values)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      avatarEditModal.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarEditModal.renderSaving(false);
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








