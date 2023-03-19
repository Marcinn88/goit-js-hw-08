import { throttle } from 'lodash';
const STORAGE_KEY = `feedback-form-state`;

const form = document.querySelector(`.feedback-form`);
const email = document.querySelector(`[name="email"]`);
const message = document.querySelector(`[name="message"]`);
const savedData = {};

afterReload();

form.addEventListener('input', throttle(catchInput, 500));
form.addEventListener('submit', catchSubmit);

function catchInput(event) {
  savedData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
}

function catchSubmit(event) {
  event.preventDefault();
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data) {
      console.log(data);
    }
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.log(`Error w funkcji catchSubmit`);
  }
}

function afterReload() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data) {
      email.value = data.email;
      message.value = data.message;
    } else {
      email.value = '';
      message.value = '';
    }
  } catch (error) {
    console.log(`Error w funkcji afterReload`);
  }
}
