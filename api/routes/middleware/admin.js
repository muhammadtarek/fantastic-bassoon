module.exports = function (req ,res ,next) {
    if (!req.user.userType=='1')
    return res.status(403).send ('Access denied not admin');
    next();
}