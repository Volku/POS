var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
app.use(cors())
app.use(bodyParser.json())

const query = require('./query')

app.use((req, res, next) => {
  console.log('new connection: ' + new Date())
  next()
})

app.get('/product', (req, res) => {
  console.log(req.query.name)
  if(req.query.name == undefined) {
    query.selectAll('product')(req, res)
  } else {
    query.productName(req, res)
  }
})
app.get('/product/:id', query.selectByID('product', 'productNo'))
app.post('/product', query.insertInto('product'))
app.patch('/product/:id', query.updateTable('product', 'productNo'))
app.delete('/product/:id', query.deleteByID('product', 'productNo'))

app.get('/staffs', query.selectAll('staffs'))
app.get('/staffs/:id', query.selectByID('staffs', 'staffNo'))
app.post('/staffs', query.insertInto('staffs'))
app.patch('/staffs/:id', query.updateTable('staffs', 'staffNo'))
app.delete('/staffs/:id', query.deleteByID('staffs', 'staffNo'))

app.get('/producttype', query.selectAll('producttype'))
app.get('/producttype/:id', query.selectByID('producttype', 'productTypeNo'))
app.post('/producttype', query.insertInto('producttype'))
app.patch('/producttype/:id', query.updateTable('producttype', 'productTypeNo'))
app.delete('/producttype/:id', query.deleteByID('producttype', 'productTypeNo'))

app.get('/productbill', query.selectAll('productbill'))
app.get('/productbill/:id', query.selectByID('productbill', 'productBillNo'))
app.post('/productbill', query.insertInto('productbill'))
app.patch('/productbill/:id', query.updateTable('productbill', 'productBillNo'))
app.delete('/productbill/:id', query.deleteByID('productbill', 'productBillNo'))

app.get('/members', query.selectAll('members'))
app.get('/members/:id', query.selectByID('members', 'memberNo'))
app.post('/members', query.insertInto('members'))
app.patch('/members/:id', query.updateTable('members', 'memberNo'))
app.delete('/members/:id', query.deleteByID('members', 'memberNo'))

app.get('/bills', query.selectAll('bills'))
app.get('/bills/:id', query.selectByID('bills', 'billNo'))
app.post('/bills', query.insertInto('bills'))
app.patch('/bills/:id', query.updateTable('bills', 'billNo'))
app.delete('/bills/:id', query.deleteByID('bills', 'billNo'))

app.get('/accounts', query.selectAll('accounts'))
app.get('/accounts/:id', query.selectByID('accounts', 'accountNo'))
app.post('/accounts', query.insertInto('accounts'))
app.patch('/accounts/:id', query.updateTable('accounts', 'accountNo'))
app.delete('/accounts/:id', query.deleteByID('accounts', 'accountNo'))

app.post('/report/totalsale/day', query.priceSum)
app.get('/:column/:id/:date', query.BestSellid)
// app.get('/staffMVP/method', dynamic.staffMVP)
// app.get('/product', dynamic.productName)

app.listen(9000)
console.log('listen on 9000')