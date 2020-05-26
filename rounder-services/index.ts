/* eslint-disable import/prefer-default-export */

import serverless from 'serverless-http';
import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';
import cors from 'cors';

import auth from './src/auth';
import { apolloServer } from './src/graphql';

const app = express();

app.use(cors());
app.use(bodyParser.json({ strict: false }));
app.use(passport.initialize());

app.use('/auth', auth);

apolloServer.applyMiddleware({ app });

export const handler = serverless(app);
