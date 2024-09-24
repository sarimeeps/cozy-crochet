const express = require('express');
const morgan = require('morgan');
const itemRoutes = require('./routes/itemRoutes.js');

const app = express();

//app configuration
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));


//route setup
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/items', itemRoutes);

app.listen(port, host, () =>{
    console.log('Server is running on port', port);
});