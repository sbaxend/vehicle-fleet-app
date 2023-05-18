const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('req.user', req.user);
  let queryText = 'SELECT * from "cars" WHERE "user_id" = $1;'
  pool.query(queryText, [req.user.id]).then((results) => 
  res.send(results.rows)).catch((error) => {
    console.log(`Error making SELECT for cars:`, error);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
