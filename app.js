var express=require('express');
var mysql=require('mysql');
var app=express();
var bodyParser=require('body-parser');
var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'wedisegid',
  database:'todos'
});

 //weather the connection to database was succesfull or not
 connection.connect(function(error){
  if(!!error){
    console.log('Error');
  }else{
    console.log('connected');
  }
})

//get todos
app.get('/todo',function(req,res){
  connection.query('select * from todos',function(error,row,fields){
    if(!!error){
      console.log('error in query')
    }else{
       console.log('succesfully connected');
       console.log(row);
       res.json(row);
    }
  });
});

//insert to todos
 app.post('/todo',function(request,response){
   var itemUpdate = { name: 'Eat dinner', done: 1 };
   connection.query('INSERT INTO todos SET ?', itemUpdate, function(err,res){
   if(err) throw err;
    console.log('task inserted succesfully');
    response.send(itemUpdate);
  });
 });

//update todos
 app.put('/todo',function(request,response){
  connection.query(
  'UPDATE todos SET name = ? Where id = ?',
  ["Eat dinner then sleep", 32],
  function (err, result) {
    if (err) throw err;
     console.log('Changed ' + result.changedRows + ' rows');
    response.send('Changed ' + result.changedRows + ' rows');
   }
  );
});

 //delete from todos
 app.delete('/todo',function(request,response){
   connection.query(
  'DELETE FROM todos WHERE id = ?',
  [26],
  function (err, result) {
    if (err) throw err;

    console.log('Deleted ' + result.affectedRows + ' rows');
    response.send('Deleted ' + result.affectedRows + ' rows')
  }
  );
 })
 
app.listen(8080);