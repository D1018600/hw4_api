var express = require('express');
var router = express.Router();

const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./hw4.sqlite", sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

router.post('/', (req, res) => {
  const {product, year, month, ori_price, aft_price}=req.body;
  sql = "INSERT INTO product (product, year, month, ori_price, aft_price) VALUES (?, ?, ?, ?, ?)";
  db.run(sql, [product, year, month, ori_price, aft_price], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send(err.message);
    }
    console.log('inserted');
  });
  //res.redirect('/data.html');
  return res.status(200).send('inserted');
})

router.get('/', function(req, res, next) {
  sql= "SELECT * FROM product";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});

module.exports = router;