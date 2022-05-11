import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, data) {
    super(selector);
    this._name = data.name;
    this._link = data.link;
    this._popupImg = document.querySelector('.popup__img');
    this._popupImgLabel = document.querySelector('.popup__label');
  }

  open = () => {
    this._popupImg.src = this._link;
    this._popupImg.alt = this._name;
    this._popupImgLabel.textContent = this._name;
    super.open();
  }
}