const mysql = require('mariasql');
const connection = new mysql({
  host: '103.86.50.169',
  user: 'doge_pos',
  password: 'JRuMykJ3uMtPeoAh',
  db: 'doge_pos',
  charset: 'utf8'
})
connection.connect()

const selectAll = (table) => (req, res) => {
  let sql = `SELECT * FROM ${table}`
  connection.query(sql, (err, rows, field) => {
    if (err) { 
      res.status(400)
      res.send(err)
    }
    else res.send({
      data: rows
    })
  })
}

const selectByID = (table, primaryKeyName) => (req, res) => {
  let sql = `SELECT * FROM ${table} WHERE ${primaryKeyName} = ${req.params.id}`
  connection.query(sql, (err, rows, field) => {
    if (err) {
      res.status(400)
      res.send(err)
    }
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
    if (err) {
      res.status(400)
      res.send(err)
    }
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
    if (err) {
      res.status(400)
      res.send(err)
    }
    else res.send({
      data: rows
    })
  })
}

const deleteByID = (table, primaryKeyName) => (req, res) => {
  const id = req.params.id
  let sql = `DELETE FROM ${table} WHERE ${primaryKeyName} = ${id}`
  connection.query(sql, (err, rows) => {
    if (err) {
      res.status(400)
      res.send(err)
    }
    else res.send({
      data: rows
    })
  })
}

const staffMVP = (req, res) => { //พนักงานที่ขายของเยอะสุด
    let sql = 'SELECT s.* FROM staffs s join bills b on s.staffNo=b.staffs_staffNo join productbills on bills_billNo=productbills.billNoGROUP BY staffNo HAVING SUM(price) =  (SELECT MAX(b.num) FROM (SELECT SUM(price) as "num" FROM bills join staffs on bills.staffs_staffNo =staffs.staffNo join productbills on productbills.bills_billNo = bills.billNo GROUP BY staffNo) b  )'
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
  let sql = "SELECT SUM(price) AS 'total' FROM productbills pb join bills b on pb.BILLS_billNo=b.billNo WHERE b.dateOfBill BETWEEN \"" + start + "\" AND \"" + end + "\""
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

const BestSellid = (req, res) => { //หาที่ขายดีสุดหาตาม id 
    let table = req.params.table
    let id = req.params.id
    let sql = 'Select productName from products p join productBills pb on p.productNo = pb.productBills_productNo join bills b on b.billNo=pb.bills_billNo full join staffs s on s.staffNo = b.staffs_staffNo full join members m on m.memberNo = b.members_memberNo join producttypes pt on pt.productTypeNo = p.productTypes_productTypeNo WHERE ' + table + '=' + id + 'And b.dateOfBill = ' + req.params.date
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
  productName
}