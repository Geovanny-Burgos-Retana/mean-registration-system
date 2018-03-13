const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['universities.secion']);

// GET All users
router.get('/secion', (req, res, next) => {
    db.secion.find((err, usuarios) => {
        if (err) return next(err);
        res.json(usuarios);
    });
});

// Single User
router.get('/secion/:name/:pass', function(req, res, next){
    db.secion.findOne({usuario: req.params.name, contrasena: req.params.pass}, function(err, secion){
        if(err){
            res.send(err);
        }
        res.json(secion);
    });
});

// Single User
router.get('/secion/:nombre', function(req, res, next){
    db.secion.findOne({nombre: req.params.nombre}, function(err, secion){
        if(err){
            res.send(err);
        }
        res.json(secion);
    });
});

// Add a secion
router.post('/secion', (req, res, next) => {
    const sec = req.body;
    console.log("usuario "+sec.usuario);
    console.log("contrasena "+sec.contrasena);
    console.log("universidad "+sec.universidad);
    console.log("escuela "+sec.escuela);
    console.log("tipo "+sec.tipo);
    console.log("nombre "+sec.nombre);
    console.log("carnet "+sec.carnet);
    console.log("carrera "+sec.carrera);
    db.secion.save(sec, (err, secion) => {
            if (err) return next(err);
            res.json(sec);
        });
});

/*// Single User
router.get('/users/universidades', function(req, res, next){
    db.universidad.find((err, usuario) => {
        if(err){
            res.send(err);
        }
        res.json(usuario);
    });
});*/

module.exports = router;