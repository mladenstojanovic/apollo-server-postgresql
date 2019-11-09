import uuid from 'uuid/v4';

export default {
    Query: {
        posts: (_parent, _args, { models }) => Object.values(models.posts),
        post: (_parent, { id }, { models }) => {
            return models.posts[id]
        }
    },
    Mutation: {
        createPost: (_parent, { title, content }, { me, models }) => {
            const id = uuid();
            const post = {
                id,
                title,
                content,
                authorId: me.id
            };

            models.posts[id] = post;
            models.authors[me.id].postIds.push(id);

            return post;
        },
        deletePost: (_parent, { id }, { models }) => {
            const { [id]: post, ...otherPosts } = models.posts;

            if (!post) {
                return false;
            }

            models.posts = otherPosts;

            return true;
        }
    },  
    Post: {
        author: (post, _args, { models }) => {
            return models.authors[post.authorId]
        }
    }
}