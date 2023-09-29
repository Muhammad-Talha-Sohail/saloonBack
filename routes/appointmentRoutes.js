const express = require('express')

const router = express.Router();

const appointmentControl = require('../controller/appointmentController');
const jwtConfig = require('../jwt/jwt');

router.post('/createAppointment',jwtConfig.verifyToken,appointmentControl.createAppointment)

module.exports =router