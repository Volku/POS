var mysql=require('mysql');
var connection = mysql.createConnection({
    host: '192.168.1.5',
    user:'mypos',
    password:'doge123456789',
    database:'doge_pos'
})

const dynamicAll=(res,req)=>{
    connection.connect()
    let table=req.params.table
    let sql = 'Select * from ' + table;
    console.log(sql)
    connection.query(query,function(err,rows,field){
        if(err) throw(err)
        res.send(rows);
    })
    connection.end()
}

const dynamicIdCall=(res,req)=>{
    connection.connect()
    let table=req.params.table
    let id =req.params.id
    let obj =req.body
    let sql = 'Select * from '+ table + " Where " + obj[0] + '=' + id;
    console.log(sql)
    connection.query(sql,function(err,rows){
        if(err) throw(err)
        res.send(rows)
    })
    connection.end()
}
const dynamicInsert=(res,req)=>{
    connection.connect()
    let obj=req.body;
    let sql = 'Insert into '+ obj.params.table + 'values (' ;
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
    connection.end()
}
const dynamicUpdate=(res,req)=>{
    connection.connect()
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
   connection.end()
}

const dynamicDelete=(res,req)=>{
    connection.connect()
    let obj=req.body
    let sql ='Delete From' + req.params.table +'Where' + `${key}` + `${obj[key]}`
    console.log(sql)
    connection.query(sql,function(err,rows){
        if(err) throw(err)
        console.log(rows)
    })
    connection.end()
}


module.exports={
    dynamicAll,
    dynamicDelete,
    dynamicIdCall,
    dynamicUpdate,
    dynamicInsert
    
}