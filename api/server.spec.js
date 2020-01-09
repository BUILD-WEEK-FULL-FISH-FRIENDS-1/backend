const server = require('./server.js');
const request = require('supertest');
const db = require('../database/dbConfig.js')
describe('testing fish friends backend server', () => {
    var tempToken = null;
    describe('GET /', () => {
        beforeEach(async () => {
            await db('users').truncate();
            await db('logs').truncate();
        })
        it('has process.env.DB_ENV as "testing"', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });
        it('returns 200 ok', () => {
            return request(server).get('/')
                .expect(200)
        })
    })
    describe('POST /api/auth/register', () => {
        it('insert new user into db', () => {
            return request(server)
                .post('/api/auth/register')
                .send({username: 'testTester', password: 'password'})
                .then(res => {
                    expect(res.status).toBe(201);
                    expect(res.body.username).toBe('testTester')
                });
        })
    })
    describe('POST /api/auth/login', () => {
        it('receive JWT token back', () => {
            return request(server)
                .post('/api/auth/login')
                .send({username: 'testTester', password:'password'})
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.token);
                    tempToken = res.body.token;
                })
        })
    })
    describe('POST /api/user/id/logs', () => {
        it('insert new post to user account', () => {
            return request(server)
                .post('/api/user/1/logs')
                .set('Authorization', tempToken)
                .send({
                    title: "tester log",
                    userId: 1,
                    bait: "",
                    location: "here",
                    log: "very bad, the worst",
                    score: 5
                })
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.body).toStrictEqual({
                        id: 1,
                        userId: 1,
                        title: "tester log",
                        bait: "",
                        fish: null,
                        location: "here",
                        log: "very bad, the worst",
                        score: 5
                    })
                })
        })
    })
    describe('PUT /api/user/id/logs/id', () => {
        it('update post on user account', () => {
            return request(server)
                .put('/api/user/1/logs/1')
                .set('Authorization', tempToken)
                .send({
                    title: "tester log",
                    userId: 1,
                    bait: "",
                    fish: 'trout',
                    location: "here",
                    log: "very bad, the worst",
                    score: 5
                })
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.body).toStrictEqual({
                        id: 1,
                        userId: 1,
                        title: "tester log",
                        bait: "",
                        fish: 'trout',
                        location: "here",
                        log: "very bad, the worst",
                        score: 5
                    })
                })
        })
    })
    describe('GET /api/logs', () => {
        it('recieves array of all logs in db', () => {
            return request(server)
                .get('/api/logs')
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })
    })
    describe('GET /api/logs/id', () => {
        it('recieves a log from the db', () => {
            return request(server)
                .get('/api/logs/1')
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.body).toStrictEqual({
                        id: 1,
                        userId: 1,
                        title: "tester log",
                        bait: "",
                        fish: 'trout',
                        location: "here",
                        log: "very bad, the worst",
                        score: 5
                    })
                })
        })
    })
    describe('GET /api/user/id/logs/id', () => {
        it('deletes a log from the db', () => {
            return request(server)
                .delete('/api/user/1/logs/1')
                .set('Authorization', tempToken)
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.body.message).toBe('removed log');
                })
        })
    })
})
