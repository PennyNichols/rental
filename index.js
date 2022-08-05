const express = require('express');
const morgan = require('morgan');
const { Prohairesis } = require('prohairesis');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const mySQLString=process.env.CLEARDB_DATABASE_URL;

const database = new Prohairesis(mySQLString);

app
    .use(express.static('public'))
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: false}))
    .use(bodyParser.json())


    .post('/api/request', async (req, res) => {
        const body = req.body;

        await database.execute(`
            INSERT INTO reservations (
                first_name,
                last_name,
                check_in,
                check_out,
                alarm,
                cameras,
                groceries,
                breakfast,
                mail,
                date_added
            ) VALUES (
                @firstName,
                @lastName,
                @checkIn,
                @checkOut,
                @alarm,
                @cameras,
                @groceries,
                @breakfast,
                @mail,
                NOW()
            )
        
        `, {
            firstName: body.first,
            lastName: body.last,
            checkIn: body.checkin,
            checkOut: body.checkout,
            alarm: body.alarm,
            cameras: body.cameras,
            groceries: body.groceries,
            breakfast: body.breakfast,
            mail: body.mail,

        })
        
        res.end('Reservation Requested!');
    })


    .listen(port, () => console.log('Server listening'));