const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['curso']);

//Obtener cursos
router.get('/course/get', (req, res, next) => {
    db.curso.find((err, cursos) => {
        if (err) return next(err);
        res.json(cursos);
    });
});

//Crear curso
router.post('/course/create', (req, res, next) => {
    const curso = req.body;    
    db.curso.save(curso, (err, course) => {
        if (err) return next(err);
        res.json(course);
    });
});

//Actualizar curso
router.put('/course/update', (req, res, next) => {
    const curso = req.body;
    let updateCurso = {};
    
    if(curso.nombre) {
        updateCurso.nombre = curso.nombre;
    }
    if(curso.numeroGrupo) {
        updateCurso.numeroGrupo = curso.numeroGrupo;
    }
    if (curso.profesor) {
        updateCurso.profesor = curso.profesor;
    }
    if (curso.estudiantes) {
        updateCurso.estudiantes = curso.estudiantes;
    }
    if (curso.horario) {
        updateCurso.horario = curso.horario;
    }
    if (curso.universidad) {
        updateCurso.universidad = curso.universidad;
    }
    if (curso.asignaciones) {
        updateCurso.asignaciones = curso.asignaciones;
    }
    if(!updateCurso) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.curso.update({_id: mongojs.ObjectId(curso._id)}, updateCurso, {}, (err, course) => {
            if (err) return next(err);
            res.json(course);
        });
    }
});

//Eliminar curso
router.delete('/course/delete/:_id', (req, res, next) => {
    db.curso.remove({_id: mongojs.ObjectId(req.params._id)}, (err, curso) => {
        if (err) {res.send(err);}
        res.json(curso);
    });
});

//Obtener curso por (nombre, numeroGrupo)
router.get('/course/get/:nombre/:numeroGrupo', function(req, res, next){
    db.curso.findOne({nombre: req.params.nombre, numeroGrupo: req.params.numeroGrupo}, function(err, curso){
        if(err){res.send(err);}
        res.json(curso);
    });
});

//Obtener cursos que tiene matriculado un estudiante por su carnet
router.get('/course/get/:carnet', function(req, res, next){
    db.curso.find({estudiantes: req.params.carnet}, function(err, curso){
        if(err){res.send(err);}
        res.json(curso);
    });
});

//Obtener cursos que tiene matriculado un estudiante por su carnet
router.get('/course/getCursosImpartidosProfesor/:nombre', function(req, res, next){
    db.curso.find({profesor: req.params.nombre}, function(err, curso){
        if(err){res.send(err);}
        res.json(curso);
    });
});

module.exports = router;