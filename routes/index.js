let express = require('express');

let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Hello NAVI');
});

module.exports = router;
