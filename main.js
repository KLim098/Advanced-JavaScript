import { fetchComments, postComment } from './api.js';
import { addComment, updateComments } from './comments.js';
import { renderComments } from './render.js';

document.addEventListener("DOMContentLoaded", () => {
    fetchComments()
        .then(serverComments => {
            updateComments(serverComments);
            renderComments();
        })
        .catch(error => {
            console.error("Ошибка загрузки:", error);
            renderComments();
        });


    const addButton = document.querySelector(".add-form-button");
    const nameInput = document.getElementById("name-input");
    const textInput = document.getElementById("text-input");

    addButton.addEventListener("click", () => {
      const name = nameInput.value;
      const text = textInput.value;
      
      if (name.trim() === "" || text.trim() === "") {
        alert("Пожалуйста, заполните все поля!");
        return;
      }
    
      addComment(name, text);
      renderComments();
    
      nameInput.value = "";
      textInput.value = "";
    
      postComment(text, name)
        .then(data => {
          updateComments(data);
          renderComments();
        })
    });
});