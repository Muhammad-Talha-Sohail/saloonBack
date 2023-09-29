const express = require('express');

const router = express.Router();

const workerControl=require('../controller/workerController');
const jwt = require('../jwt/jwt');

router.post('/createWorker',workerControl.createWorker)
router.post('/createToken',workerControl.createToken)
router.get('/getWorker',jwt.verifyToken,workerControl.getWorker)



module.exports = router;