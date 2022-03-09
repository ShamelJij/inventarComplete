const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
    auth: {
        user:'admin',
        password: '123456'
    }
});

const dbName = 'mytest';
const viewUrl = '_design/location/_view/location-view';

couch.listDatabases().then(function (dbs){
    console.log(dbs);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res){
    couch.get(dbName, viewUrl).then(
        function (data, headers, status){
            console.log(data.data.rows);
            res.render('index', {
                mytest:data.data.rows
            });
        },
        function (err){
            res.send(err);
        });
});
//Problem
app.post('/location/add',function (req,res){
   const locationname = req.body.locationname;
   const locationlabel = req.body.locationlabel;
   const locationstreet = req.body.locationstreet;
   const housenumber = req.body.housenumber;
   const zipcode = req.body.zipcode;
   const floornumber = req.body.floornumber;
   const roomnumber = req.body.roomnumber;
   const form = 'location';
   req.body.form = form;

   couch.uniqid().then(function (ids){
       const id = ids[0];

       couch.insert(dbName, {
           _id: id,
           locationname: locationname,
           locationlabel: locationlabel,
           locationstreet: locationstreet,
           housenumber: housenumber,
           zipcode: zipcode,
           floornumber: floornumber,
           roomnumber: roomnumber,
           form: form
       }).then(
           function (data, headers, status){
                res.redirect('/');
           },
           function (err){
               res.send(err);
           });
   });
});
app.post('/location/delete/:id', function (req,res){
    const id = req.params.id;
    const rev = req.body.rev;

    couch.del(dbName, id, rev).then(
        function (data, headers, status){
            res.redirect('/');
        },
        function (err){
            res.send(err);
        });
});
app.listen(3000, function (){
    console.log('server started on port 3000');

});
//dieses App hat kein Update
