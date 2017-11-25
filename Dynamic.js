var mysql=require('mysql');
var connection = mysql.createConnection({
    host: '103.86.50.169',
    user:'doge_pos',
    password:'JRuMykJ3uMtPeoAh',
    database:'doge_pos'
})
connection.connect()
const checkTb = new Map();
checkTb.set('accounts','members','bills','productbills','staffs');
const dynamicAll=(req,res)=>{
    let table=req.params.table
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
        let obj =req.body
        let sql = 'Select * from '+ table + " Where " + obj[0] + '=' + id;
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
    let sql = 'Update '+ obj.params.table + 'set ' ;
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
   
}

const dynamicDelete=(req,res)=>{
  
    let obj=req.body
    let sql ='Delete From' + req.params.table +'Where' + `${key}` + `${obj[key]}`
    console.log(sql)
    connection.query(sql,function(err,rows){
        if(err) throw(err)
        console.log(rows)
    })
   
}


module.exports={
    dynamicAll,
    dynamicDelete,
    dynamicIdCall,
    dynamicUpdate,
    dynamicInsert
    
}