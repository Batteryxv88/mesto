let form = document.querySelector('.popup');
let formOpenButton = document.querySelector('.profile-info__edit-button');
let formCloseButton = document.querySelector('.form__close-icon');
let formSubmit = document.querySelector('.form__submit-button');
let nameInput = document.querySelector('.form__field-1');
let jobInput = document.querySelector('.form__field-2');
let nameOutput = document.querySelector('.profile-info__title');
let jobOutput = document.querySelector('.profile-info__subtitle');
let like = document.querySelector('.element__like');

function fillEditForm() {
  nameOutput.textContent = nameInput.value
  jobOutput.textContent = jobInput.value
}

function openPopup() {
  form.classList.add('active')
};

formOpenButton.addEventListener('click', () => {
  fillEditForm()
  openPopup()
})

function closePopup() {
  form.classList.remove('active')
}
formCloseButton.addEventListener('click', closePopup);


formSubmit.addEventListener('click', () => {
  fillEditForm()
  closePopup()
})

like.addEventListener('click', function(e){
  e.preventDefault()
  like.classList.add('active');
})






