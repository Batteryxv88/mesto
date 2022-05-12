export default class UserInfo {
  constructor({name, job}) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._nameInput = document.querySelector('.form__field_value_name');
    this._jobInput = document.querySelector('.form__field_value_job');
  }

  getUserInfo() {
    return {name: this._nameInput.value = this._name.textContent,
        job: this._jobInput.value = this._job.textContent};
  }

  setUserInfo({name, job}) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}