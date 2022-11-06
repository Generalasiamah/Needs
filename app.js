const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const nodeGeocoder = require('node-geocoder');
mongoose.connect('mongodb://127.0.0.1:27017/needsApp')



var schema = mongoose.Schema({
    name: String,
  });

var Model = mongoose.model("model", schema, "myCollection");

const app = express();
app.use (express.json());
app.use(express.urlencoded({extended : true}))
;
app.use(express.static('public'))
app.set ('view engine', 'ejs');

app.get("/" , function (req, res) {
        res.render('index');
    } )


 app.post('/', async function(req,res){
    var doc1 = new Model({name: req.body.Need })
    doc1.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
      });
    const nana = await Model.find({}).select('name -_id');
    var nanas = nana.map(function(element){
        return element.name
    })
    res.send(nanas.join("<br />"))
})

app.post('/location', function(req, res){
    var options = {
        provider: 'google',
        httpAdapter: 'https', // Default
        apiKey: ' ', // for Mapquest, OpenCage, Google Premier
        formatter: 'json' // 'gpx', 'string', ...
      };
      
      var geocoder = nodeGeocoder(options);

      geocoder.reverse({lat:req.body.lat , lon:req.body.lon }, function(err, req) {
        console.log(req);
      });

    console.log(req.body.lat)
})
app.listen(3000);