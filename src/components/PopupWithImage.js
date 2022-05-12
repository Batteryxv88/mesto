import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImg = document.querySelector('.popup__img');
    this._popupImgLabel = document.querySelector('.popup__label');
  }

  open = (values) => {
    this._popupImg.src = values.link;
    this._popupImg.alt = values.name;
    this._popupImgLabel.textContent = values.name;
    super.open();
  }
}