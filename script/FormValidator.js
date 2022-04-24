export {FormValidator};


class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._buttonSelector = data.buttonSelector;
    this._disabledButtonClass = data.disabledButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._formSelector = formSelector;
  }

  _checkInputValidity(input) {
    const errorMessage =  this._formSelector.querySelector(`#error-${input.id}`);

    if(input.validity.valid) {
      errorMessage.textContent = '';
      input.classList.remove(this._inputErrorClass);
    } else {
      errorMessage.textContent = input.validationMessage;
      input.classList.add(this._inputErrorClass);
    }
  }
  
  _checkButtonValidity = () => {
    if (this._formSelector.checkValidity()) {
      this.toggleButtonStateActive();    
    } else {
      this.toggleButtonStateOff();
    }
  }
  
  toggleButtonStateActive = () => {
    const buttonSubmit = this._formSelector.querySelector(this._buttonSelector);
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.classList.remove('form__submit-button_disabled');
  }

  toggleButtonStateOff = () => {
    const buttonSubmit = this._formSelector.querySelector(this._buttonSelector);
    buttonSubmit.setAttribute('disabled', '');
    buttonSubmit.classList.add('form__submit-button_disabled');
  }

  enableValidation() {
    const form = this._formSelector;
      
    const inputs = form.querySelectorAll(this._inputSelector);
    const button = form.querySelector(this._buttonSelector);
  
    this._checkButtonValidity();
  
    inputs.forEach(input => {
      input.addEventListener('input', (event) => {
        this._checkInputValidity(event.target);
        this._checkButtonValidity();
      });
    });
  }
}