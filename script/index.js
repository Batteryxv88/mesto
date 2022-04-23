import { FormValidator } from "./FormValidator.js";
import { renderElements } from "./Card.js";
export {initialCards};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 



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

//временный массив
const midtermArr = [
];

//помещаем инпуты во временный массив
function prepareNewCard(data) {
  const link = linkAdd.value;
  const name = nameAdd.value;
  data.push({name: name, link: link})
}

//рендер новой карточки, очищение временного массива
function renderNewCard(event) {
event.preventDefault();
prepareNewCard(midtermArr);
renderElements(midtermArr);
closePopup(popupAdd);
resetButton();
midtermArr.length = 0;
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

// функция сброса кнопки submit add
function resetButton() {
  const buttonSubmit = document.querySelector('.form__submit-button_add');
  buttonSubmit.setAttribute('disabled', '');
  buttonSubmit.classList.add('form__submit-button_disabled');
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

formAdd.addEventListener('submit', renderNewCard);