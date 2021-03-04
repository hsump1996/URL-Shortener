const express = require('express');
const app = express ();
const path = require("path");
const fs = require('fs');

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
    const longUrl = req.body.longUrl;
    const shortenedURL = shorten(longUrl);
    res.render('/shorten',  {'longUrl': shortenedURL})

});


app.get('/shorten', function(req, res){
    const longUrl = req.body.longUrl;
    const shortenedURL = shorten(longUrl);
    res.render('/shorten',  {'longUrl': shortenedURL})

});



app.get('/expand', function(req, res){
    
    const longUrl = urlShortener.expand(urlData, req.query.shortUrl);

});

app.listen(3000);
console.log("Server started; type CTRL+C to shut down ");