var mysql=require('mysql');
var connection = mysql.createConnection({
    host: '103.86.50.169',
    user:'doge_pos',
    password:'JRuMykJ3uMtPeoAh',
    database:'doge_pos'
})
connection.connect()
const checkTb = new Map();
checkTb.set('products','products');
checkTb.set('accounts','accounts');
checkTb.set('staffs','staffs');
checkTb.set('productbills','productbills')
checkTb.set('bills','bills')
checkTb.set('members','members')
const dynamicAll=(req,res)=>{
    let table=req.params.table
    console.log(table)
    console.log(checkTb.has(table))
    if(checkTb.has(table)){
        let sql = 'Select * from ' + table;
        console.log(sql)
        connection.query(sql,function(err,rows,field){
            if(err) throw(err)
            res.send(rows);
        })
    }else
    res.send('No such table')
}

const dynamicIdCall=(req,res)=>{
    let table=req.params.table
    if(checkTb.has(table)){
        let id =req.params.id
        let condition =req.params.condition
        let sql = 'Select * from '+ table + " Where " + condition + '=' + id;
        console.log(sql)
        connection.query(sql,function(err,rows){
            if(err) throw(err)
            res.send(rows)
        })
    }else
        res.send('No such table')
}
const dynamicInsert=(req,res)=>{
    let obj=req.body;
    let table = obj.params.table
    
    if(checkTb.has(table)){
        let sql = 'Insert into '+ table + 'values (' ;
        Object.keys(obj).forEach((key,i) => {
            if (i == Object.key(obj).length -1)
                sql+=`${obj[key]}`
            else
                sql+=`${obj[key]}`+","

        })
        sql+=')'
        console.log(sql)
        connection.query(sql,function(err,rows){
            if(err) throw(err)
            console.log(rows);
        })    
    }else
        res.send('No such table')
}
const dynamicUpdate=(req,res)=>{
   
    let obj=req.body.data
    let table=obj.params.table
    if(checkTb.has(table)){
        let sql = 'Update '+ table + 'set ' ;
        Object.keys(obj).forEach((key,i) => {
            if (i == Object.key(obj).length -2){
                sql+=`${key}`+'='+ `${obj[key]}` +','
            }else if(i == Object.keys(obj).length-1){
                sql+=`Where ${key} ${obj[key]}`
            }else
                sql+=`${key}`+'='+ `${obj[key]}`

        })
        //sql += `Where ${req.body.id}`
        console.log(sql)
    connection.query(sql,function(err,rows){
        if(err) throw(err)
            console.log(rows)
    })
    }else
        res.send('No such table')
}

const dynamicDelete=(req,res)=>{
  
    let obj=req.body
    let table = obj.params.data
    if(checkTb.has(table)){
        let sql ='Delete From' + req.params.table +'Where' + `${key} = ${obj[key]}`
        console.log(sql)
        connection.query(sql,function(err,rows){
            if(err) throw(err)
            console.log(rows)
        })
    }else
        res.send('Nosuchtable')
}

const staffMVP=(req,res)=>{ //พนักงานที่ขายของเยอะสุด
    let sql ='SELECT s.* FROM staffs s join bills b on s.staffNo=b.staffs_staffNo join productbills on bills_billNo=productbills.billNoGROUP BY staffNo HAVING SUM(price) =  (SELECT MAX(b.num) FROM (SELECT SUM(price) as "num" FROM bills join staffs on bills.staffs_staffNo =staffs.staffNo join productbills on productbills.bills_billNo = bills.billNo GROUP BY staffNo) b  )'
    console.log(sql)
    connection.query(sql,function(err,rows){
        if(err) throw(err)
        res.send(rows)
    })
}

const priceSum=(req,res)=>{//For หายอดขายในแต่ละวันหรือวันที่ส่งมา
    let obj = req.body;
    let start = obj.body.data.start
    let end = obj.body.data.end
    let sql = "SELECT SUM(price) FROM productbills pb join bills b on pb.BILLS_billNo=b.billNo WHERE b.dateOfBill ="+ start + " BETWEEN " + end 
    console.log(sql)
    connection.query(sql,function(err,rows){
        if(err) throw(err)
        res.send(rows)
    }) 
}

const productName=(req,res)=>{
    let name = res.query.name
    let sql ='Select * FROM products WHERE productName ='+ name
    connection.query(sql,function(err,rows){
        if(err) throw(err)
        res.send(rows)
    }) 
}

const BestSellid=(req,res)=>{//หาที่ขายดีสุดหาตาม id 
    let table = req.params.table
    let id = req.params.id
    let sql = 'Select productName from products p join productBills pb on p.productNo = pb.productBills_productNo join bills b on b.billNo=pb.bills_billNo full join staffs s on s.staffNo = b.staffs_staffNo full join members m on m.memberNo = b.members_memberNo join producttypes pt on pt.productTypeNo = p.productTypes_productTypeNo WHERE '+ table + '=' + id +'And b.dateOfBill = ' + req.params.date  
    connection.query(sql,function(err,rows){
        if(err) throw(err)
        res.send(rows)
    }) 
}

module.exports={
    dynamicAll,
    dynamicDelete,
    dynamicIdCall,
    dynamicUpdate,
    dynamicInsert,
    staffMVP,
    productName
    
}