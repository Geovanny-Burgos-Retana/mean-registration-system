const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['foro']);

//Obtener mensajes del para el foro
router.get('/curriculum/get/idGrupo', (req, res, next) => {
    dbfor.find((err, mensajes) => {
        if (err) return next(err);
        res.json(mensajes);
    });
});

module.exports = router;