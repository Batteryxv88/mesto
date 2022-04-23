import { initialCards } from "./index.js";
export { renderElements };

const elements = document.querySelector('.elements');
const popupPicBox = document.querySelector('.picture');
const popupImg = document.querySelector('.popup__img');
const label = document.querySelector('.popup__label');
const popupPicClose = document.querySelector('.popup__close-img');


class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);
      return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    
    return this._element;
  }
  
  _handleOpenPopupImage() {
    popupImg.src = this._link;
    popupImg.alt = this._name;
    label.textContent = this._name;
    popupPicBox.classList.add('popup_active');
    document.addEventListener('keydown', this._closeByEscape);
  }

  _popupClose(button) {
    button.classList.remove('popup_active');
  }

  _closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
      this._handleClosePopupImage();
    }
  }

  _handleClosePopupImage() {
    popupImg.src = '';
    label.textContent = '';
    popupImg.alt = '';
    popupPicBox.classList.remove('popup_active');
    document.removeEventListener('keydown', this._closeByEscape);
  }

  _deleteHandler = () => {
    this._element.remove();
  }

  _likeHandler = () => {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._likeHandler);

    this._element.querySelector('.element__trash').addEventListener('click', this._deleteHandler);

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopupImage();
    });
    popupPicClose.addEventListener('click', () => {
      this._handleClosePopupImage();
    });
  }
}

const renderElements = (data) => {
  data.forEach((item) => {
    const card = new Card(item, '.card-template');

    const cardElement = card.generateCard();
    elements.prepend(cardElement);
  }); 
}