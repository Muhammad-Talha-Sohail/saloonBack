const express = require('express');

const router = express.Router();

const userControl=require('../controller/userController');
const jwt = require('../jwt/jwt');

router.post('/createUser',userControl.createUser)
router.get('/getUser',jwt.verifyToken,userControl.getUser)


module.exports = router;