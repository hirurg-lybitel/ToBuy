var express = require('express');
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";


router.get('/', function(req, res) {
  res.status(200).type('text/plain')
  res.send('Home page');
});

router.get('/goods', function(req, res) {
  res.status(200).type('text/plain')

  const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
  mongoClient.connect(function(err, client){
    
      const db = client.db("database");    
      const collection = db.collection(req.query.name);

      if(err) return console.log(err);
    
      collection.find().sort({"rate":1}).toArray(function(err, results){
                   
          console.log(results);
          
          res.send(results)

          client.close();
      });            
  });    
});

router.get('/groups', function(req, res) {
    res.status(200).type('text/plain')
    res.send('Список групп товаров');
  });

module.exports = router;