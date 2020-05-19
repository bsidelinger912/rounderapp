/* eslint-disable consistent-return */

import express from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt-node';

import db from '../db';
import errorCodes from '../errorCodes';
import { User } from './types';

const { USERS_TABLE } = process.env;

const router = express.Router();

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  // TODO: secure further?
  secretOrKey: 'roundersgetaround',
};

function generateHash(password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

// Strategy
passport.use(new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  const params = {
    TableName: USERS_TABLE as string,
    Key: {
      userId: jwtPayload.id,
    },
  };

  db.get(params, (error, result) => {
    if (!error && result.Item) {
      next(null, result.Item);
    } else {
      next(null, false);
    }
  });
}));

// Sign up
router.post('/signup', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'you must pass both email and password', code: errorCodes.BAD_REQUEST });
  } else {
    db.get({
      TableName: USERS_TABLE as string,
      Key: {
        userId: req.body.email,
      },
    }, (error, result) => {
      // if there are any errors, return the error
      if (error) {
        return res.status(500).json({ message: 'error connecting to the database', code: errorCodes.DB_ERROR });
      }

      // check to see if theres already a user with that email
      if (result.Item) {
        return res.status(400).json({ message: 'That email is already taken', code: errorCodes.USER_TAKEN });
      }

      // if there is no user with that email
      // create the user
      const newUser: User = {
        userId: req.body.email,
        email: req.body.email,
        password: generateHash(req.body.password),
      };

      db.put({
        TableName: USERS_TABLE as string,
        Item: newUser,
      }, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Could not create User', code: errorCodes.DB_ERROR });
        }

        const payload = { id: newUser.email };
        const token = jwt.sign(payload, jwtOptions.secretOrKey as string);

        return res.json({ token });
      });
    });
  }
});


// Login
router.post('/login', (req, res) => {
  const params = {
    TableName: USERS_TABLE as string,
    Key: {
      userId: req.body.email,
    },
  };

  db.get(params, (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'failed to query database' });
    }

    if (!result.Item) {
      return res.status(401).json({ message: 'no such user found' });
    }

    const user = result.Item as User;

    // validate password
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const payload = { id: user.email };
      const token = jwt.sign(payload, jwtOptions.secretOrKey as string);

      return res.json({ token });
    }

    return res.status(401).json({ message: 'passwords did not match', code: errorCodes.BAD_PASSWORD });
  });
});

export default router;
