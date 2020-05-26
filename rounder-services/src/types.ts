export interface WayPoint {
  id: string;
  name: string;
  // TODO: comments, images, keyPoint flag??, etc.
  geolocation: Geolocation;
}

export interface Trip {
  id: string;
  name: string;
  wayPoints: WayPoint[];
}

export interface User {
  userId: string;
  email: string;
  password: string;
  trips: Trip[];
}

export interface ApolloContext {
  user: User;
}
