import * as userModel from '../user/model';
import { Trip } from '../types';

const resolvers = {
  Query: {
    async trips(): Promise<Trip[]> {
      const users = await userModel.getUsers();
      const trips: Trip[] = [];

      users.forEach((user) => {
        trips.push(...user.trips);
      });

      return trips;
    },
  },
};

export default resolvers;
