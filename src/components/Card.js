export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick();
    });
  }
}