const router = require('express').Router();

const Logs = require('../logs/logs-model.js');

router.get('/', (req, res) => {
    Logs.find()
        .then(logs => {
            res.status(200).json(logs);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Logs.findById(req.params.id)
        .then(log => {
            res.status(200).json(log);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

module.exports = router;
