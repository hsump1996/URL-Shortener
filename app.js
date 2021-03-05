const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const urlShortener = require("./urlShortener.js");

const processedInfo = fs.readFileSync('./data/urldata.json');

//Saved the array of urlShortener objects in a global variable
const urlData = JSON.parse(processedInfo);

//Array that stores list of shortUrls
const shortUrls = new Array();

console.log(urlData);


const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

//Activates the body parsing middleware
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'hbs');


// Custom Middleware Function
app.use((req, res, next) => {
    console.log('Method: ' + req.method);
    console.log('Path: ' + req.path);
    console.log(req.query);
    next();
});


//Render an appropriate HTML page with a list of top 5 trending URLs.
app.get('/', function(req, res){
    urlData.sort((a,b) => b.clickCount - a.clickCount);
    const arrayOfTrendingURLs = new Array();
    for (let i = 0; i < 5; i++) {
        arrayOfTrendingURLs.push(urlData[i].shortURL);
    }

    res.render('trending', {'arrayOfTrendingURLs' : arrayOfTrendingURLs});
});

//Redirects to Home Page
app.get('/trending', function(req, res){
    res.redirect('/');
});

// GET request --> /shorten: Renderr the form which the user can submit to shorten a URL
app.get('/shorten', function(req, res){
    res.render('shorten');
    console.log(req);
});


// POST request --> /shorten: Given a original long URL, returns a short URL
app.post('/shorten', function(req, res) {
    const ushort = new urlShortener.URLShortener(req.body.longUrl);
    let shortUrl = ushort.shorten(req.body.longUrl);

    //Extra Credit: Handles the conflict when a shorten() method generates an existing shortUrl
    if(shortUrls.includes(shortUrl)) {
        shortUrl = ushort.shorten(req.body.longUrl);
        //Add the new object to the global array holding all of the shortURLs.
        shortUrls.push(shortUrl);
        //Creates an entry to JSON file urldata.json
        urlData.push({'originalURL': req.body.longUrl, 'shortURL': shortUrl, 'clickCount': '0'});
        res.render('shorten', {'shortUrl': shortUrl});
    
    // Case when shorten() method did not generate an existing shortUrl
    } else {

        // Case when the user entered no input value
        if (shortUrl.includes('Please')) {
            res.render('shorten', {'shortUrl': shortUrl});
        
        // Case when user entered appropriate input value
        } else {
            shortUrls.push(shortUrl);
            urlData.push({'originalURL': req.body.longUrl, 'shortURL': shortUrl, 'clickCount': '0'});
            res.render('shorten', {'shortUrl': shortUrl});
        }
    }
});

// GET request --> /expand: Render the form which the user can submit to expand a URL or given 
// a short URL, returns the original long URL
app.get('/expand', function(req, res) {
    
    const ushort = new urlShortener.URLShortener(req.query.shortUrl);
    const shortUrlPassIn = req.query.shortUrl;
    const originalUrl = ushort.expand(urlData, shortUrlPassIn);
    ushort.updateClickCount();

    //EXTRA CREDIT: The form will validate the URL because I made the requirement of input type to be an url by setting <input type="url" name="shortUrl">.	
    //If an invalid URL is entered, then it will automatically pop an error message.
    res.render('expand', {'originalUrl': originalUrl});
});


app.listen(3000);
console.log("Server started; type CTRL+C to shut down ");