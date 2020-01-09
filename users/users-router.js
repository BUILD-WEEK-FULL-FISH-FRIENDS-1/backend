const router = require('express').Router();

const Users = require('./users-model.js');
const Logs = require('../logs/logs-model.js');
const restricted = require('../auth/auth-middleware.js');

router.get('/:id', restricted, (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => res.status(500).json(err));
});

router.get('/:id/logs', restricted, (req, res) => {
    Logs.findBy(req.params.id, 'userId')
        .then(logs => {
            res.status(200).json(logs);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.post('/:id/logs', restricted, (req, res) => {
    Logs.add(req.body)
        .then(log => {
            res.status(200).json(log);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.put('/:id/logs/:id', restricted, (req, res) => {
    Logs.updateLog(req.body, req.params.id)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.delete('/:id/logs/:id', restricted, (req, res) => {
    Logs.remove(req.params.id)
        .then(num => {
            if(num > 0) {
                res.status(200).json({message: 'removed log' });
            } else {
                res.status(404).json({ message: 'Log could not be found' })
            }
        })
        .catch(err => (res.status(500).json(err)))
})

module.exports = router;
