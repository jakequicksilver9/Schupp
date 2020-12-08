const express = require('express')
const path = require('path')
const mainController = require('./controllers/mainController')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const redis = require('redis')
const redisStore = require('connect-redis')(session)
// const client  = redis.createClient()

// Add your cache name and access key.
// const client = redis.createClient({auth_pass: 'H7bqPJhCsgNQnntepaquDh8vUpp0laaRyQTnl32u3Wc=', host: 'schuppdev.redis.cache.windows.net', port: 6380,ttl : 260})
var client = redis.createClient(6380, 'schuppdev.redis.cache.windows.net', {auth_pass: 'H7bqPJhCsgNQnntepaquDh8vUpp0laaRyQTnl32u3Wc=', tls: {servername: 'schuppdev.redis.cache.windows.net'}})

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname,'css')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.set('view engine', 'ejs')

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.use(session({
    secret: 'ssshhhhh',
    store: new redisStore({ host: 'schuppdev.redis.cache.windows.net', port: 6380, client: client,tls: {servername: 'schuppdev.redis.cache.windows.net'}}),
    saveUninitialized: false,
    resave: false
}))

app.use('/', mainController)



app.listen(process.env.PORT || 3000,() => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`)
})