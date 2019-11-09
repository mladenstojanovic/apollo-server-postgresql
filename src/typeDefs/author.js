import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        authors: [Author!]
        author(id: ID!): Author
        me: Author
    }

    type Author {
        id: ID!
        name: String!
        posts: [Post]
    }
`;