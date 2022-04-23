export {FormValidator};

const formAdd = document.querySelector('.form_type_add');
const formEdit = document.querySelector('.form_type_edit');

class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._buttonSelector = data.buttonSelector;
    this._disabledButtonClass = data.disabledButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._formSelector = formSelector;
  }

  _formSubmit(evt) {
    evt.preventDefault();
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
  
  _checkButtonValidity() {
    const button = this._formSelector.querySelector(this._buttonSelector);
    if (this._formSelector.checkValidity()) {
      button.removeAttribute('disabled');
      button.classList.remove(this._disabledButtonClass);        
    } else {
      button.setAttribute('disabled', '');
      button.classList.add(this._disabledButtonClass);
    }
  }
  
  enableValidation() {
    const form = this._formSelector;
  
    form.addEventListener('submit', this._formSubmit);
    
    console.log(form.target);
      
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

//запуск валидации
function startValidate(formItem) {
  const data = {
    inputSelector: '.form__field',
    buttonSelector: '.form__submit-button',
    disabledButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error',
    }
    const form = formItem;

  const formValidated = new FormValidator(data, form);
  formValidated.enableValidation();
}

startValidate(formAdd);

startValidate(formEdit);