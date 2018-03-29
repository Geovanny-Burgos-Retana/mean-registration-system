const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['universities.usuario']);
/*
//Obtener todos los usuarios de la base de datos
router.get('/users', (req, res, next) => {
    db.usuario.find((err, usuarios) => {
        if (err) return next(err);
        res.json(usuarios);
    });
});

//Obtener un usuarios en específico por su usuario y contraseña
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

// Single User
router.get('/users/universidades', function(req, res, next){
    db.universidad.find((err, usuario) => {
        if(err){
            res.send(err);
        }
        res.json(usuario);
    });
});
*/

//Obtener usuarios
router.get('/user/get', (req, res, next) => {
    db.usuario.find((err, usuarios) => {
        if (err) return next(err);
        res.json(usuarios);
    });
});

//Crear usuario
router.post('/user/create', (req, res, next) => {
    const user = req.body;
    db.usuario.save(user, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});

//Actualizar usuario
router.put('/user/update', (req, res, next) => {
    const usuario = req.body;
    let updateUsuario = {};
    
    if(usuario.universidad) {
        updateUsuario.universidad = usuario.universidad;
    }
    if(usuario.escuela) {
        updateUsuario.escuela = usuario.escuela;
    }
    if (usuario.carrera) {
        updateUsuario.carrera = usuario.carrera;
    }
    if (usuario.nombre) {
        updateUsuario.nombre = usuario.nombre;
    }
    if (usuario.contrasena) {
        updateUsuario.contrasena = usuario.contrasena;
    }
    if (usuario.tipo) {
        updateUsuario.tipo = usuario.tipo;
    }
    if (usuario.usuario) {
        updateUsuario.usuario = usuario.usuario;
    }
    if (usuario.carnet) {
        updateUsuario.carnet = usuario.carnet;
    }
    if(!updateUsuario) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.usuario.update({_id: mongojs.ObjectId(usuario._id)}, updateUsuario, {}, (err, usuario) => {
            if (err) return next(err);
            res.json(usuario);
        });
    }
});

//Eliminar usuario
router.delete('/user/delete/:_id', (req, res, next) => {
    db.usuario.remove({_id: mongojs.ObjectId(req.params._id)}, (err, usuario) => {
        if (err) {res.send(err);}
        res.json(usuario);
    });
});

//Obtener usuario por (username, password)
router.get('/user/get/:usuario/:contrasena', function(req, res, next){
    db.usuario.findOne({usuario: req.params.usuario, contrasena: req.params.contrasena}, function(err, usuario){
        if(err){res.send(err);}
        res.json(usuario);
    });
});

//Obtener usuario por nombre
router.get('/user/get/:nombre', function(req, res, next){
    db.usuario.findOne({nombre: req.params.nombre}, function(err, usuario){
        if(err){res.send(err);}
        res.json(usuario);
    });
});

module.exports = router;