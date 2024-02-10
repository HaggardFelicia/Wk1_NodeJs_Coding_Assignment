const express = require('express');
const router = express.Router();

const storedData = [];

//localhost:3000/api
router.get('/', (req, res) => {
    const {data} = storedData;
    res.status(200).json({ 
        message: 'GET to API',
        data,
        metadata:{
            hostname: req.hostname,
            method: req.method
        }
    });
});

//how to use a route parameter
//localhost:3000/api/anythingThatFollows
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const data = storedData.find((storedData) => storedData.id === req.params.id);
    console.log(id);
    res.status(200).json({ 
        message: 'GET to API with id',
        id,
        metadata:{
            hostname: req.hostname,
            method: req.method
        }
    });
});

//assignment work
//POST, PUT By Id, DELETE By ID functionality.
router.post('/', (req, res) => {
    const {data} = req.body;
    storedData.push(data);
    res.status(200).json({ 
        message: 'POST to API',
        data: storedData,
        metadata:{
            hostname: req.hostname,
            method: req.method
        },
    });
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const data = storedData.find((storedData) => storedData.id === req.params.id);
    res.status(200).json({ 
        message: 'PUT to API with id',
        id,
        data,
        metadata:{
            hostname: req.hostname,
            method: req.method
        }
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const data = storedData.find((storedData) => storedData.id === req.params.id);
    res.status(200).json({ 
        message: 'DELETE to API with id',
        id,
        data,
        metadata:{
            hostname: req.hostname,
            method: req.method
        }
    });
});


module.exports = router;