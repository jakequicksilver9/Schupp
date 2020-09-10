const express = require('express')
const path = require('path');
const mainController = require('./mainController');
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname,'css')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true   
}))

app.use('/', mainController)



app.listen(process.env.PORT || 3000,() => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`)
})