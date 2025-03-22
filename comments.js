import { notHack } from './utils.js';

export const comments = [
  {
    name: "Глеб Фокин",
    date: new Date(),
    text: "Это будет первый комментарий на этой странице",
    likes: 3,
    getLiked: false,
  },
  {
    name: "Варвара Н.",
    date: new Date(),
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    getLiked: true,
  }
];

export const addComment = (name, text) => {
  if (name.trim() === "" || text.trim() === "") {
    alert("Пожалуйста, заполните все поля!");
    return;
  }

  const newComment = {
    name: notHack(name),
    date: new Date(),
    text: notHack(text),
    likes: 0,
    getLiked: false,
  };

  comments.push(newComment);
};