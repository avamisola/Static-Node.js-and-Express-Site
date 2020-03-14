//require express
const express = require('express');
//create new app
const app = express();
//set port value
const port = 3000;
//require json file
const {projects} = require('./data');

//set view engine to pug
app.set('view engine', 'pug');
//use static route to access files in public folder
app.use("/static", express.static("public"));

//render index page
app.get('/', (req, res) => {
    res.render('index', {projects});
});
//render about page
app.get('/about', (req, res) => {
    res.render('about', {projects});
});
//render project page
app.get('/projects/:id', (req , res) => {
    const id = req.params.id;
    res.render('project', projects[id]);
});

//error handling 404
app.use(function (req, res, next) {
    res.status(404).send("Error 404 Page not found, go back to home page.");
});
//error handling other
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Error 500 Something went wrong, go back to home page.')
});

//log port number to console
app.listen(port, () => {
    console.log(`The application is running on port ${port}!`);
});
