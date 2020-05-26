
import { ApolloServer } from 'apollo-server-express';

import tripTypeDef from './trips/schema';
import tripResolvers from './trips/resolvers';
import userTypeDef from './user/schema';
import userResolvers from './user/resolvers';
import authenticateRequest from './auth/authenticateRequest';
import { ApolloContext } from './types';

export const typeDefRoot = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const apolloServer = new ApolloServer({
  typeDefs: [typeDefRoot, tripTypeDef, userTypeDef],
  resolvers: [tripResolvers, userResolvers],
  context: async ({ req, res }): Promise<ApolloContext> => {
    const user = await authenticateRequest(req, res);

    return { user };
  },
});
