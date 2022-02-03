let popup = document.querySelector('.popup');
let formOpenButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let nameInput = document.querySelector('.form__field_value_name');
let jobInput = document.querySelector('.form__field_value_job');
let nameOutput = document.querySelector('.profile__title');
let jobOutput = document.querySelector('.profile__subtitle');
let form = document.querySelector('.form');

function fillEditForm() {
  nameOutput.textContent = nameInput.value
  jobOutput.textContent = jobInput.value
}

function openPopup() {
  popup.classList.add('popup_active')
};

formOpenButton.addEventListener('click', () => {
  openPopup()
});

function closePopup() {
  popup.classList.remove('popup_active')
}
closeButton.addEventListener('click', closePopup);


form.addEventListener('submit', (e) => {
  e.preventDefault()
  fillEditForm()
  closePopup()
});






