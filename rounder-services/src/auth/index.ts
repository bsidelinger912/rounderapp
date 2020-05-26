/* eslint-disable consistent-return */

import express from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt-node';

import * as userModel from '../user/model';
import errorCodes from '../errorCodes';
import { User } from '../types';

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
  userModel.getUser(jwtPayload.id).then((user) => {
    if (!user) {
      return next(null, false);
    }
    next(null, user);
  }).catch(() => {
    next(null, false);
  });
}));

// Sign up
router.post('/signup', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'you must pass both email and password', code: errorCodes.BAD_REQUEST });
  } else {
    userModel.getUser(req.body.email).then((user) => {
      if (user) {
        return res.status(400).json({ message: 'That email is already taken', code: errorCodes.USER_TAKEN });
      }

      const newUser: User = {
        userId: req.body.email,
        email: req.body.email,
        password: generateHash(req.body.password),
        trips: [],
      };

      userModel.createUser(newUser).then(() => {
        const payload = { id: newUser.email };
        const token = jwt.sign(payload, jwtOptions.secretOrKey as string);

        res.json({ token });
      }).catch(() => {
        res.status(500).json({ message: 'Could not create User', code: errorCodes.DB_ERROR });
      });
    }).catch(() => {
      res.status(500).json({ message: 'error connecting to the database', code: errorCodes.DB_ERROR });
    });
  }
});


// Login
router.post('/login', (req, res) => {
  userModel.getUser(req.body.email).then((user) => {
    if (!user) {
      return res.status(401).json({ message: 'no such user found' });
    }

    // validate password
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const payload = { id: user.email };
      const token = jwt.sign(payload, jwtOptions.secretOrKey as string);

      return res.json({ token });
    }

    return res.status(401).json({ message: 'passwords did not match', code: errorCodes.BAD_PASSWORD });
  }).catch(() => {
    res.status(500).json({ message: 'failed to query database' });
  });
});

export default router;
