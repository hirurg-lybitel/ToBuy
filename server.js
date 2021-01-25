

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });


const express = require("express");
const app = express();
const host = '127.0.0.1'
const port = 7000

app.get('/goods', (req, res) => {

    mongoClient.connect(function(err, client){
      
        const db = client.db("database");    
        const collection = db.collection(req.query.name);

        if(err) return console.log(err);
      
        collection.find().sort({"rate":1}).toArray(function(err, results){
                     
            console.log(results);

            res.status(200).type('text/plain')
            res.send(results)

            client.close();
        });        
    

    });        
  })

  app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
  })  
 
