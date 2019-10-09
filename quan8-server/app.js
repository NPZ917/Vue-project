var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user.js');
var categoryRouter = require('./routes/category.js');
var productRouter = require('./routes/product.js');
var cartRouter = require('./routes/cart.js');
var addressRouter = require('./routes/address.js');

var httpResult = require('./config');
var Token = require('./utils/token.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// token验证
app.use(/\/cart|\/address/, Token.check);

app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/address', addressRouter);


// 统一将动态数据请求进行响应返回
app.use(function (req, res, next) {
    if (res.myPromise) {
        res.myPromise
            // result = {status:??, data: ??, message:??}
            .then(result => res.send(result))
            // .then(res.send)
            .catch(err => res.send(httpResult.error(err.message)));
    } else next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;