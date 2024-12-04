const express = require('express');
const morgan = require('morgan');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const app = express();

//app configuration
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//const mongUri = 'mongodb+srv://admin:admin@cozy-crochet.fcuxe.mongodb.net/cozy_crochet?retryWrites=true&w=majority&appName=cozy-crochet'

// connect to database
mongoose.connect('mongodb+srv://admin:admin@cozy-crochet.fcuxe.mongodb.net/project4?retryWrites=true&w=majority&appName=cozy-crochet')
.then(()=>{
    app.listen(port, host, () =>{ 
        console.log('Server is running on port', port);
    });
})
.catch(err => console.log('Database connection error:', err.message));

//middleware
app.use(
    session({
        secret: 'skdjbvewfbofbuwdojcberof',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({mongoUrl: 'mongodb+srv://admin:admin@cozy-crochet.fcuxe.mongodb.net/project4?retryWrites=true&w=majority&appName=cozy-crochet'}),
        cookie: {maxAge: 60*60*1000   } 
    })
);
app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method')); 


//route setup
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/items', itemRoutes);

app.use('/users', userRoutes); 
  
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");;
    }
    res.status(err.status);
    res.render('error', {error: err});
});

