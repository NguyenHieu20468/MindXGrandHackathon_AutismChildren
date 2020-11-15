var express = require('express');
var app = express();
var cors = require('cors')
app.listen(process.env.PORT || 1234);

//template engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public')); //say that all file in public is static, dont compile
app.use('/public', express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('express-session');
app.use(session({ secret: '123456' }));
app.use(cors())
app.use((req, resp, next) => {
    resp.locals.session = req.session;
    next();
});

//controller
app.use('/', require('./controllers/parent.js'));
