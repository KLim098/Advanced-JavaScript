import { comments } from './comments.js';

export const renderComments = () => {
  const list = document.querySelector(".comments");

  const textInput = document.getElementById("text-input");

  list.innerHTML = comments.map((comment, index) => {
    return `
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
      </li>`;
  }).join("");

  const likeButtons = document.querySelectorAll(".like-button");

  const commentsElements = document.querySelectorAll(".comment");

  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", () => {
      const currenntComment = comments[commentElement.dataset.index];
      textInput.value = `${currenntComment.name} : ${currenntComment.text}`
    })
  }

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButton.dataset.index;
      const comment = comments[index];

      if (comment.getLiked) {
        comment.likes -= 1;
        comment.getLiked = false;
      } else {
        comment.likes += 1;
        comment.getLiked = true;
      }

      renderComments();
    });
  });
};