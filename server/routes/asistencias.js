const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['asistencia']);

//Obtener mallas curriculares
router.get('/curriculum/get', (req, res, next) => {
    db.carrera.find((err, careers) => {
        if (err) return next(err);
        res.json(careers);
    });
});

//Crear malla curricular
router.post('/curriculum/create', (req, res, next) => {
    const career = req.body;
    db.carrera.save(career, (err, career) => {
        if (err) return next(err);
        res.json(career);
    });
});

//Actualizar malla curricular
router.put('/curriculum/update', (req, res, next) => {
    const career = req.body;
    let updateCareer = {};
    
    if(career.nombre) {
        updateCareer.nombre = career.nombre;
    }
    if(career.materias) {
        updateCareer.materias = career.materias;
    }
    if(!updateCareer) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.carrera.update({_id: mongojs.ObjectId(career._id)}, updateCareer, {}, (err, carrera) => {
            if (err) return next(err);
            res.json(carrera);
        });
    }
});

//Eliminar malla curricular
router.delete('/curriculum/delete/:_id', (req, res, next) => {    
	console.log(req.params._id);
    db.carrera.remove({_id: mongojs.ObjectId(req.params._id)}, (err, carrera) => {
        if (err) {res.send(err);}
        res.json(carrera);
    });
});

//Obtener malla curricular por (nombre)
router.get('/curriculum/get/:nombre', function(req, res, next){
    db.carrera.findOne({nombre: req.params.nombre}, function(err, carrera){
        if(err){res.send(err);}
        res.json(carrera);
    });
});

module.exports = router;