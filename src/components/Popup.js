export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-icon').addEventListener('mousedown', this.close);
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_active')) {
        this.close();
      }
    });
  }
}