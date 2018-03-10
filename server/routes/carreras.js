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
router.get('/carreras/:id',(req,res,next) => {
	db.carrera.findOne({_id:mongojs.ObjectId(req.params.id)},(err,carreras) =>{
		if(err) return next(err);
		res.json(carreras);
	});
});

//Actualizar carrera

//Agregar carrera
router.post('/carreras/:name/:materia',(req, res, next)=> {
	console.log("HOLA");
	db.carrera.save({nombre:req.params.name}, (err, car) => {
            if (err) return next(err);
            res.json(car);
    });
	
});

module.exports = router;