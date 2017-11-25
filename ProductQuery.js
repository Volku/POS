/*var mysql=require('mysql');
var express=require('express')
var connection = mysql.createConnection({
    host: '192.168.1.5',
    user:'mypos',
    password:'doge123456789',
    database:'doge_pos'
})



const arrowDbc = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Members', function (err, rows, fields) {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

const proAll = (req, res) => {
  connection.connect()
  connection.query('SELECT * FROM Product ', 
    function (err, rows, fields) {
      if (err) throw err
      res.send(rows);
      /*res.json({
        data: rows
      })
   // }
    // else resolve(rows)
  )
  connection.end()
}
const proIdDbc = (req, res) => {
  connection.connect()
  let id = req.params.id
  connection.query('SELECT * FROM Product Where productNo = ' + id, 
    function (err, rows, fields) {
      if (err) throw err
      res.send(rows);
      /*res.json({
        data: rows
      })
    }
    // else resolve(rows)

  )
  connection.end()
}
/*const proCreate= (req, res) => {
  
  connection.query('Insert  FROM Product Where id = ' + id, 
    function (err, rows, fields) {
      if (err) throw err
      res.send(rows);
      res.json({
        data: rows
      })
    }
    // else resolve(rows)
  )
}

const proDel=(req,res) =>{
  connection.connect()
  let id=req.params.id;
  connection.query('Delete FROM Product Where productNo='+ id ,
    function (err,result){
      if(err) throw err
      console.log(rows)
    })
  connection.end()
}

const proInsert=(req, res) =>{
  connection.connect();
  let obj = req.body;
  connection.query('Insert INTO Product values (' + (obj.ProductId) +','+(obj.productName)+','+(obj.quantity)+',' +( obj.price)+')',function(err,results){
      if(err) throw(err)
      console.log("Number of affact row: "+ resutlt)
  })
  connection.end()
}

const proUpdate=(req, res) =>{
  connection.connect();
  let obj = req.body;
  connection.query('Update SET,function(err,)',function (err,results){
      if(err) throw(err)
      console.log("Number of affact row: " + result)
  })
}
module.exports={ 
  arrowDbc,
  proIdDbc,
  proDel,
  proAll,
  proInsert,
  proUpdate
}*/