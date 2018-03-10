const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['universidad']);

// GET All universidades
router.get('/universidades', (req, res, next) => {
    db.universidad.find((err, universidades) => {
        if (err) return next(err);
        res.json(universidades);
    });
});

module.exports = router;