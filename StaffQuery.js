var mysql=require('mysql');
var connection = mysql.createConnection({
    host: '192.168.1.5',
    user:'mypos',
    password:'doge123456789',
    database:'doge_pos'
})



const staffIdDbc = (req, res) => {
    connection.connect()
    let id = req.params.id
    connection.query('SELECT * FROM Staff Where staffNo = ' + id, 
      function (err, rows, fields) {
        if (err) throw err
        res.send(rows);
        /*res.json({
          data: rows
        })*/
      }
    )
    connection.end()
  }

  const staffAllDbc = (req, res) => {
    connection.connect()
    connection.query('SELECT * FROM Staff ', 
      function (err, rows, fields) {
        if (err) throw err
        res.send(rows);
        /*res.json({
          data: rows
        })*/
      }
    )
    connection.end()
  }

  const staffDel=(req,res) =>{
    connection.connect()
    let id=req.params.id;
    connection.query('Delete FROM Staff Where staffNo ='+ id ,
      function (err,rows){
        if(err) throw err
        console.log(rows)
      })
    connection.end();
  }

  const staffInsert=(req, res) =>{
    connection.connect();
    let obj = req.body;
    connection.query('Insert INTO Staff values (' + (obj.staffNo) +','+(objfirstname)+','+(obj.lastname)+',' +( obj.sex)+','+(obj.telNo)+','+(obj.citizenID)+','+(obj.passportID)+','+(obj.address)+','+(obj.points)+')',function(err,rows){
        if(err) throw(err)
        console.log(rows)
    })
    connection.end()
  }
  const staffUpdate=(req, res) =>{
    connection.connect()
    let obj = req.body;
    connection.query('UPDATE STAFF SET ('req.body[0] ') ' ,function(err,rows,fields){
        if(err) throw(err)
    })
    connection.end()    
  }

  module.exports={
      staffAllDbc,
      staffDel,
      staffIdDbc,
      staffInsert
  }