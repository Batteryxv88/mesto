// TEMPLATE CONST ___________________________________________

const template = document.querySelector('.card-template').content;


// POPUP CONST ________________________________

const popup = document.querySelector('.popup');


// POPUP ADD CONST __________________________________________________________

const buttonAddClose = document.querySelector('.popup__close-icon_form_add');
const nameAdd = document.querySelector('.form__field_add_name');
const linkAdd = document.querySelector('.form__field_add_link');
const popupAdd = document.querySelector('.popup_form_add');
const buttonFormOpenAdd = document.querySelector('.profile__add-button');
const formAdd = document.querySelector('.form_type_add');
const elements = document.querySelector('.elements');
const newCardCreate = document.querySelector('.form__submit-button_add');
const title = document.querySelector('.element__title');
const cardImage = document.querySelector('.element__image');


// POPUP EDIT CONST ___________________________________________________________

const buttonEditClose = document.querySelector('.popup__close-icon_form_edit');
const buttonFormOpen = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_form-edit');
const formEdit = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.form__field_value_name');
const jobInput = document.querySelector('.form__field_value_job');
const nameOutput = document.querySelector('.profile__title');
const jobOutput = document.querySelector('.profile__subtitle');


// POPUP IMG  CONST ______________________________________________

const popupPicBox = document.querySelector('.picture');
const popupImg = document.querySelector('.popup__img');
const label = document.querySelector('.popup__label');
const popupPicClose = document.querySelector('.popup__close-img');


// TEMPLATE ___________________________________________________

//присвоение данных для карточки
function renderItem(item) {
  const box = template.cloneNode(true);
  box.querySelector('.element__title').textContent = item.name;
  box.querySelector('.element__image').src = item.link;
  box.querySelector('.element__image').alt = item.name;
  addListeners(box, item);
  return box;
};

function render() {
  initialCards.forEach(renderStockCards);
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
};

render();

// OPEN LIKE DELITE __________________________________________________________

function addListeners(el, data) {
  el.querySelector('.element__trash').addEventListener('click', handleDelete);
  el.querySelector('.element__like').addEventListener('click', elementLike);
  el.querySelector('.element__image').addEventListener('click', function () {
  openPopupPic(data)
  });
};

// лайк карточки
function elementLike(event) {
  event.target.closest('.element__like').classList.toggle('element__like_active');
};

// удаление карточки
function handleDelete(event) {
  event.target.closest('.element').remove();
};

// POPUPS __________________________________

// попап новой карточки
function createCard() {
  linkAdd.value = "";
  nameAdd.value = "";
  openPopup(popupAdd);
};

// вставляем данные попапа Image
function openPopupPic(data) {
  openPopup(popupPicBox);
  popupImg.src = data.link;
  label.textContent = data.name;
  popupImg.alt = data.name;
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

// отправка, закрытие формы Edit
function submitForm(evt) {
  evt.preventDefault();
  fillEditForm();
  closePopup(popupEdit);
};

// LISTENERS _____________________________________________

formAdd.addEventListener('submit', function() {
  createNewCard(event);
  resetButton();
});

buttonFormOpen.addEventListener('click', function() {
  openPopup(popupEdit);
  fillInputForm();
});

buttonFormOpenAdd.addEventListener('click', createCard);

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

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
}