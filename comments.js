import { notHack } from './utils.js';

export let comments = JSON.parse(localStorage.getItem('comments')) || [];

export const addComment = (name, text) => {
    const newComment = {
        name: notHack(name),
        date: new Date(),
        text: notHack(text),
        likes: 0,
        getLiked: false,
    };
    comments.push(newComment);
    saveToLocalStorage();
};

export const updateComments = (newComments) => {
    comments = newComments;
    saveToLocalStorage();
};

const saveToLocalStorage = () => {
    localStorage.setItem('comments', JSON.stringify(comments));
};