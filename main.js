import { fetchComments, postComment } from './api.js';
import { addComment, updateComments, comments } from './comments.js';
import { renderComments } from './render.js';

document.querySelector(".comments").innerHTML = "Идет загрузка комментариев..."

document.addEventListener("DOMContentLoaded", () => {
    loadComments();

    const addButton = document.querySelector(".add-form-button");
    const nameInput = document.getElementById("name-input");
    const textInput = document.getElementById("text-input");

    addButton.addEventListener("click", () => {
        handleAddComment(nameInput, textInput);
    });
});

const loadComments = async () => {
    try {
        const serverComments = await fetchComments();
        updateComments(serverComments);
        renderComments();
    } catch (error) {
        console.error("Ошибка загрузки:", error);
        renderComments();
    }
};

const handleAddComment = (nameInput, textInput) => {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    const addButton = document.querySelector(".add-form-button");

    if (!name || !text) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    addButton.disabled = true;
    addButton.textContent = "Отправка...";

    addComment(name, text);
    renderComments();
    nameInput.value = "";
    textInput.value = "";

    postComment(text, name)
        .then(() => {
            return fetchComments();
        })
        .then(serverComments => {
            updateComments(serverComments);
            renderComments();
        })
        .catch(error => {
            console.error("Ошибка отправки:", error);
            alert("Не удалось отправить комментарий. Попробуйте позже.");
        })
        .finally(() => {
            // В любом случае (успех или ошибка) возвращаем кнопку в исходное состояние
            addButton.disabled = false;
            addButton.textContent = "Написать";
        });
};