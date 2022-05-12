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

const defaultCardList = new Section({ 
  items: initialCards,
    renderer: (item) => {
    const card = new Card({data: item, 
      handleCardClick: () => {
        const popupImage = new PopupWithImage('.picture');
        popupImage.open(item);
        popupImage.setEventListeners();
      }
    },'.card-template');
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
    }
  },
  elements
);

const newCardAdd = new PopupWithForm('.popup_form_add',
    (newCardData) => {
      const card = new Card({data: newCardData,
      handleCardClick: () => {
        const popupImage = new PopupWithImage('.picture');
        popupImage.open(newCardData);
        popupImage.setEventListeners();
      }
    }, '.card-template');
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
    newCardAdd.close();
    addFormValidator.toggleButtonStateOff();
    }
);

const userInfo = new UserInfo({name: '.profile__title', job:'.profile__subtitle'});

const popupWithFormEdit = new PopupWithForm('.popup_type_form-edit', () => {
  popupWithFormEdit.setEventListeners();
  userInfo.setUserInfo({name: nameInput.value, job: jobInput.value});
});

//функция валидации
function startValidate(data, formItem) {
  const formValidated = new FormValidator(data, formItem);
  formValidated.enableValidation();
  return formValidated;
}

const editFormValidator = startValidate(formData, formEdit);
const addFormValidator = startValidate(formData, formAdd);


defaultCardList.renderItems();
newCardAdd.setEventListeners();
popupWithFormEdit.setEventListeners();

buttonFormOpenAdd.addEventListener('mousedown', () => {
  newCardAdd.open();
});

buttonFormOpen.addEventListener('mousedown', () => {
  userInfo.getUserInfo();
  popupWithFormEdit.open();
})