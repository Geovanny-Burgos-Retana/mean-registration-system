const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['asistencia']);

//Crear asistencias
router.post('/assistance/create', (req, res, next) => {
    const asistencia = req.body;
    db.asistencia.save(asistencia, (err, asistencias) => {
        if (err) return next(err);
        res.json(asistencias);
    });
});

//Eliminar asistencias por grupo y carnet
router.delete('/assistance/delete_group_carnet/:grupo/:carnet', (req, res, next) => {
    db.asistencia.remove({grupo:req.params.grupo, carnet:req.params.carnet}, (err, asistencia) => {
        if (err) {res.send(err);}
        res.json(asistencia);
    });
});

//Obtener asistencias por grupo y carnet
router.get('/assistance/get/assistanceGrupoCarnet/:idGrupo/:carnet', function(req, res, next){
    db.asistencia.findOne({grupo: req.params.idGrupo, carnet: req.params.carnet}, function(err, asistencia){
        if(err){res.send(err);}
        res.json(asistencia);
    });
});

//Actualizar asistencia
router.put('/assistance/update', (req, res, next) => {
    const asistencia = req.body;
    let updateAsistencia = {};
    
    updateAsistencia.grupo = asistencia.grupo;
    updateAsistencia.carnet = asistencia.carnet;
    updateAsistencia.asistencias = asistencia.asistencias;
    if(!updateAsistencia) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.asistencia.update({_id: mongojs.ObjectId(asistencia._id)}, updateAsistencia, {}, (err, asistencia) => {
            if (err) return next(err);
            res.json(asistencia);
        });
    }
});


module.exports = router;