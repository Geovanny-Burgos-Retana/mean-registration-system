const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['universidad']);

// GET All universidades
router.get('/universidades', (req, res, next) => {
    db.universidad.find((err, universidades) => {
        if (err) return next(err);
        res.json(universidades);
    });
});



//solo una universidad
router.get('/universidades/:nombre',(req,res,next) => {
	db.universidad.findOne({nombre:req.params.nombre},(err,universidad) => {
		if(err) return next(err);
		res.json(universidad);
	});
});

//Agregar universidad
router.post('/universidades',(req, res, next)=> {
	console.log("HOLA curo");
	const universidad = req.body;
	db.universidades.save(universidad, (err, universidad) => {
            if (err) return next(err);
            res.json(universidad);
    });
	
});

module.exports = router;