import { openPopup } from "./index.js";
export { Card };

const popupPicBox = document.querySelector('.picture');
const popupImg = document.querySelector('.popup__img');
const label = document.querySelector('.popup__label');


class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
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
    const image = this._element.querySelector('.element__image');
    this._setEventListeners();
    image.src = this._link;
    image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    
    return this._element;
  }

  _handleOpenPopupImage() {
    popupImg.src = this._link;
    popupImg.alt = this._name;
    label.textContent = this._name;
    openPopup(popupPicBox);
    document.addEventListener('keydown', this._closeByEscape);
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
  }
}