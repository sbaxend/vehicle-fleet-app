const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */
// SELECT ALL VEHICLES REQUEST
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('req.user', req.user);
  let queryText = 'SELECT * FROM "cars" WHERE "user_id" = $1;'
  pool.query(queryText, [req.user.id]).then((results) =>
    res.send(results.rows)).catch((error) => {
      console.log(`Error making SELECT for cars:`, error);
      res.sendStatus(500);
    })
});

// SELECT INDIVIDUAL VEHICLE REQUEST
router.get('/:carId', rejectUnauthenticated, (req, res) => {
  const carId = req.params.carId;
  console.log('carId is', carId)
  let queryText = 'SELECT * FROM "cars" WHERE "id" = $1;';
  pool.query(queryText, [carId]).then((results) => res.send(results.rows)).catch((error) => {
    console.log(`Error making Select vehicle request:`, error);
    res.sendStatus(500);
  })
})
// SELECT HISTORY REQUEST
router.get('/history/:carId', (req, res) => {
  const carId = req.params.carId
  console.log(carId)
  let queryText = 'SELECT * FROM "history" WHERE "car_id" = $1;'
  pool.query(queryText, [carId]).then((results) => res.send(results.rows)).catch((error) => {
    console.log(`Error making vehicle history request:`, error);
    res.sendStatus(500);
  })

});
// SELECT WISHLIST REQUEST
router.get('/wishlist/:carId', (req, res) => {
  const carId = req.params.carId;
  let queryText = 'SELECT * FROM "wishlist" WHERE "car_id" = $1;';
  pool.query(queryText, [carId]).then((results) => res.send(results.rows)).catch((error) => {
    console.log(`Error making vehicle wishlist request:`, error);
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
  let { vehicle_make, vehicle_year, vehicle_model, body_style } = req.body
  pool.query(queryText, [vehicle_make, vehicle_year, vehicle_model, body_style, req.user.id]).then((results) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * DELETE route
 */
router.delete('/:carId', rejectUnauthenticated, (res, req) => {
  const carId = req.params.carId;
  let history = 'DELETE * FROM history WHERE car_id = $1;';
  let wishlist ='DELETE * FROM "wishlist" WHERE car_id = $1;';
  let car = 'DELETE * FROM "cars" WHERE "id" = $1;'
})

/**
 * PUT route
 */

router.put('/:carId', rejectUnauthenticated, (res, req) => {

})
module.exports = router;
