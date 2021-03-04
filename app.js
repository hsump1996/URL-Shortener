const express = require('express');
const app = express ();
const path = require("path");
const fs = require('fs');
const urlShortener = require("./urlShortener.js");

//Part 4 Initial Data
const processedInfo = fs.readFileSync('./data/urldata.json');
const urlData = JSON.parse(processedInfo);
console.log(urlData);


const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'hbs');


// Custom Middleware Function
app.use((req, res, next) => {
    console.log('Method: ' + req.method);
    console.log('Path: ' + req.path);
    console.log(req.query);
    next();
});


app.get('/', function(req, res){
    res.render('trending')
});

app.get('/trending', function(req, res){
    res.render('trending')
});


app.get('/shorten', function(req, res){
    res.render('shorten')
    console.log(req);
});

app.post('/shorten', function(req, res) {
    let ushort = new urlShortener.URLShortener(req.body.longUrl);
    let shortUrl = ushort.shorten();
    res.render('shorten', {'longUrl': shortUrl});
});


app.listen(3000);
console.log("Server started; type CTRL+C to shut down ");