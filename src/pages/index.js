import FormValidator from "../components/FormValidator.js";
import Card  from "../components/Card.js";
import { initialCards } from "../utils/constants.js";
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { nameInput, jobInput, buttonFormOpen, formAdd, 
  buttonFormOpenAdd, formEdit, elements, formData } from "../utils/constants.js";
import './index.css';

const popupImage = new PopupWithImage('.picture');


const renderCard = (item) => {
  const card = new Card({data: item, 
    handleCardClick: () => {
      popupImage.open(item);
    }
  },'.card-template');
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
}

const defaultCardList = new Section({ 
  items: initialCards,
    renderer: (item) => {
      renderCard(item);
    }
  },
  elements
);

const newCardAdd = new PopupWithForm('.popup_form_add',
    (item) => {
      renderCard(item);
      addFormValidator.toggleButtonStateOff();
    }
);

const userInfo = new UserInfo({name: '.profile__title', job:'.profile__subtitle'});

const popupWithFormEdit = new PopupWithForm('.popup_type_form-edit', (data) => {
  userInfo.setUserInfo(data);
});

//функция валидации
function startValidate(data, formItem) {
  const formValidated = new FormValidator(data, formItem);
  formValidated.enableValidation();
  return formValidated;
}

function fillForm({name, job}) {
  nameInput.value = name;
  jobInput.value = job;
}

const editFormValidator = startValidate(formData, formEdit);
const addFormValidator = startValidate(formData, formAdd);

defaultCardList.renderItems();
newCardAdd.setEventListeners();
popupWithFormEdit.setEventListeners();
popupImage.setEventListeners();

buttonFormOpenAdd.addEventListener('mousedown', () => {
  newCardAdd.open();
});

buttonFormOpen.addEventListener('mousedown', () => {
  fillForm(userInfo.getUserInfo());
  popupWithFormEdit.open();
})