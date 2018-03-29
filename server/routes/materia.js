const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['materia']);

//Obtener materias
router.get('/subject/get', (req, res, next) => {    
    db.materia.find((err, subject) => {
        if (err) return next(err);
        res.json(subject);
    });
});

//Guardar materia(s)
router.post('/subject/create', (req, res, next) => {
    const subject = req.body;
    db.materia.save(subject, (err, subject) => {
        if (err) return next(err);
        res.json(subject);
    });
});

//Actualizar materia
router.put('/subject/update', (req, res, next) => {
    const subject = req.body;
    let updateSubject = {};
    
    if(subject.nombre) {
        updateSubject.nombre = subject.nombre;
    }
    if(subject.carrera) {
        updateSubject.carrera = subject.carrera;
    }
    if (subject.temas) {
        updateSubject.temas = subject.temas;
    }
    if(!updateSubject) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.materia.update({_id: mongojs.ObjectId(subject._id)}, updateSubject, {}, (err, subject) => {
            if (err) return next(err);
            res.json(subject);
        });
    }
});

//Eliminar materia
router.delete('/subject/delete/:_id', (req, res, next) => {    
    db.materia.remove({_id: mongojs.ObjectId(req.params._id)}, (err, subject) => {
        if (err) {res.send(err);}
        res.json(subject);
    });
});

//Obtener materias de una carrera
router.get('/subject/get/:career', function(req, res, next){
    db.materia.find({carrera: req.params.career}, function(err, subject){
        if(err){res.send(err);}
        res.json(subject);
    });
});

//Obtener materia de una carrera
router.get('/subject/get/:career/:subject', function(req, res, next){
    db.materia.findOne({nombre: req.params.subject, carrera: req.params.career}, function(err, subject){
        if(err){res.send(err);}
        res.json(subject);
    });
});

//Eliminar materias por nombre de carrera
router.delete('/subject/deleteForCareer/:career', (req, res, next) => {    
    db.materia.remove({carrera: req.params.career}, (err, subject) => {
        if (err) {res.send(err);}
        res.json(subject);
    });
});

module.exports = router;