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

/** получить список товаров по имени группы */
/** GET http://127.0.0.1:7000/goods?name={наименование группы}&id={id} */
router.get('/goods', function(req, res) {  

  const groupName = req.query.name;
  if (!groupName) {
    res.status(400);
    res.send({"Error":"Undefined group name"});

    return;
  }    

  let filter = {};
  const goodId = req.query.id;
  if (ObjectId.isValid(goodId)) {
    console.log(`Valid id: ${goodId}`);

    filter = {_id:ObjectId(goodId)};
  }      

  const mongoClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
  mongoClient.connect(function(err, client){
    
      const db = client.db(process.env.MONGO_DATABASENAME);    
      const collection = db.collection(req.query.name);

      if(err) return console.log(err);
    
      collection.find(filter).sort({"rate":1}).toArray(function(err, results){                       
          
          res.status(200).type('text/plain')
          res.send(results)

          client.close();
      });            
  });    
});

/** получить список групп */
/** GET http://127.0.0.1:7000/groups */
router.get('/groups', function(req, res) {  

  let filter = {};
  const groupId = req.query.id;
  if (ObjectId.isValid(groupId)) {
    console.log(`Valid id: ${groupId}`);

    filter = {_id:ObjectId(groupId)};
  }        

    const mongoClient = new MongoClient(process.env.MONGO_URL, {useUnifiedTopology: true});
    
    mongoClient.connect(function(err, client){

      if (err){
        res.status(500);
        res.send(err);

        return;
      }
      
      const db = client.db(process.env.MONGO_DATABASENAME);    
      const collection = db.collection('groups');

      collection.find(filter).toArray(function(err, results){
        res.status(200);
        res.send(results);  
        
        console.log(results);

        client.close();
      })    
    })    
  });


/** обновление информации по товару */
/** PATCH http://127.0.0.1:7000/goods?name={наименование группы}&id={id} */
router.patch('/goods', function(req, res){
  // нужна проверка прав пользователя
  
  // check id
  const id = req.query.id.toString();

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

/** добавление товара(нескольких товаров) */
/** POST http://127.0.0.1:7000/goods?name={наименование группы} */
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
        if (!result) {
          res.status(400);          
          return;
        }          
        outputBody.push(result.value);

        res.status(200);
        res.contentType('application/json');      
        res.send(JSON.stringify(outputBody)); 
      
        client.close();   
       });      
    })        
 })
});


/** удаление товара */
/** DELETE http://127.0.0.1:7000/goods?name={наименование}&id={id товара} */
router.delete('/goods', function(req, res){

  // check collection name 
  const collectionName = req.query.name;

  if (!collectionName) {
    res.status(400);
    res.send({"Error":"Undefined collection name"});

    return;
  }

 
  const goodID = req.query.id; 
  if (!ObjectId.isValid(goodID)) {
    res.status(400);
    res.send({"Error":`Invalid good ID: ${goodID}`});

    return;
  }
 
  const mongoClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
    
  mongoClient.connect(function(err, client){

    const db = client.db(process.env.MONGO_DATABASENAME);
    const collection = db.collection(collectionName);

    collection.findOneAndDelete({"_id":ObjectId(goodID)}, function(err, result){

            
      if (!result.value) {
        res.status(400);
        return res.send({});
      }

      res.status(200);
      res.send(result.value);

      client.close();
    })
  })
})

/** добавление группы товаров */
router.post('/groups', function(req ,res){
  const collectionName = "groups";

  const groupName = req.query.name;
  if (!groupName) {
    res.status(400);
    res.send({"Error":"Undefined group name"});

    return;
  }    

  let filter = {name:groupName};
  // если в запросе есть id, то ищем по id 
  const groupID = req.query.id;
  if (ObjectId.isValid(groupID)) {
    filter = {"_id":ObjectId(groupID)};
  }    

  const mongoClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
  
  mongoClient.connect(function(err, client){
    if(err) {
      res.status(400);
      res.send({"Error": err});

      return console.log(err); 
    } 

    const db = client.db(process.env.MONGO_DATABASENAME);    
    const collection = db.collection(collectionName);  

    const newDocument = {name: groupName, displayName:groupName};
    
    collection.updateOne(filter,  {$set:newDocument}, {upsert:true}, function(err, result){
            
      if(err) {
        res.status(400);
        res.send({"Error": err});
  
        return console.log(err); 
      } 

      if (!result) return;                   

      collection.findOne(filter, function(err, result){       

        res.status(200);
        res.send(result);

        client.close();   
      })
                        
     });
  })
})


/** удаление группы */
router.delete('/groups', function(req, res){
  // check collection name 
  const collectionName = "groups";
  if (!collectionName) {
    res.status(400);
    res.send({"Error":"Undefined collection name"});

    return;
  }
  
  const groupID = req.query.id; 
  if (!ObjectId.isValid(groupID)) {
    console.log({"Error":`Invalid group id: ${groupID}`});

    res.status(400)    
    res.send({"Error":`Invalid group id: ${groupID}`});
    return;
  }    

  const mongoClient = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });

  mongoClient.connect(function(err, client){
    if(err) {
      res.status(400);
      res.send({"Error": err});

      return console.log(err); 
    } 

    const db = client.db(process.env.MONGO_DATABASENAME);
    const collection = db.collection(collectionName);

    collection.findOneAndDelete({"_id":ObjectId(groupID)}, function(err, result){
      if(err) {
        res.status(400);
        res.send({"Error": err});
  
        return console.log(err); 
      };

      res.status(200);
      res.send(result);      

      client.close();      
    });
  });
});

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

module.exports = router;