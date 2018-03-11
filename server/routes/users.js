const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['universities.usuario']);

// GET All users
router.get('/users', (req, res, next) => {
    db.usuario.find((err, usuarios) => {
        if (err) return next(err);
        res.json(usuarios);
    });
});

// Single User
router.get('/users/:name/:pass', function(req, res, next){
    db.usuario.findOne({usuario: req.params.name, contrasena: req.params.pass}, function(err, usuario){
        if(err){
            res.send(err);
        }
        res.json(usuario);
    });
});

// Single User
router.get('/users/:nombre', function(req, res, next){
    db.usuario.findOne({nombre: req.params.nombre}, function(err, usuario){
        if(err){
            res.send(err);
        }
        res.json(usuario);
    });
});

// Add a User
router.post('/users', (req, res, next) => {
    const user = req.body;
    console.log("usuario "+user.usuario);
    console.log("contrasena "+user.contrasena);
    console.log("universidad "+user.universidad);
    console.log("escuela "+user.escuela);
    console.log("tipo "+user.tipo);
    console.log("nombre "+user.nombre);
    console.log("carnet "+user.carnet);
    console.log("carrera "+user.carrera);



    if(!(user.usuario) || !(user.contrasena) || !(user.universidad) || !(user.escuela) || !(user.tipo) || !(user.nombre) || !(user.carnet) ) {
        res.status(400).json({
            'error': 'Bad Data'
        });
    } else {
        db.usuario.save(user, (err, user) => {
            if (err) return next(err);
            res.json(user);
        });
    }
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