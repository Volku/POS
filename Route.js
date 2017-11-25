var express = require('express')
//var eieiHandler = require('./controllers/eieiHandler')
var bodyParser=require('body-parser')
var pconBuild =require('./ProductQuery')
var dynamic=require('./Dynamic')
var app=express()
/*app.use('/',function(req, res, next){
    res.json({DS: 'close'});
    next();
})*/
//app.use(bodyParser.json());
//app.post('/product',pconBuild.proAll)
//app.get('/',function(req,res){
    
    //es.send('LOL')
//})

//pp.post('/',function(req,res){
    //res.send('POST request to the homepage')
//)


app.get('/:table',dynamic.dynamicAll)
app.get('/:table/:id',dynamic.dynamicIdCall)
app.post('/:table',dynamic.dynamicInsert)
app.patch('/:table/:id',dynamic.dynamicUpdate)
app.delete('/:table/:id',dynamic.dynamicDelete)


app.listen(9000)