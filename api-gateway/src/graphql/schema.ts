import { gql } from "apollo-server-express";

// gql me permite usar esta sintaxis de templates
const schema = gql`
  scalar Date
  
  type User {
    id: ID!
    username: String!
  }
  
  type UserSession {
    createdAt: Date!
    expiresAt: Date! 
    id: ID!
    user: User!
  }

  type Mutation {
    createUser(password: String!, username: String!): User!
    createUserSession(password:String!, username:String!): UserSession!
  }
  
  type Query {
    userSession(me: Boolean!): UserSession
  }
`;

export default schema;