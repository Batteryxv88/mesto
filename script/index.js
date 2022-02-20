// TEMPLATE CONST ___________________________________________

const template = document.querySelector('.template').content;


// POPUP CONST ________________________________

const popup = document.querySelector('.popup');


// POPUP ADD CONST __________________________________________________________

const closeButtonAdd = document.querySelector('.popup__close-icon_form_add');
const addName = document.querySelector('.form__field_add_name');
const addLink = document.querySelector('.form__field_add_link');
const popupAdd = document.querySelector('.popup_form_add');
const formOpenButtonAdd = document.querySelector('.profile__add-button');
const formAdd = document.querySelector('.form_type_add');
const elements = document.querySelector('.elements');
const createNewCard = document.querySelector('.form__submit-button_add');
const title = document.querySelector('.element__title');
const cardImage = document.querySelector('.element__image');


// POPUP EDIT CONST ___________________________________________________________

const closeButtonEdit = document.querySelector('.popup__close-icon_form_edit');
const formOpenButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_form_edit');
const formEdit = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.form__field_value_name');
const jobInput = document.querySelector('.form__field_value_job');
const nameOutput = document.querySelector('.profile__title');
const jobOutput = document.querySelector('.profile__subtitle');


// POPUP IMG  CONST ______________________________________________

const popupPicBox = document.querySelector('.popupImg');
const popupImg = document.querySelector('.popupImg__img');
const label = document.querySelector('.popupImg__label');
const popupPicClose = document.querySelector('.popupImg__close');


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
  elements.append(renderItem(text));
};

//создание новой карточки, внесение данных
function newCard(event) {
  event.preventDefault();
  stockCards({ name: addName.value, link: addLink.value });
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
  addLink.value = "";
  addName.value = "";
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

// открытие попапа Image
function openPopupImage() {
  popupPicBox.classList.add('popup_active');
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

// закрытие попапа Picture
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

createNewCard.addEventListener('click', newCard);
formOpenButton.addEventListener('click', openPopupEdit);
formOpenButtonAdd.addEventListener('click', createCard);
closeButtonEdit.addEventListener('click', closePopupEdit);
closeButtonAdd.addEventListener('click', closePopupAdd);
popupPicClose.addEventListener('click', closePopupPic);
formEdit.addEventListener('submit', submitForm);