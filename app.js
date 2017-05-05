
//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();


const route = require('./routes/route');


//connect to Mongodb Refresh

    mongoose.connect('mongodb://localhost:27017/crmtool');
    //on connection
    mongoose.connection.on('connected', ()=>{
        console.log('connected to Mongodb database @ 27017')
    });
    mongoose.connection.on('error', (err)=>{
        if(err)
        {
            console.log('error in database connection: '+err);
        } 
    });

// Add headers
app.use(function (req, res, next) {

    console.log('In Headers');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//port No
const port=3000;

//Adding middleware - cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api',route);

//testing Server
app.get('/',(req, res)=>{
    res.send('foobar');
});

app.listen(port,()=>{
    console.log("server started at port: "+port);

});