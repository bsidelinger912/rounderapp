import db from '../db';
import { User, Trip } from '../types';

const { USERS_TABLE } = process.env;

const paramsBase = {
  TableName: USERS_TABLE as string,
};

export function getUsers(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    db.scan(paramsBase, (error, result) => {
      if (!error && result.Items) {
        resolve(result.Items as User[]);
      } else {
        reject(error || new Error('Failed to query'));
      }
    });
  });
}

export function getUser(userId: string): Promise<User | undefined> {
  return new Promise((resolve, reject) => {
    const params = {
      ...paramsBase,
      Key: { userId },
    };

    db.get(params, (error, result) => {
      if (!error) {
        resolve(result.Item as User);
      } else {
        reject(error || new Error('User Doesnt exist'));
      }
    });
  });
}

export function createUser(newUser: User): Promise<void> {
  return new Promise((resolve, reject) => {
    db.put({
      ...paramsBase,
      Item: newUser,
    }, (err) => {
      if (err) {
        reject(new Error('Could not create User'));
      } else {
        resolve();
      }
    });
  });
}

export function addTrip(userId: string, newTrip: Trip): Promise<void> {
  return new Promise((resolve, reject) => {
    db.update({
      ...paramsBase,
      Key: { userId },
      UpdateExpression: 'set #trips = list_append(if_not_exists(#trips, :empty_list), :trip)',
      ExpressionAttributeNames: {
        '#trips': 'trips',
      },
      ExpressionAttributeValues: {
        ':trip': [newTrip],
        ':empty_list': [],
      },
    }, (err) => {
      if (err) {
        reject(new Error('Could not create User'));
      } else {
        resolve();
      }
    });
  });
}
