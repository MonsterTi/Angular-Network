// module natifs
const router = require('express').Router();
// mes controllers
const {
    existUser,
    existUserSignup,
    createUser,
    verify,
    refreshTokenUser,
    signinUser
} = require('../controllers/user.controllers');


router.post('/signup', existUserSignup, createUser);

router.get('/refresh-token', verify, refreshTokenUser);

router.post('/signin', existUser, signinUser);

module.exports = router