const express = require('express');
const rateLimit = require('express-rate-limit');
const controller = require('../controller/controller');

const router = express.Router();

//applied the rate limiting logic so that the register route and users/:id route cant be hit more than 5 times in 15 seconds
const apiLimiter = rateLimit({
    windowMs: 15 * 1000,
    max: 5,
    message: { error: 'Too many requests, please try again later.' },
});


router.post('/register',apiLimiter, controller.register)
router.post('/login', controller.login);
router.get('/users/:id',apiLimiter, controller.hasAccess , controller.getUserById);


module.exports = router;