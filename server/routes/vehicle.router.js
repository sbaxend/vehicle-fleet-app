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
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('req.user', req.user)
  console.log(req.body)
  let queryText = 'INSERT INTO "cars" ("vehicle_make", "vehicle_year", "vehicle_model","body_style", "user_id") VALUES ($1, $2, $3, $4, $5)'
  let {vehicle_make, vehicle_year, vehicle_model, body_style} = req.body
  pool.query(queryText, [vehicle_make, vehicle_year, vehicle_model, body_style, req.user.id]).then((results) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
});
});

module.exports = router;
