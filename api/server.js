const express = require("express");
const app = express();
const host = '127.0.0.1'
const port = 7000

var routers = require('./routers')
app.use('/', routers);

app.use((req, res, next) => {
    res.status(404).type('text/plain')
    res.send('Not found/Не найдено')
  })

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
  })  
 
