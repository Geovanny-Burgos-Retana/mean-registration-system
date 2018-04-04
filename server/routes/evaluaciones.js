const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['evaluacion']);

//Crear evaluaciones
router.post('/assignment/create', (req, res, next) => {
    const evaluacion = req.body;
    db.evaluacion.save(evaluacion, (err, evaluaciones) => {
        if (err) return next(err);
        res.json(evaluaciones);
    });
});

//Eliminar evaluacion por grupo y carnet
router.delete('/assignment/delete_group_carnet/:grupo/:carnet', (req, res, next) => {
    db.evaluacion.remove({grupo:req.params.grupo, carnet:req.params.carnet}, (err, evaluacion) => {
        if (err) {res.send(err);}
        res.json(evaluacion);
    });
});

//Obtener evaluaciones por grupo y carnet
router.get('/assignment/get/assignmentGrupoCarnet/:idGrupo/:carnet', function(req, res, next){
    db.evaluacion.findOne({grupo: req.params.idGrupo, carnet: req.params.carnet}, function(err, assignments){
        if(err){res.send(err);}
        res.json(assignments);
    });
});

//Actualizar evaluacion
router.put('/assignment/update', (req, res, next) => {
    const evaluacion = req.body;
    let updateEvaluacion = {};
    
    updateEvaluacion.grupo = evaluacion.grupo;
    updateEvaluacion.carnet = evaluacion.carnet;
    updateEvaluacion.asignaciones = evaluacion.asignaciones;
    if(!updateEvaluacion) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.evaluacion.update({_id: mongojs.ObjectId(evaluacion._id)}, updateEvaluacion, {}, (err, course) => {
            if (err) return next(err);
            res.json(course);
        });
    }
});

module.exports = router;