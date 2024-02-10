const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'GET = root' ,
        metadata: {
            hostname: req.hostname, method: req.method
        },
    });
    res.json({ message: 'Sevice is up' });
});

app.use('/api', router);

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((err,req,res,next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
            status: err.status
        });
});

module.exports = app;