const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');
const logsRouter = require('../logs/logs-router.js');
const userRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/logs', logsRouter);
server.use('/api/user', auth, userRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'its working' });
})

module.exports = server;