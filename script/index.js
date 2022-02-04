let popup = document.querySelector('.popup');
let formOpenButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let nameInput = document.querySelector('.form__field_value_name');
let jobInput = document.querySelector('.form__field_value_job');
let nameOutput = document.querySelector('.profile__title');
let jobOutput = document.querySelector('.profile__subtitle');
let form = document.querySelector('.form');

function fillEditForm() {    // Вставляем данные из формы в профиль
  nameOutput.textContent = nameInput.value
  jobOutput.textContent = jobInput.value
};

function fillInputForm() {   // Вставляем данные из профиля в форму
  nameInput.value = nameOutput.textContent
  jobInput.value = jobOutput.textContent
};

function openPopup() {   // Открытие попапа
  popup.classList.add('popup_active')
  fillInputForm()
};

function submitForm(evt) {  // Отправка, закрытие формы
  evt.preventDefault();
  fillEditForm();
  closePopup();
};

formOpenButton.addEventListener('click', openPopup);


function closePopup() {      // Закрытие попапа
  popup.classList.remove('popup_active')
};

closeButton.addEventListener('click', closePopup);

form.addEventListener('submit', submitForm);






