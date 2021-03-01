const express = require('express');
const app = express ();
const path = require("path");



// create a cross-platform compatible path name (don't just use public)
const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));
app.use(express.urlencoded({extended: false}));


app.use((req, res, next) => {
    // console.log(req.session);
    console.log('The Cookie header contains: ' + req.get('Cookie'));
    next();
});
 

app.set('view engine', 'hbs');
app.get('/', function(req, res){
    res.render('trending')
});

app.listen(3000);
console.log("Server started; type CTRL+C to shut down ");