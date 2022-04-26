import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
export {openPopup};

const form = document.querySelector('.form')
const linkAdd = document.querySelector('.form__field_add_link');
const nameAdd = document.querySelector('.form__field_add_name');
const popupAdd = document.querySelector('.popup_form_add');
const nameInput = document.querySelector('.form__field_value_name');
const jobInput = document.querySelector('.form__field_value_job');
const popupEdit = document.querySelector('.popup_type_form-edit');
const buttonFormOpen = document.querySelector('.profile__edit-button');
const nameOutput = document.querySelector('.profile__title');
const jobOutput = document.querySelector('.profile__subtitle');
const formAdd = document.querySelector('.form_type_add');
const buttonFormOpenAdd = document.querySelector('.profile__add-button');
const formEdit = document.querySelector('.form_type_edit');
const elements = document.querySelector('.elements');
const template = document.querySelector('.card-template').content;
const popupPicBox = document.querySelector('.picture');
const popupImg = document.querySelector('.popup__img');
const label = document.querySelector('.popup__label');




//создание карточки
const createCard = (data) => {
    const card = new Card(data, '.card-template');
    card.generateCard();
    return card.generateCard();
}

const insertCard = (item) => {
  elements.prepend(createCard(item));
}

//рендер карточек
const renderCards = (dataList) => {
  dataList.forEach((item) => {
    insertCard(item);
  });
}

renderCards(initialCards);


//запуск валидации
/*
function startValidate(data, formItem) {
  const formData = data;
    const form = formItem;

  const formValidated = new FormValidator(formData, form);
  formValidated.enableValidation();
}

startValidate(formData, formAdd);

startValidate(formData, formEdit);
*/

const formData = {
  inputSelector: '.form__field',
  buttonSelector: '.form__submit-button',
  disabledButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field_type_error',
}

const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
   // вот тут в объект записываем под именем формы
    formValidators[ formElement.name ] = validator;
    validator.enableValidation();
  });
};

const formValidated = new FormValidator(formData, formEdit);
enableValidation(formValidated);






//создание новой карточки, внесение данных
function createNewCard(event) {
  event.preventDefault();
  insertCard({ name: nameAdd.value, link: linkAdd.value });
  closePopup(popupAdd);
  //resetButton();
};

//очищение полей, открытие попапа Add
function openAddCardPopup() {
  linkAdd.value = "";
  nameAdd.value = "";
  openPopup(popupAdd);
};

// вставляем данные из формы в профиль
function fillEditForm() {    
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
};

// вставляем данные из профиля в форму
function fillInputForm() {   
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
};

function resetButton() {
  const formValidator = new FormValidator(formData, formAdd)
  formValidator.toggleButtonStateOff();
}

// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeByEscape);
};

// закрытие попапа
function closePopup(popup) {      
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeByEscape);
};

//закрытие через escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
}

// отправка, закрытие формы Edit
function submitForm(evt) {
  evt.preventDefault();
  fillEditForm();
  closePopup(popupEdit);
};

// LISTENERS _____________________________________________

buttonFormOpenAdd.addEventListener('click', openAddCardPopup);

buttonFormOpen.addEventListener('click', function() {
  openPopup(popupEdit);
  fillInputForm();
});

const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_active')) {
          closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup);
      }
    });
});

formEdit.addEventListener('submit', submitForm);

formAdd.addEventListener('submit', createNewCard);