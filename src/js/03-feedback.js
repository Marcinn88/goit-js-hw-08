import { throttle } from 'lodash';
const STORAGE_KEY = `feedback-form-state`;

const form = document.querySelector(`.feedback-form`);
const email = document.querySelector(`[name="email"]`);
const message = document.querySelector(`[name="message"]`);
const savedData = {};

afterReload();

form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  savedData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
}

function handleSubmit(event) {
  event.preventDefault();
  const praseData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (praseData) {
    console.log(praseData);
  }
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function afterReload() {
  const praseData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (praseData) {
    email.value = praseData.email;
    message.value = praseData.message;
  } else {
    email.value = '';
    message.value = '';
  }
}
