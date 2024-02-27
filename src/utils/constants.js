export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// CONFIG SETTINGS

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error_visible",
};


// CREATE PROFILE BUTTONS ELEMENTS

const profile = document.querySelector(".profile");
export const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileAddButton = profile.querySelector(".profile__add-button");

// ALL PROFILE EDITS INPUTS
const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileInputList = Array.from(
  profileEditModal.querySelectorAll(".modal__input")
);

// ALL FORM ELEMENTS

export const formList = Array.from(
  document.querySelectorAll(config.formSelector)
);

// EMPTY THE FORMS

export const formValidators = {};


export const options = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "739decfe-71be-4d0d-8961-a71a0f6cba52",
    "Content-Type": "application/json",
  },
};


