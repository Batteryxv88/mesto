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

const template = document.querySelector('.template').content;
const elements = document.querySelector('.elements');
const inputAppellation = document.querySelector('.form__field_value_appellation');
const inputLink = document.querySelector('.form__field_value_link');
const formAdd = document.querySelector('.form_type_add');
const title = document.querySelector('.element__title');

//document.querySelector('.elements')
//.addEventListener('click', event => {
 // if (event.target.className === 'element__like') {
  //  event.target.classList.toggle('element__like_active');
 /// }
//});



function render() {
  initialCards.forEach(renderItem);
  
}

function renderItem(item) {
  const box = template.cloneNode(true);
  box.querySelector('.element__title').textContent = item.name;
  box.querySelector('.element__image').src = item.link;
  box.querySelector('.element__image').alt = item.name;

  
  addListeners(box)
  elements.appendChild(box)
};

function addListeners(el, data) {
  el.querySelector('.element__trash').addEventListener('click', handleDelete)
  el.querySelector('.element__like').addEventListener('click', elementLike);
};

/*
function openPopupPic() {   // Открытие попапа Add
  popupPicBox.classList.add('popup-pic_active')
};
*/
function elementLike(event) {
  event.target.closest('.element__like').classList.toggle('element__like_active');
}

function handleDelete(event) {
  event.target.closest('.element').remove();
};



function fillAddForm() {    // Вставляем данные из формы в профиль
  const box = template.cloneNode(true);
  
};

render();

const popupPicBox = document.querySelector('.popup-pic');
const popupImg = document.querySelector('.popup-pic__img');
const cardImage = document.querySelector('.element__image');
const allCards = document.querySelector('.elements');

allCards.addEventListener('click', event => {            // Открытие картинки попапа
  if (event.target.className === 'element__image') {
    popupPicBox.classList.add('popup-pic_active');
    popupImg.src = event.link;
  }
});


let popupEdit = document.querySelector('.popup_form_edit');
let popupAdd = document.querySelector('.popup_form_add')
let formOpenButton = document.querySelector('.profile__edit-button');
let formOpenButtonAdd = document.querySelector('.profile__add-button');
let closeButtonEdit = document.querySelector('.popup__close-icon_form_edit');
let closeButtonAdd = document.querySelector('.popup__close-icon_form_add');
let nameInput = document.querySelector('.form__field_value_name');
let jobInput = document.querySelector('.form__field_value_job');
let appellationInput = document.querySelector('.form__field_value_appellation');
let linkInput = document.querySelector('.form__field_value_link');
let titleOutput = document.querySelector('.element__title');
let linkOutput = document.querySelector('.element__image');
let nameOutput = document.querySelector('.profile__title');
let jobOutput = document.querySelector('.profile__subtitle');
let formEdit = document.querySelector('.form_type_edit');



function fillEditForm() {    // Вставляем данные из формы в профиль
  nameOutput.textContent = nameInput.value
  jobOutput.textContent = jobInput.value
};

function fillInputForm() {   // Вставляем данные из профиля в форму
  nameInput.value = nameOutput.textContent
  jobInput.value = jobOutput.textContent
};

function openPopupEdit() {   // Открытие попапа Edit
  popupEdit.classList.add('popup_active')
  fillInputForm()
};

function openPopupAdd() {   // Открытие попапа Add
  popupAdd.classList.add('popup_active')
};

function closePopupEdit() {      // Закрытие попапа Edit
  popupEdit.classList.remove('popup_active')
};

function closePopupAdd() {      // Закрытие попапа Add
  popupAdd.classList.remove('popup_active')
};

function submitForm(evt) {  // Отправка, закрытие формы Edit
  evt.preventDefault();
  fillEditForm();
  closePopupEdit();
};

formOpenButton.addEventListener('click', openPopupEdit);
formOpenButtonAdd.addEventListener('click', openPopupAdd);
closeButtonEdit.addEventListener('click', closePopupEdit);
closeButtonAdd.addEventListener('click', closePopupAdd);

formEdit.addEventListener('submit', submitForm);