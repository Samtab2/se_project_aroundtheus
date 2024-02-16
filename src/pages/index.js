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
  profileInputList,
  formList,
  formValidators,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";


// CREATE NEW USER INFO
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// FORM VALIDATOR CREATOR AND ENABLING

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  const formName = form.getAttribute("name");
  validator.enableValidation();
  formValidators[formName] = validator;
});


// PREVIEW IMAGE 
function handleImageClick(name, link) {
  console.log(name, link);
  previewModal.open({ name, link });
}

const previewModal = new ModalWithImage("#preview__image-modal");


// CREATE CARDS CONTAINER

const cardsContainer = new Section(
  {
    items: initialCards,
    renderer: function (cardData) {
      const cardElement = createCard(cardData);
      cardsContainer.addItem(cardElement);
    },
  },
  ".cards__list"
);

// CALL RENDER FUNCTION
cardsContainer.renderItems();

// CREATE CARD
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
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



// FUNCTION PROFILE EDIT SUBMIT
 function handleProfileFormSubmit(values) {
   userInfo.setUserInfo(values);
   profileEditModal.close();
 }

 // FUNCTION ADD IMAGE SUBMIT
 const addCardFormValidator = formValidators["add-card-form"];
 function handleAddImageFormSubmit(values) {
   const cardElement = createCard(values); 
    cardsContainer.addItem(cardElement);
   if (addCardFormValidator) {
     addCardFormValidator.resetForm();
   }
   addImageModal.close();
 }

// PROFILE EDIT MODAL FILL INPUTS FUNCTIONS

function fillProfileInputs() {
  const userCurrentInfo = userInfo.getUserInfo();
  profileInputList[0].value = userCurrentInfo.name;
  profileInputList[1].value = userCurrentInfo.description;
}

// ADD A CLICK EVENT LISTENER TO THE PROFILE EDIT BUTTON
const profileFormValidator = formValidators["profile-form"];
profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  if (profileFormValidator) {
    profileFormValidator.checkValidaity();
  }
  profileEditModal.open();
})

// ADD A CLICK EVENT LISTENER TO THE PROFILE ADD BUTTON
profileAddButton.addEventListener("click", () => {
  addImageModal.open();
});

// ADD A CLICK EVENT LISTENER TO THE EDIT PROFILE MODAL
profileEditModal.setEventListeners();

// ADD A CLICK EVENT LISTENER TO THE ADD IMAGE MODAL
addImageModal.setEventListeners();

// ADD EVENT LISTENERS TO THE PREVIEW IMAGE MODAL
previewModal.setEventListeners();


