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
const popupPicClose = document.querySelector('.popup__close-icon_type_img');


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
  initialCards.forEach(stockCards);
};

//исходные карточки
function stockCards(text) {  
  elements.prepend(renderItem(text));
};

//создание новой карточки, внесение данных
function newCard(event) {
  event.preventDefault();
  stockCards({ name: nameAdd.value, link: linkAdd.value });
  closePopupAdd();
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
  popupOpen(popupAdd);
};

// вставляем данные попапа Image
function openPopupPic(data) {
  popupOpen(popupPicBox);
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

// открытие попапа
function popupOpen(popup) {   
  popup.classList.add('popup_active');
};

// открытие попапа Edit
function openPopupEdit() {   
  popupEdit.classList.add('popup_active');
  fillInputForm()
};

// закрытие попапа
function closePopup(popup) {      
  popup.classList.remove('popup_active');
};

// закрытие попапа Add
function closePopupAdd() {
  closePopup(popupAdd);
};

// закрытие попапа Edit
function closePopupEdit() {
  closePopup(popupEdit);
};

// закрытие попапа Image
function closePopupPic() {      
  popupPicBox.classList.remove('popup_active');
};

// отправка, закрытие формы Edit
function submitForm(evt) {
  evt.preventDefault();
  fillEditForm();
  closePopupEdit();
};

// LISTENERS _____________________________________________

formAdd.addEventListener('submit', newCard);
buttonFormOpen.addEventListener('click', openPopupEdit);
buttonFormOpenAdd.addEventListener('click', createCard);
buttonEditClose.addEventListener('click', closePopupEdit);
buttonAddClose.addEventListener('click', closePopupAdd);
popupPicClose.addEventListener('click', closePopupPic);
formEdit.addEventListener('submit', submitForm);