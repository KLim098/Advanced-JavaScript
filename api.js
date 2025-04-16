const host = 'https://wedev-api.sky.pro/api/v1/KLIM';

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            if (!res.ok) throw new Error('Ошибка сервера');
            return res.json();
        })
        .then((responseData) => {
            return responseData.comments.map((comment) => ({
                name: comment.author.name,
                date: new Date(comment.date),
                text: comment.text,
                likes: comment.likes,
                getLiked: false
            }));
        });
};

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: text,
            name: name
        })
    })
};