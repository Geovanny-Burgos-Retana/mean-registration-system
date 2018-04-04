const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['foro']);

//Obtener mensajes del foro de un grupo
router.get('/foro/get/:idGrupo', (req, res, next) => {
    db.foro.find({idGrupo: req.params.idGrupo}, (err, subject) => {
        if (err) {res.send(err);}
        res.json(subject);
    });
});

//Guardar mensaje del foro
router.post('/foro/create', (req, res, next) => {
    const subject = req.body;
    db.foro.save(subject, (err, subject) => {
        if (err) return next(err);
        res.json(subject);
    });
});

module.exports = router;