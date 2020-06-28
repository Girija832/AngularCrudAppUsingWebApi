var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'customer_db'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = app.listen(3000, "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
});



var verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    var token = authHeader.split(' ')[1]; // To remove Bearer string from authHeader
    jwt.verify(token, process.env.secret_key, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          auth: false,
          message: "Fail to Authentication. Error -> " + err,
        });
      }
      req.userId = decoded.id;
      req.role = decoded.role;
      // Check wheather user exist or not by docoding the user id from token
      connection.query('SELECT id FROM user WHERE id=?', [decoded.id], function (error, results, fields) {
        if (error) throw error;
        if(results.length == 0) {
          return res.status(500).send({
            auth: false,
            message: "Invalid Token",
          });
        }
      });  
      next();
    });
  } else {
    return res.status(401).send({
          auth: false,
          message: "No token provided.",
        });
  }
};

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Content-Type", "application/json");
next();
});

//rest api to get all customers
app.get('/customer', [verifyToken], function (req, res) {
   connection.query('SELECT * FROM customer', function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
});

//rest api to get a single customer data
app.get('/customer/:id', [verifyToken], function (req, res) {  
  connection.query('SELECT * FROM customer WHERE Id=?', [req.params.id], function (error, results, fields) {
      if (error) {
      return res.status(500).send(JSON.stringify({ auth: false, message: 'Database error' }));
    };
    return res.send(JSON.stringify(results));
  });
});

//rest api to create a new customer record into mysql database
app.post('/customer', [verifyToken], function (req, res) {
  if(req.role !== 'admin') {
    return res.status(403).send(JSON.stringify({ auth: false, message: 'User not Authorized' }));
  }
   var params  = req.body;
   connection.query('INSERT INTO customer SET ?', params, function (error, results, fields) {
      if (error) throw error;
    res.send(JSON.stringify({ auth: false, message: 'Customer data added successfully' }));
    console.log(results);
    });
});

//rest api to update record into mysql database
app.put('/customer/:id', [verifyToken], function (req, res) {
  if(['admin', 'operator'].indexOf(req.role) === -1) {
    return res.status(403).send(JSON.stringify({ auth: false, message: 'User not Authorized' }));
  }
  console.log(req.role);
  connection.query('UPDATE `customer` SET `name`=?,`address`=?,`email`=?,`phone`=? where `id`=?', [req.body.name, req.body.address, req.body.email, req.body.phone, req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify({ auth: true, message: 'Customer data updated successfully' }));
 });
});

//rest api to delete record from mysql database
app.delete('/customer/:id', [verifyToken], function (req, res) {
  if(req.role !== 'admin') {
    return res.status(403).send(JSON.stringify({ auth: false, message: 'User not Authorized' }));
  }
   connection.query('DELETE FROM `customer` WHERE `id`=?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    if(results.affectedRows == 0) {
      res.send(JSON.stringify(`Not found Customer with id = ${req.params.id}.`));
    } else {
      res.send(JSON.stringify(`Record has been deleted with id = ${req.params.id}`));
    }
    });
});

//rest api to delete all customers
app.delete('/customer/', function (req, res) {
  connection.query('DELETE FROM `customer`', function(error, results) {
    if(error) throw error;
    // console.log(`deleted ${results.affectedRows} customers`);
    res.send('All Customers were deleted successfully!')
  });
});

//register user
app.post('/user/register', function (req, res) {
  var params  = req.body;
  const {first_name, last_name, email, password} = req.body;
  // console.log(params);
  connection.query('SELECT COUNT(*) AS cnt FROM user WHERE email=?', [req.body.email], function (err, data) {
    if(err) {
      console.log(err);
    } else {
      if (data[0].cnt > 0) {
        res.status(400).send({status: 400, message: "Email already exist"});
      } else {
        bcrypt.hash(req.body.password, 10).then((hash_pass) => {
          params.password = hash_pass;
          console.log(params);
          connection.query('INSERT INTO user SET ?', params, function (error, results, fields) {
            if(error) {
              res.status(400).send({status: 400, message: "error occured"});
            } else {
              res.status(200).send({status: 200, message: "user registered successfully"});
              }
         })
        });
      }
    }
  })
});

//login
app.post('/user/login', (req, res) => {

  connection.query('SELECT password,id, user_role FROM user WHERE email=?', [req.body.email], function (error, results, fields) {
    if (error) throw error;
    if(results.length>0) {
      var hashPassword = results[0].password;
      bcrypt.compare(req.body.password, hashPassword, function(err, isMatch) {
        if (err) {
          throw err
        } else if (!isMatch) {
          res.status(401).send({status: 401, message: "Email or Password doesn't match"});
        } else {
          console.log("Password matches!")
          // Matching user found
          var token = jwt.sign({ id: results[0].id, role: results[0].user_role }, process.env.secret_key, {
          expiresIn: '30m' // expires in 30 mins
         // expiresIn: 86400 // expires in 24 hours
        });
      res.status(200).send({ auth: true, token: token, status: 200, message: "login successful" });
        }
      })
      
    } else {
      // User not found
      res.status(401).send({status: 401, message: "Email or Password doesn't match"});
    }
      // res.send(JSON.stringify(results));
    });
    
});
