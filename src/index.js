import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import models from './models';

const app = express();

const server = new ApolloServer({typeDefs, resolvers, context: {
    models,
    me: models.authors[1]
}});

server.applyMiddleware({app, path: '/graphql'});

app.listen({ port: 8000 }, () => {
    console.log('Apollo server listening on http://localhost:8000/graphql');
});