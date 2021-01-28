// Использование пакета dotenv для чтения переменных из файла .env
require('dotenv/config');

var express = require('express');
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

router.use(express.json());

router.get('/', function(req, res) {
  res.status(200).type('text/plain')
  res.send('Home page');
});

router.get('/goods', function(req, res) {
  res.status(200).type('text/plain')

  const mongoClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
  mongoClient.connect(function(err, client){
    
      const db = client.db(process.env.MONGO_DATABASENAME);    
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


// обновление картинки существующей записи
router.patch('/goods', function(req, res){
  // нужна проверка прав пользователя

  const mongoClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
  mongoClient.connect(function(err, client){

    const db = client.db(process.env.MONGO_DATABASENAME);    
    const collection = db.collection(req.query.name);

    if(err) return console.log(err);    

    const id = req.query.rate.toString();

    // check id
    if (!ObjectId.isValid(id)) {
      console.log(`Invalid id: ${id}`);
      res.send(`Invalid id: ${id}`);
    }

    var obj = req.body; // Example: {data: ..., contenType: 'image/png'}

    // check body
    if (isEmptyObject(obj)) { 

      res.status(200).type('text/plain')
            
      res.send({"Error":"empty body"});
      
      return;
    }
 
    collection.updateOne({"_id": ObjectId(id)}, {$set:{"image":obj}}, function(err, opRes){

      res.status(200).type('text/plain')
      res.send(opRes.result);
      client.close();     
    })
    
  })
})

// добавление новой записи
router.post('/goods', function(req, res){
  // нужна проверка прав пользователя

})


function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

module.exports = router;
