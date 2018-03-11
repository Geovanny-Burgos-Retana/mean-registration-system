/*const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['institucion']);

// GET All instituciones
router.get('/instituciones', (req, res, next) => {
    db.institucion.find((err, instituciones) => {
        if (err) return next(err);
        res.json(instituciones);
    });
});

//solo una institucion
router.get('/instituciones/:nombre',(req,res,next) => {
	db.curso.findOne({_id:mongojs.ObjectId(req.params.id)},(err,cursos) =>{
		if(err) return next(err);
		res.json(cursos);
	});
});




module.exports = router;*/