const {
    verifyQueries,
    existUserQueries,
    existUserSignupQueries,
    createUserQueries,
    refreshTokenQueries,
    signinUserQueries,
} = require('../queries/user.queries');

exports.verify = async (req, res, next) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization : false;
        await verifyQueries(token, req, res, next)
    } catch (e) {
        console.log(e);
    }
};

exports.existUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        await existUserQueries(email, req, res, next);
    } catch (e) {
        console.log(e)
    };
};

exports.existUserSignup = async (req, res, next) => {
    try {
        const email = req.body.email;
        await existUserSignupQueries(email, req, res, next);
    } catch (e) {
        console.log(e)
    };
};

exports.signinUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        await signinUserQueries(email, password, req, res, next);
    } catch (e) {
        console.log(e);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const data = req.body;
        await createUserQueries(data, req, res, next)
    } catch (e) {
        console.log(e);
    }
};

exports.refreshTokenUser = async (req, res, next) => {
    try {
        const decoded = req.decoded;
        await refreshTokenQueries(decoded, req, res, next);
    } catch (e) {
        console.log(['erreur'], e)
    }
};