const express = require('express');
const port = 3003;
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts'); 
const app = express();

app.use(express.static(path.join(__dirname,'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')

app.use(cookieParser());

app.use(expressLayouts); 

//Load routes
//General routes
const indexRoute = require('./routes/index-route')
app.get('/', indexRoute);

const loginRoute = require('./routes/login-route')
app.get('/login', loginRoute);

const myProfileRoute = require('./routes/myProfile-route')
app.get('/myProfile', myProfileRoute);

//User routes
const addUserRoute = require('./routes/user/addUser-route')
app.get('/addUser', addUserRoute);

const editUserRoute = require('./routes/user/editUser-route')
app.get('/editUser', editUserRoute);

const menuUserRoute = require('./routes/user/menuUser-route')
app.get('/menuUser', menuUserRoute);

//Product routes
const addProductRoute = require('./routes/product/addProduct-route')
app.get('/addProduct', addProductRoute);

const editProductRoute = require('./routes/product/editProduct-route')
app.get('/editProduct', editProductRoute);

const listProductRoute = require('./routes/product/listProduct-route')
app.get('/listProduct', listProductRoute);

//Sale routes
const addSaleRoute = require('./routes/sale/addSale-route')
app.get('/addSale', addSaleRoute);

const detailSaleRoute = require('./routes/sale/detailSale-route')
app.get('/detailSale', detailSaleRoute);

const listSaleRoute = require('./routes/sale/listSale-route')
app.get('/listSale', listSaleRoute);



//404
app.use((req, res, next)=>{
  next(createError(404))
})

//error handler
app.use((err, req, res, next)=>{
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status ||500)
  res.render('error')
})

app.listen(port, err =>{
console.log(`Server is listening on ${port}`)
})