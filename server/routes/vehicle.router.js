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
router.get('/history/:vehicleId', (req, res) => {
  const carId = req.params.vehicleId
  console.log('in get request for selected history. id:', carId)
  let queryText = 'SELECT * FROM "history" WHERE "car_id" = $1 ORDER BY "history_date" DESC;'
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
// HISTORY POST
router.post('/history/:vehicleId', rejectUnauthenticated, (req, res) => {
  let carId = req.params.vehicleId
  console.log('history carId is', carId)
  let queryText = 'INSERT INTO "history" ("car_id", "history_description", "history_notes", "history_date") VALUES ($1, $2, $3, $4);';
  let { history_description, history_notes, history_date} = req.body
  pool.query(queryText, [carId, history_description, history_notes, history_date]).then((results) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
})

/**
 * DELETE route
 */
router.delete('/history/:vehicleId', rejectUnauthenticated, (req, res) => {
  const carId = req.params.vehicleId;
  console.log('In delete request history', carId)
  const queryText = 'DELETE FROM "history" WHERE car_id = $1;';
  pool.query(queryText, [carId]).then(() => {
      res.sendStatus(200);
    }).catch((error) => {
      console.error('Error deleting all history:', error);
      res.sendStatus(500);
    });
});
// FOR DELETING SPECIFIC HISTORY DETAILS
router.delete('/past/:historyId', rejectUnauthenticated, (req, res) => {
  const historyId = req.params.historyId
  const queryText = 'DELETE FROM "history" WHERE "id" = $1'
  pool.query(queryText, [historyId]).then(() => {
    res.sendStatus(200);
  }).catch((error) => {
    console.error('Error deleting history:', error);
    res.sendStatus(500);
  });
})

router.delete('/wishlist/:vehicleId', rejectUnauthenticated, (req, res) => {
  const carId = req.params.vehicleId;
  let queryText ='DELETE FROM "wishlist" WHERE car_id = $1;';
  pool.query(queryText, [carId]).then(() => {
    res.sendStatus(200);
  }).catch((error) => {
    console.error('Error deleting history:', error);
    res.sendStatus(500);
  });
});
 
router.delete('/car/:vehicleId', rejectUnauthenticated, (req, res) => {
  const carId = req.params.vehicleId;
  let queryText = 'DELETE FROM "cars" WHERE "id" = $1;'
  pool.query(queryText, [carId]).then(() => {
    res.sendStatus(200);
  }).catch((error) => {
    console.error('Error deleting history:', error);
    res.sendStatus(500);
  });
});
/**
 * PUT route
 */

router.put('/car/:vehicleId', rejectUnauthenticated, (req, res) => {
  const carId = req.params.vehicleId;
  console.log('In put Route for car info, ID:', carId)
  let { vehicle_make, vehicle_year, vehicle_model, body_style } = req.body
  console.log(req.body)
  let queryText = 'UPDATE "cars" SET "vehicle_make" = $1, "vehicle_year" = $2, "vehicle_model" = $3, "body_style" = $4 WHERE "id" = $5;'
  pool.query(queryText, [vehicle_make, vehicle_year, vehicle_model, body_style, carId]).then(() => {
    res.sendStatus(200);
  }).catch((error) => {
    console.error('Error updating car', error);
    res.sendStatus(500);
  });
});

module.exports = router;
