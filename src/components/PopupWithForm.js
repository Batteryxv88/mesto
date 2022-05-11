import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._selector.querySelectorAll('.form__field');
    this._formAdd = document.querySelector('.form_type_add');
    this._input1 = this._inputs[0];
    this._input2 = this._inputs[1];
    this._nameInput = document.querySelector('.form__field_value_name');
    this._jobInput = document.querySelector('.form__field_value_job');
  }

  _getInputValues() {
    return {
      name: this._input1.value,
      link: this._input2.value
    };
  }

  setInputValues({name, job}) {
    this._nameInput.value = name;
    this._jobInput.value = job;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._formAdd.reset();
    })
  }
}