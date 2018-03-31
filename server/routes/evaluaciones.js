const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['evaluacion']);

//Obtener evaluaciones
router.get('/assignment/get', (req, res, next) => {
    db.evaluacion.find((err, evaluaciones) => {
        if (err) return next(err);
        res.json(evaluaciones);
    });
});

//Crear evaluaciones
router.post('/assignment/create', (req, res, next) => {
    const evaluacion = req.body;
    db.evaluacion.save(evaluacion, (err, evaluaciones) => {
        if (err) return next(err);
        res.json(evaluaciones);
    });
});

//Actualizar evaluacion
router.put('/assignment/update', (req, res, next) => {
    const assignment = req.body;
    let updateAssignment = {};
    
    if (assignment.grupo) {
        updateAssignment.grupo = assignment.grupo;
    }
    if (assignment.carnet) {
        updateAssignment.carnet = assignment.carnet;
    }
    if (assignment.asignaciones) {
        updateAssignment.asignaciones = assignment.asignaciones;
    }
    if(!updateAssignment) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.evaluacion.update({_id: mongojs.ObjectId(assignment._id)}, updateAssignment, {}, (err, evaluacion) => {
            if (err) return next(err);
            res.json(evaluacion);
        });
    }
});

//Eliminar evaluacion
router.delete('/assignment/delete/:_id', (req, res, next) => {
    db.evaluacion.remove({_id: mongojs.ObjectId(req.params._id)}, (err, evaluacion) => {
        if (err) {res.send(err);}
        res.json(evaluacion);
    });
});

//Eliminar evaluacion por grupo y carnet
router.delete('/assignment/delete_group_carnet/:grupo/:carnet', (req, res, next) => {
    db.evaluacion.remove({grupo:req.params.grupo, carnet:req.params.carnet}, (err, evaluacion) => {
        if (err) {res.send(err);}
        res.json(evaluacion);
    });
});

module.exports = router;