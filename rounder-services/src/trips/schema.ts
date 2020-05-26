const typeDef = `
  extend type Query {
    trips: [Trip]
  }

  type Trip {
    id: ID!
    name: String!
    description: String
    wayPoints: [WayPoint]
  }

  type WayPoint {
    id: ID!
    name: String!
  }
`;

export default typeDef;
