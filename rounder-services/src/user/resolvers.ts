import * as userModel from './model';
import { User, ApolloContext, Trip } from '../types';

const resolvers = {
  Query: {
    async user(_, __, context: ApolloContext): Promise<User> {
      const user = await userModel.getUser(context.user.userId);

      if (!user) {
        throw new Error('user not found');
      }

      return user;
    },
  },
  Mutation: {
    async addTrip(_, args, context: ApolloContext): Promise<Trip> {
      await userModel.addTrip(context.user.userId, args.input as Trip);
      return args.input;
    },
  },
};

export default resolvers;
