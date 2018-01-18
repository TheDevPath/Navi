const bodyParser = require("body-parser");
const express = require("express");
const app = express();

/* To allow access on headers and also to avoid CORS issues */

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* parse incoming requests */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* app listens on port 3000 */
app.listen(process.env.PORT || 3000);
console.log('Server listening on:', (process.env.PORT || 3000));


/*
    Routes to be setup
*/