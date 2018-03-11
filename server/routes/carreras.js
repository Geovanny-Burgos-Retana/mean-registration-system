const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['carrera']);

// GET All carreras
router.get('/carreras', (req, res, next) => {
    db.carrera.find((err, carreras) => {
        if (err) return next(err);
        res.json(carreras);
    });
});

//solo una carrera
router.get('/carreras/:nombre',(req,res,next) => {
	db.carrera.findOne({nombre:req.params.nombre},(err,carrera) => {
		if(err) return next(err);
		res.json(carrera);
	});
});

//Actualizar carrera

//Agregar carrera
router.post('/carrera',(req, res, next)=> {
	console.log("HOLA");
	const carrera = req.body;
	db.carrera.save(carrera, (err, carrera) => {
        if (err) return next(err);
        res.json(carrera);
    });
	
});

module.exports = router;