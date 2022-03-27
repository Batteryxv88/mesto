function formSubmit(evt) {
  evt.preventDefault();
}

const checkInputValidity = ({inputErrorClass}, form, input) => {
  const errorMessage =  form.querySelector(`#error-${input.id}`);
  if(input.validity.valid) {
    errorMessage.textContent = '';
    input.classList.remove(inputErrorClass);
  } else {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  }
}

const checkButtonValidity =({disabledButtonClass}, form, button) => {
  if (form.checkValidity()) {
    button.removeAttribute('disabled');
    button.classList.remove(disabledButtonClass);        
  } else {
    button.setAttribute('disabled', '');
    button.classList.add(disabledButtonClass);
  }
}


function enableValidation({formSelector, inputSelector, buttonSelector, ...rest}) {
  const form = document.querySelector(formSelector);

  form.addEventListener('submit', formSubmit);
    
  const inputs = form.querySelectorAll(inputSelector);
  const button = form.querySelector(buttonSelector);

  checkButtonValidity(rest, form, button);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(rest, form, input);
      checkButtonValidity(rest, form, button);
    });
  });
}

enableValidation({
formSelector: '.form',
inputSelector: '.form__field',
buttonSelector: '.form__submit-button',
disabledButtonClass: 'form__submit-button_disabled',
inputErrorClass: 'form__field_type_error',
});

enableValidation({
  formSelector: '.form_type_add',
  inputSelector: '.form__field',
  buttonSelector: '.form__submit-button_add',
  disabledButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field_type_error',
  });