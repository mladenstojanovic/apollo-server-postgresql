import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

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
    }
`;

const posts = [
    {
        id: '1',
        title: 'Intro',
        content: 'Intro to apollo server',
        authorId: '1'
    },
    {
        id: '2',
        title: 'Basics of Apollo',
        content: 'Learning basics of apollo server',
        authorId: '2'
    },
    {
        id: '3',
        title: 'Advanced concepts of Apollo',
        content: 'Learning advanced concepts of apollo server',
        authorId: '1'
    }
];

const authors = [
    {
        id: '1',
        name: 'Mladen',
        postIds: ['1', '3']
    },
    {
        id: '2',
        name: 'Janko',
        postIds: ['2']
    }
]

const resolvers = {
    Query: {
        posts: () => posts,
        post: (_parent, { id }) => {
            return posts[id-1]
        },
        authors: () => authors,
        author: (_parent, { id }) => {
            return authors[id-1]
        }
    },
    Post: {
        author: post => {
            return authors[post.authorId - 1]
        }
    },
    Author: {
        posts: author => posts.filter(post => post.authorId === author.id)
    }
};

const app = express();


const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app, path: '/graphql'});

app.listen({ port: 8000 }, () => {
    console.log('Apollo server listening on http://localhost:8000/graphql');
});