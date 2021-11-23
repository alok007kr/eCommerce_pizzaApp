
require('dotenv').config()
// we Need to Create a server at starting using express or node. we will create here using express
const express = require('express')

// Now we create app variable and we can store the express values.
const app = express()

// we will install ejs express and express-ejs-layouts.
const ejs =  require('ejs')
const expressLayouts = require('express-ejs-layouts')

const path = require('path')

// Now we require mongoose to connect mongodb database and js file.
const mongoose = require('mongoose')
const { Server } = require('http')

//now we require express-session
const session = require('express-session')

// Now we require express-flash
const flash = require('express-flash')

const MongoDbStore = require('connect-mongodb-session')(session);

//passport and passport-local require..
const passport = require('passport')
//Here we will do database connection.
//SAME CODE WHEN WE CONNECT MONGODB TO JS FILES . here below pizza is our database name>>
const url = 'mongodb://localhost/pizza';
mongoose.connect(url);

//{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true,
//    useFindAndModify:true}

 
mongoose.connection
    .once('open', function(){
        console.log('mongodb running');
    })
    .on('error', function(err){
        console.log(err);
    });
    

//session store
let mongoStore = new MongoDbStore({
                 uri: url,
                 collection: 'mySessions'
});    

// NOW WE WILL CONFIG OUR SESSION:
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge :1000 * 60 * 60 * 24} // 24 hours
})) 

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash()) 


// we will create or set available PORT here.
const PORT = process.env.PORT || 3100  //This will give either default port or 3100 as port.

// Here we set the file from which it will show in the browser.
app.use(express.static('public'))

// HERE we do to receive the different types of data in our express.
app.use(express.urlencoded({ extended : false}))
app.use(express.json())

//NOTE: at starting we will keep our routes above from the layout.
// But when we will create layout the we will keep our layout above from routes.

// here we will set the output value of express using app variable.
//app.get('/', (req,res) => {
//    res.render('home')

//})

//Here we will  create another route or /cart page to link other page..
//app.get('/cart',(req,res) => {
//    res.render('customer/cart')
//})

// Global Middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// set template engine ejs and express-ejs-layouts.
app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

//NOTE: After creating our layout we will keep our routes below from layout.

//OUR ROUTES are here..
//app.get('/', (req,res) => {
//
 //   res.render('home')
    
//})

//app.get('/cart',(req,res) => {
//    res.render('customer/cart')
//})

//app.get('/login',(req,res) => {
//    res.render('auth/login')
//})

//app.get('/register',(req,res) => {
//    res.render('auth/register')
//})

// Now we move our routes to routes folder because if we keep
// many routes in server.js file than it create confusion
require('./routes/web')(app)



// Here we make or check either our port is working or not.

app.listen(PORT, () => {
    console.log(`listening to the port ${PORT}`)
})

