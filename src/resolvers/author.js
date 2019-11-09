export default {
    Query: {
        authors: (_parent, _args, { models }) => Object.values(models.authors),
        author: (_parent, { id }, { models }) => {
            return models.authors[id]
        },
        me: (_parent, _args, { me }) => {
            return me;
        }
    },
    Author: {
        posts: (author, _args, { models }) => Object.values(models.posts).filter(post => post.authorId === author.id)
    }
}