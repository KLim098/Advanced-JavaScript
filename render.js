import { comments } from './comments.js';

export const renderComments = () => {
    const list = document.querySelector(".comments");
    const textInput = document.getElementById("text-input");

    list.innerHTML = comments.map((comment, index) => `
        <li class="comment" data-index="${index}">
            <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date.toLocaleDateString()}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                    ${comment.text}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button data-index="${index}" class="like-button ${comment.getLiked ? "-active-like" : ""}"></button>
                </div>
            </div>
        </li>`
    ).join("");

    document.querySelectorAll(".like-button").forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = button.dataset.index;
            comments[index].getLiked = !comments[index].getLiked;
            comments[index].likes += comments[index].getLiked ? 1 : -1;
            renderComments();
        });
    });

    document.querySelectorAll(".comment").forEach(comment => {
        comment.addEventListener("click", () => {
            const currentComment = comments[comment.dataset.index];
            textInput.value = `${currentComment.name}: ${currentComment.text}`;
        });
    });
};