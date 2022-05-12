export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  generateCard() {
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
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

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }
}