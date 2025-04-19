const host = 'https://wedev-api.sky.pro/api/v1/KLIM';

export const fetchComments = async () => {
    const response = await fetch(`${host}/comments`);
    if (!response.ok) throw new Error('Ошибка сервера');
    const data = await response.json();
    return data.comments.map(comment => ({
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        getLiked: false
    }));
};

export const postComment = async (text, name) => {
    const response = await fetch(`${host}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text, name })
    });
    if (!response.ok) throw new Error('Ошибка отправки');
};