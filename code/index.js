const express = require('express');
const morgan = require('morgan');
const { Prohairesis } = require('prohairesis');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 8080;

app
    .use(express.static('public'))
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: false}))
    .use(bodyParser.json())

    .post('/api/rental', (req, res) => {
        res.json(req.body);
    })


    .listen(port, () => console.log('Server listening'));