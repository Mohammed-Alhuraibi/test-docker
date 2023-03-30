const express = require('express')
const mongoose = require('mongoose')
const redis = require('redis')

// init app
const PORT = process.env.PORT || 4000
const app = express();


// connect redis
const REDIS_PORT = 6379
const REDIS_HOST = 'redis'
const redisClient = redis.createClient(
    {url: `redis://${REDIS_HOST}:${REDIS_PORT}`}
);
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connected redis client'));
redisClient.connect();


// connect db 
const DB_USER = 'root'
const DB_PASSWORD = 'example'
const DB_PORT = 27017 
const DB_HOST = 'mongo'
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
mongoose.connect(URI).then(() => console.log("Db mongo connected")).catch( (err) => console.log("mongodb connection error : ", err))

app.get('/',(req,res) => {
    redisClient.set("clientProducts","banana")
    res.send('<h1>Navigate to /data to see ..</h1>')
})
app.get('/data',async (req,res) => {
    const clientProducts = await redisClient.get("clientProducts")
    res.send(`<h1>Navigate to /data to see <h2>my products..${clientProducts}</h2></h1>`)
})



console.log('test')

app.listen(PORT,()=> console.log(`app is up and runing on Port : ${PORT}`))

