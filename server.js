const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();

app.use(express.json());


//db connection
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log('connection established');
}).catch(err => {
    console.log('failed to connect')
})

const corsOptions = {
    origin: ['http://api.example.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

//public route
app.use('/api/public', (req, res, next) => {
    const userAgent = req.get('User-Agent');
    if (userAgent === 'Dart') {
        next();
    } else {
        res.status(403).json({ msg: 'Forbidden' });
    }
});

//main endpoint
app.use('/api', routes)



app.listen(4000, ()=>{
    console.log('listening on port 4000')
})