import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        posts: [Post]
        post(id: ID!): Post
    }

    extend type Mutation {
        createPost(title: String!, content: String!): Post!
        deletePost(id: ID!): Boolean!
    }

    type Post {
        id: ID!
        title: String
        content: String
        author: Author
    }
`;