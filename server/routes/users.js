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
    db.usuario.findOne({nombre: req.params.name, contraseña: req.params.pass}, function(err, usuario){
        if(err){
            res.send(err);
        }
        res.json(usuario);
    });
});

module.exports = router;