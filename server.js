var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


var fs = require("fs");
var file = "addressbook.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var addressbook = new sqlite3.Database(file);

var engine = require('ejs-mate');
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

var path = __dirname + '/views/';

app.get('/', function (req,res){
  res.sendFile(path + "index.html");
});


app.get('/createperson', function (req, res) {
  res.sendFile(path + "createperson.html");

});

app.post('/createperson', function(req, res) {
    console.log(req.body);

    addressbook.serialize(function() {
      addressbook.run('INSERT INTO addressbook (prenom, nom, telephone, courriel) VALUES (?,?,?,?)',[req.body.prenom, req.body.nom,req.body.telephone, req.body.courriel]);
      console.log("YEAJHHHH")
    });


    res.redirect('/carnet')
})


app.get('/carnet', function(req, res) {
    console.log(req.body);
    addressbook.all("SELECT prenom, nom, telephone, courriel FROM addressbook", function(err, person) {
      console.log(person);
       res.render("carnet", {person});
    });

})

app.get('/carnet/:sorting', function(req, res) {
    console.log(req.params.sorting);
    addressbook.all("SELECT prenom, nom, telephone, courriel FROM addressbook ORDER BY " + req.params.sorting, function(err, person) {
      console.log(person);
       res.render("carnet", {person});
    });

})




app.listen(3000, function () {
  console.log('Ready');
});
