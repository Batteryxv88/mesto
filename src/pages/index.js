import FormValidator from "../components/FormValidator.js";
import Card  from "../components/Card.js";
import { initialCards } from "../utils/constants.js";
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { nameInput, jobInput, buttonFormOpen, nameOutput,
  jobOutput, formAdd, buttonFormOpenAdd, formEdit,
  elements, formData } from "../utils/constants.js";
import './index.css';

const defaultCardList = new Section({ 
  items: initialCards,
    renderer: (item) => {
    const card = new Card({data: item, 
      handleCardClick: () => {
        const popupImage = new PopupWithImage('.picture', item);
        popupImage.open();
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
        const popupImage = new PopupWithImage('.picture', newCardData);
        popupImage.open();
        popupImage.setEventListeners();
      }
    }, '.card-template');
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
    newCardAdd.close();
    resetButton();
    }
);

const popupWithFormEdit = new PopupWithForm('.popup_type_form-edit', () => {
  const userInfo = new UserInfo(nameOutput, jobOutput);
  userInfo.setUserInfo({name: nameInput.value, job: jobInput.value});
  popupWithFormEdit.close(); 
});

//функция валидации
function startValidate(data, formItem) {
  const formValidated = new FormValidator(data, formItem);
  formValidated.enableValidation();
  return formValidated;
}

const editFormValidator = startValidate(formData, formEdit);
const addFormValidator = startValidate(formData, formAdd);

//функция сброса кнопки
function resetButton() {
  addFormValidator.toggleButtonStateOff();
}

//
defaultCardList.renderItems();
newCardAdd.setEventListeners();
popupWithFormEdit.setEventListeners();

buttonFormOpenAdd.addEventListener('mousedown', () => {
  newCardAdd.open();
});

buttonFormOpen.addEventListener('mousedown', () => {
  popupWithFormEdit.setInputValues({name: nameOutput.textContent, job: jobOutput.textContent});
  popupWithFormEdit.open();
})