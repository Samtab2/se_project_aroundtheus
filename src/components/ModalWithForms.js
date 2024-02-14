import Modal from "./Modal.js";

export default class ModalWithForms extends Modal {
    constructor({ modalSelector }) {
        super({ modalSelector });
        this._form = this._modalElement.querySelector(".modal__form");
        this._formSubmit = formSubmit;
        this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
    }

   // METHODS COLLECTS THE INPUTS VALUES

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    // ADDS FUNCTIONALITY TO THE SETEVENTLISTENERS METHOD
     
    setEventListeners() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputValues = this._getInputValues();
            this._formSubmit(inputValues);
        });
        super.setEventListeners();
    }
}