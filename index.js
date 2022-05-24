const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./db/config');


//create express server
const app = express();

//cors
app.use(cors());

//db
dbConnection()

//parse body 
app.use(express.json());

//public 
app.use(express.static('public'));

//routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//listen request

app.listen(process.env.PORT, () => {
    console.log('server in port 4000');
});