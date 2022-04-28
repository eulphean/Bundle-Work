var express = require('express'); 
var cors = require('cors');
var database = require('./database.js');
const bodyParser = require('body-parser');

// ------------------ Express webserver ---------------- //
var app = express(); 
app.use(cors());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.json());

var server = require('http').createServer(app); 

// ------------------ Express webserver ------------------------ //
server.listen(5001, function() {
    console.log('Server successfully started'); 
});

// These are end points.
app.get('/', (req, res) => {
    console.log('Root Route');
    res.send('Server: Response')
});

// Push a new item in the database. 
app.post('/save', (req, res) => {
    let key = req.body.key; 
    let bundle = req.body.bundle;

    let promise = database.saveData(key, bundle);

    promise.then(result => {
        console.log(result);
        res.send(result);
    });
});

app.post('/retrieve', (req, res) => {
    let key = req.body.key; 

    let promise = database.readData(key);
    promise.then(result => {
        res.send(result);
    });
});