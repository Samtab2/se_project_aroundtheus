import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForms from "../components/ModalWithForms.js";

import {
  initialCards,
  config,
  profileEditButton,
  profileAddButton,
  profileTitleInput,
  formList,
  formValidators,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import { validate } from "webpack";

// CREATE NEW USER INFO
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// FORM VALIDATOR CREATOR AND ENABLING

formList.forEach((form) => {
  const Validator = new FormValidator(config, form);
  const formName = form.getAttribute("name");
  validator.enableValidation();
  formValidators[formName] = Validator;
});


function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCard();
}

// CREATE CARDS CONTAINER

const cardsContainer = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

// CALL RENDER FUNCTION
cardsContainer.renderItems();

// CREATE PROFILE EDIT MODAL
const profileEditModal = new ModalWithForms(
  "#profile-edit-modal",
  handleProfileFormSubmit,
  config
);

// CREATE ADD IMAGE 
const addImageModal = new ModalWithForms(
  "#add-image-modal",
  handleAddImageFormSubmit,
  config
);

// PREVIEW IMAGE 
function handleImageClick(name, link) {
  previewImage.open({ name, link });
}

const previewImage = new ModalWithImage(".preview__image-modal");

// FUNCTION PROFILE EDIT SUBMIT
 function handleProfileFormSubmit(values) {
   userInfo.setUserInfo(values);
   profileEditModal.close();
 }

 // FUNCTION ADD IMAGE SUBMIT
 function handleAddImageFormSubmit(values) {
   const newCard = createCard(values);
   cardsContainer.addItem(newCard);
   formValidators.addCardForm.resetForm();
   formValidators.addCardForm.disableSubmit();
   addImageModal.close();
 }

// PROFILE EDIT MODAL FILL INPUTS FUNCTIONS

function fillProfileInputs() {
  const userCurrentInfo = userInfo.getUserInfo();
  profileTitleList[0].value = userCurrentInfo.name;
  profileTitleList[1].value = userCurrentInfo.description;
}

// ADD A CLICK EVENT LISTENER TO THE PROFILE EDIT BUTTON
profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  formValidators.profileForm.checkValidaity();
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
previewImage.setEventListeners();