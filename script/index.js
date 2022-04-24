import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
export {initialCards, openPopup};


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

const formData = {
  inputSelector: '.form__field',
  buttonSelector: '.form__submit-button',
  disabledButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field_type_error',
  }


//рендер карточек
const renderElements = (data) => {
  data.forEach((item) => {
    const card = new Card(item, '.card-template');

    const cardElement = card.generateCard();
    elements.prepend(cardElement);
  }); 
}

//запуск валидации
function startValidate(data, formItem) {
  const formData = data;
    const form = formItem;

  const formValidated = new FormValidator(data, form);
  formValidated.enableValidation();
}

startValidate(formData, formAdd);

startValidate(formData, formEdit);

//присвоение данных для карточки
function renderItem(item) {
  const box = template.cloneNode(true);
  box.querySelector('.element__title').textContent = item.name;
  box.querySelector('.element__image').src = item.link;
  box.querySelector('.element__image').alt = item.name;
  addListeners(box, item);
  return box;
};

//вешаем слушатели на карточку
function addListeners(el, data) {
  el.querySelector('.element__trash').addEventListener('click', handleDelete);
  el.querySelector('.element__like').addEventListener('click', elementLike);
  el.querySelector('.element__image').addEventListener('click', function () {
  openPopupPic(data)
  });
};

// вставляем данные попапа Image
function openPopupPic(data) {
  openPopup(popupPicBox);
  popupImg.src = data.link;
  label.textContent = data.name;
  popupImg.alt = data.name;
};

// лайк карточки
function elementLike(event) {
  event.target.closest('.element__like').classList.toggle('element__like_active');
};

// удаление карточки
function handleDelete(event) {
  event.target.closest('.element').remove();
};

//исходные карточки
function renderStockCards(text) {  
  elements.prepend(renderItem(text));
};

//создание новой карточки, внесение данных
function createNewCard(event) {
  event.preventDefault();
  renderStockCards({ name: nameAdd.value, link: linkAdd.value });
  closePopup(popupAdd);
  resetButton();
};

//временный массив
const midtermArr = [
];

//помещаем инпуты во временный массив
function prepareNewCard(data) {
  const link = linkAdd.value;
  const name = nameAdd.value;
  data.push({name: name, link: link})
}

//рендер стоковых карточек
renderElements(initialCards);

//очищение полей, открытие попапа Add
function createCard() {
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

buttonFormOpenAdd.addEventListener('click', createCard);

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