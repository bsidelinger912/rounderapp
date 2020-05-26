const typeDef = `
  extend type Query {
    user: User
  }

  extend type Mutation {
    addTrip(input: Trip!): Trip
  }

  type User {
    email: String!
    trips: [Trip]
  }
`;

export default typeDef;
