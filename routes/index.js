const router = require('express').Router();
const auth = require('./auth');
const user = require('./user');

//--- les routes des authentifications ---//
router.use('/api/auth', auth);
router.use('/api/user', user);
 
module.exports = router