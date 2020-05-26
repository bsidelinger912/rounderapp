/**
 * Used to populate apollo context for every request
 */

import passport from 'passport';
import { Request, Response } from 'express';
import { AuthenticationError } from 'apollo-server-express';

import { User } from '../types';

export default function auth(req: Request, res: Response): Promise<User> {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) reject(err);
      if (user) resolve(user);
      else reject(new AuthenticationError('Authentication Failed'));
    })(req, res);
  });
}
