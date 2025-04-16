import { addComment } from './comments.js';
import { renderComments } from './render.js';

document.addEventListener("DOMContentLoaded", () => {
  renderComments();

  const addButton = document.querySelector(".add-form-button");
  const nameInput = document.getElementById("name-input");
  const textInput = document.getElementById("text-input");

  addButton.addEventListener("click", () => {
    addComment(nameInput.value, textInput.value);
    renderComments();

    nameInput.value = ""; // Очистка поля ввода имени
    textInput.value = ""; // Очистка поля ввода текста
  });
});