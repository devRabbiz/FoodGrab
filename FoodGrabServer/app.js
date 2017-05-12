var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var models = require('./models/models');
var cors = require('cors'); //prevent cross browser request issues

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

mongoose.connect('mongodb://ajay:ajay@ds137891.mlab.com:37891/foodgrab');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

/* using cors to solve cross browser request limitation*/
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




app.post('/', function(request, response){
    console.log(request.body);      // your JSON
    response.send(request.body);    // echo the result back
});

/* CREATE -  new Order into database*/
app.post('/PlaceOrder', function(req, res){
    console.log(req.body);      // your JSON

    models.Order.create({
      itemId : req.body.itemId,
       name : req.body.name,
        itemQuantity :  req.body.itemQuantity,
         specialInstructions :  req.body.specialInstructions,
          cost :  req.body.cost,
           customerName :  req.body.customerName,
            customerPhone :  req.body.customerPhone,
             customerAddress :  req.body.customerAddress,
              refNumber :  req.body.refNumber

       },function(res,err){
          if(err) console.log('error occured' + err);
    });

  res.send(req.body);    // echo the result back
});

/*RETRIEVE- Order from database*/
app.get('/AllOrders',function(req,res){

  models.Order.find({},function(err,data){
    if (err) console.log('RETRIEVE error' + err);
    //console.log(data);
    res.send(data);
  });


});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
