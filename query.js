const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '103.86.50.169',
    user: 'doge_pos',
    password: 'JRuMykJ3uMtPeoAh',
    database: 'doge_pos'
})
connection.connect()

const selectAll = (table) => (req, res) => {
  let sql = `SELECT * FROM ${table}`
  console.log(sql)
  connection.query(sql, (err, rows, field) => {
    if (err) res.send(err)
    else res.send({
      data: rows
    })
  })
}

const selectByID = (table, primaryKeyName) => (req, res) => {
  let sql = `SELECT * FROM ${table} WHERE ${primaryKeyName} = ${req.params.id}`
  connection.query(sql, (err, rows, field) => {
    if (err) res.send(err)
    else res.send({
      data: rows[0]
    })
  })
}

const insertInto = (table) => (req, res) => {
  let obj = req.body.data
  let sql = `Insert into ${table} `
  let valueString = '('
  let columnString = '('
  Object.keys(obj).forEach((key, i) => {
    if (i == Object.keys(obj).length - 1) {
      columnString += key
      valueString += obj[key]
    }
    else {
      columnString += key + ','
      valueString += obj[key] + ','
    }
  })
  columnString += ')'
  valueString += ')'
  sql += `${columnString} VALUES ${valueString}`
  connection.query(sql, (err, rows) => {
    if (err) res.send(err)
    else res.send({
      data: rows
    })
  })
}

const updateTable = (table, primaryKeyName) => (req, res) => {
  let obj = req.body.data
  let sql = `UPDATE ${table} SET `
  Object.keys(obj).forEach((key, i) => {
    if (i == Object.keys(obj).length - 1) {
      sql += `${key} = ${obj[key]} `
    } else
      sql += `${key} = ${obj[key]}, `
  })
  sql += `Where ${primaryKeyName} = ${req.params.id}`
  connection.query(sql, (err, rows) => {
      if (err) res.send(err)
      else res.send({
        data: rows
      })
  })
}

const deleteByID = (table, primaryKeyName) => (req, res) => {
  const id = req.params.id
  let sql = `DELETE FROM ${table} WHERE ${primaryKeyName} = ${id}`
  connection.query(sql, (err, rows) => {
    if (err) res.send(err)
    else res.send({
      data: rows
    })
  })
}

const staffMVP = (req, res) => { //พนักงานที่ขายของเยอะสุด
    let sql = 'SELECT s.* FROM staffs s join bills b on s.staffNo = b.staffNo join productbills on b.billNo = productbills.billNo GROUP BY b.staffNo HAVING SUM(productbills.price) = ( SELECT MAX(b.num) FROM ( SELECT SUM(price) as "num" FROM bills bi join staffs on bi.staffNo = staffs.staffNo join productbills on productbills.billNo = bi.billNo GROUP BY bi.staffNo ) b )'
    console.log(sql)
    connection.query(sql, function (err, rows) {
        if (err) throw (err)
        res.send(rows)
    })
}

const priceSum = (req, res) => { //For หายอดขายในแต่ละวันหรือวันที่ส่งมา
  let obj = req.body;
  let start = obj.data.start
  let end = obj.data.end
  let sql = "Select SUM(price) FROM productbills pb join bills b on pb.billNo = b.billNo where b.dateOfBill BETWEEN \'"+ start + "\'AND\'" + end+"\'"
  connection.query(sql, (err, rows) => {
      if (err) res.send(err)
      res.send({
        data: rows[0]
      })
  })
}

const productName = (req, res) => {
    let name = req.query.name
    let sql = 'Select * FROM product WHERE productName LIKE ' + `"%${name}%"`
    connection.query(sql, (err, rows) => {
      if (err) res.send(err)
      else res.send({
        data: rows
      })
    })
}

const bestSellid = (req, res) => { //หาที่ขายดีสุดหาตาม id 
    let column = req.params.column
    let id = req.params.id
    let date= req.param.date
    let sql = 'Select p.productNo, p.productName, p.productTypeNo from product p join producttype pt on pt.productTypeNo = p.productTypeNo WHERE EXISTS ( SELECT pb.productNo from productbills pb join bills b on pb.billNo = b.billNo RIGHT join members m on m.memberNo = b.memberNo Right join staffs s on s.staffNo = b.staffNo where' + column + '=' + id + 'and b.dateOfBill LIKE \''  +date+'\' and p.productNo = pb.productNo'
    connection.query(sql, function (err, rows) {
        if (err) throw (err)
        res.send(rows)
    })
}



module.exports = {
  selectAll,
  selectByID,
  insertInto,
  updateTable,
  deleteByID,
  priceSum,
  productName,
  BestSellid
}