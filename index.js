const express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 3333

//Middlewares
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Database connection
let uri = "mongodb+srv://nodebcproject:nodebcproject@cluster0-nh7xg.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Modules
const home = require('./routes/home')
const clawler = require('./routes/clawler')
const adminIndex = require('./routes/admin/index')
const adminCreate = require('./routes/admin/create')
const adminCreatePost = require('./routes/admin/createPost')
const adminUpdate = require('./routes/admin/update')
const adminUpdatePost = require('./routes/admin/updatePost')
const adminDelete = require('./routes/admin/delete')

app.get('/', home)
app.get('/clawler', clawler)
app.get('/admin', adminIndex)
app.get('/admin/create', adminCreate)
app.post('/admin/create', adminCreatePost)
app.get('/admin/update/:id', adminUpdate)
app.post('/admin/update', adminUpdatePost)
app.get('/admin/delete/:id', adminDelete)

app.listen(port, () => console.log(`Running on port ${port}!`))
