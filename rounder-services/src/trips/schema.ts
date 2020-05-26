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

  input TripInput {
    name: String!
    description: String
    wayPoints: [WayPointInput]
  }

  type WayPoint {
    id: ID!
    name: String!
  }

  input WayPointInput {
    name: String!
  }
`;

export default typeDef;
