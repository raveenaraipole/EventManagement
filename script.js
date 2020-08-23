const express = require('express');
const app = express();
const router = express.Router();
const port = 4000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./model/event.model');

mongoose.connect('mongodb://localhost:27017/events_db', { useNewUrlParser: true }, (err) => {
    if (!err)
        console.log('Successfully established connection with Mongo');
    else
        console.log('Failed to Establish Connection with MongoDB with Error: ' + err);
})

const event = mongoose.model('Event');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/", router);


app.listen(port, function () {
    console.log('Server is running on:' + port);
})

router.route("/").get(function (req, res) {
    res.send("Hello World")
})

router.route("/insertEvent").post(function (req, res) {
    debugger;
    // console.log(req.body);
    event.insertMany(req.body, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
})

router.route("/getEvent").get((req, res) => {
    event.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Failed to retrieve' + err);
        }
    });
});

router.route("/update").post((req, res) => {
    // console.log(req);
    let fieldToUpdate = req.body[0];
    // console.log(fieldToUpdate.toString());
    event.findOneAndUpdate({"eventTitle": 'Technozion'},
	{ $set: { [fieldToUpdate]: req.body[1]}}, {useFindAndModify: false}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Failed to Update ' + err);
        }
    })
});


router.route("/delete").post((req, res) => {
    event.findOneAndDelete({"eventTitle":  "Ivarna"}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Failed to Update ' + err);
        }
    })
});



