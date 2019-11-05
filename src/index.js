import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import uuid from 'uuid/v4';

const typeDefs = gql`
    type Post {
        id: ID!
        title: String
        content: String
        author: Author
    }

    type Author {
        id: ID!
        name: String!
        posts: [Post]
    }

    type Query {
        posts: [Post]
        post(id: ID!): Post
        authors: [Author!]
        author(id: ID!): Author
        me: Author
    }

    type Mutation {
        createPost(title: String!, content: String!): Post!
        deletePost(id: ID!): Boolean!
    }
`;

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

const resolvers = {
    Query: {
        posts: () => Object.values(posts),
        post: (_parent, { id }) => {
            return posts[id]
        },
        authors: () => Object.values(authors),
        author: (_parent, { id }) => {
            return authors[id]
        },
        me: (_parent, _args, { me }) => {
            return me;
        }
    },
    Mutation: {
        createPost: (_parent, { title, content }, { me }) => {
            const id = uuid();
            const post = {
                id,
                title,
                content,
                authorId: me.id
            };

            posts[id] = post;
            authors[me.id].postIds.push(id);

            return post;
        },
        deletePost: (_parent, { id }) => {
            const { [id]: post, ...otherPosts } = posts;

            if (!post) {
                return false;
            }

            posts = otherPosts;

            return true;
        }
    },
    Post: {
        author: post => {
            return authors[post.authorId]
        }
    },
    Author: {
        posts: author => Object.values(posts).filter(post => post.authorId === author.id)
    }
};

const app = express();


const server = new ApolloServer({typeDefs, resolvers, context: {
    me: authors[1]
}});

server.applyMiddleware({app, path: '/graphql'});

app.listen({ port: 8000 }, () => {
    console.log('Apollo server listening on http://localhost:8000/graphql');
});