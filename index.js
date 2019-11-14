const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var database, collection;

app.get('/', (req, res, next) => {
    res.status(200)
    res.json({ message: 'Welcome to our app :)'});
  });

app.post('/users', (req,res) =>{

    collection.findOne({ "idnumber": parseInt(req.body.idnumber) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }

        if(result){
            res.status(400)
            res.json({ message: 'A user has been created with that number'});
        }else{
            collection.insertOne(req.body, (err, result) => {
                if(err) {
                    return res.status(500).send(error);
                }
                res.status(201)
                res.json({message:'A new user has been created', user: result.ops[0]});
            });
        }
    });
});

app.get('/users', (req,res) =>{
    collection.find({}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        if(result.length==0){
           
           return res.json({ message: 'La lista de usuarios aún está vacía'});
        }
        res.status(200)
        res.json({message:'A list of all users', users: result});
    });
});
//Cualquier get que se le haga a una ruta que no exista va a devolver un 200 y va a redirigir a la pagina principal
//..
app.get("*", (req, res) => res.redirect("/"));

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');     
    MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-nkmvd.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true},(error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(process.env.MONGO_DB);
        collection = database.collection(process.env.MONGO_COLLECTION);
        console.log("Connected to `" + database + "`!");
    });
});

module.exports = app; 