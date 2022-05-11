export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._selector.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close = () => {
    this._selector.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._selector.querySelector('.popup__close-icon').addEventListener('mousedown', this.close);
    this._selector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_active')) {
        this.close();
      }
    });
    this._selector.addEventListener('keydown', this._handleEscClose);
  }
}