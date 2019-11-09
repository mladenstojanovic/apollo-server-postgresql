let posts = {
    1: {
        id: '1',
        title: 'Intro',
        content: 'Intro to apollo server',
        authorId: '1'
    },
    2: {
        id: '2',
        title: 'Basics of Apollo',
        content: 'Learning basics of apollo server',
        authorId: '2'
    },
    3: {
        id: '3',
        title: 'Advanced concepts of Apollo',
        content: 'Learning advanced concepts of apollo server',
        authorId: '1'
    }
};

let authors = {
    1: {
        id: '1',
        name: 'Mladen',
        postIds: ['1', '3']
    },
    2: {
        id: '2',
        name: 'Janko',
        postIds: ['2']
    }
}

export default {
    posts,
    authors
}