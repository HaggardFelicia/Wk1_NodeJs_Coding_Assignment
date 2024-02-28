const express = require('express');
const router = express.Router();

const storedData = [];

//localhost:3000/api
router.get('/', (req, res) => {
    storedData;
    res.status(200).json({ 
        message: 'GET to API',
        data: storedData,
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
    function generateRandomId(){
        const crypto = require('node:crypto');
        const uuid = crypto.randomUUID();
        return uuid;
    };
    //try code block to create a new director with a success message
    try{
        const {data} = req.body;
        const id = generateRandomId();
        storedData.push({id: id, data: data});
        //should return the data that was added with an id
        res.status(200).json({ 
            message: 'POST to API',
            data: storedData[storedData.length - 1],
            metadata:{
                hostname: req.hostname,
                method: req.method
            },
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
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