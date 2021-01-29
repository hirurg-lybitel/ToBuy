// Использование пакета dotenv для чтения переменных из файла .env
require('dotenv').config();

var express = require('express');
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const cors = require('cors');

router.use(express.json());
router.use(cors());

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

    const mongoClient = new MongoClient(process.env.MONGO_URL, {useUnifiedTopology: true});
    
    mongoClient.connect(function(err, client){

      if (err){
        res.status(500);
        res.send(err);

        return;
      }
      
      const db = client.db(process.env.MONGO_DATABASENAME);    
      const collection = db.collection('groups');

      collection.find().toArray(function(err, results){
        res.status(200);
        res.send(results);  
        
        console.log(results);

        client.close();
      })    
    })    
  });


// обновление картинки существующей записи
router.patch('/goods', function(req, res){
  // нужна проверка прав пользователя
  
  // check id
  const id = req.query.rate.toString();

  if (!ObjectId.isValid(id)) {
    console.log(`Invalid id: ${id}`);

    res.status(400)    
    res.send(`Invalid id: ${id}`);
    return;
  }  

  // check body
  const obj = req.body; // Example: {data: ..., contenType: 'image/png'}
  if (isEmptyObject(obj)) { 

    res.status(400)
          
    res.send({"Error":"empty body"});
    
    return;
  }  

  const mongoClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
  mongoClient.connect(function(err, client){

    const db = client.db(process.env.MONGO_DATABASENAME);    
    const collection = db.collection(req.query.name);

    if(err) return console.log(err);    
 
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

  // check collection name 
  const collectionName = req.query.name;

  if (!collectionName) {
    res.status(400);
    res.send({"Error":"Undefined collection name"});

    return;
  }

  // check body
  const objCheck = req.body; 

  if (isEmptyObject(objCheck)) { 

    res.status(400)          
    res.send({"Error":"empty body"});
    
    return;
  }    

  var outputBody = [];

  var obj = [];
  if (!Array.isArray(objCheck)) {
    obj.push(objCheck);
  }
  else{
    obj = objCheck;
  }


  obj.forEach(element => {

    //console.log(obj);
    
    const goodName = element.name;
    const goodRate = element.rate;
    const goodImage = element.image;

    const newDocument = {name: goodName, rate: goodRate, image: goodImage};

    const mongoClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
    

    mongoClient.connect(function(err, client){

      if(err) return console.log(err); 

      const db = client.db(process.env.MONGO_DATABASENAME);    
      const collection = db.collection(collectionName);      
      
      collection.findOneAndUpdate({name:goodName},  {$set:newDocument}, {upsert:true}, function(err, result){
        //console.log(result.ok);
        //console.log('============');
        if (!result) return;
        
        console.log(result);

        outputBody.push(result);

        client.close();   
       });

      
    })        
 })
 res.status(200);
 res.contentType('application/json');      
 res.send(JSON.stringify(outputBody));  
 
 console.log(outputBody);
});


// DELETE http://127.0.0.1:7000/goods?name={наименование}&goodname={наименование}
router.delete('/goods', function(req, res){

  // check collection name 
  const collectionName = req.query.name;

  if (!collectionName) {
    res.status(400);
    res.send({"Error":"Undefined collection name"});

    return;
  }

  // check good name
  const goodName = req.query.goodname.toString(); 

  if (!goodName) {
    res.status(400);
    res.send({"Error":`Invalid good name: ${goodName}`});

    return;
  }
 
  const mongoClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
    
  mongoClient.connect(function(err, client){

    const db = client.db(process.env.MONGO_DATABASENAME);
    const collection = db.collection(collectionName);

    collection.findOneAndDelete({"name":goodName}, function(err, result){

      res.status(200);
      
      if (!result.value) return res.send({});

      res.send(result.value);

      client.close();
    })
  })
})



function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

module.exports = router;
