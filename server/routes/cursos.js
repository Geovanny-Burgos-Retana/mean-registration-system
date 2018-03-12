const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['curso']);

// GET All cursos
router.get('/cursos', (req, res, next) => {
    db.curso.find((err, cursos) => {
        if (err) return next(err);
        res.json(cursos);
    });
});


//solo una curso
router.get('/cursos/:name/:numero',(req,res,next) => {
	db.curso.findOne({nombre:req.params.name, numeroGrupo:req.params.numero},(err,cursos) =>{
		if(err) return next(err);
		res.json(cursos);
	});
});

//Agregar curso
router.post('/cursos',(req, res, next)=> {
	console.log("HOLA curo");
	const curso = req.body;
	db.curso.save(curso, (err, curso) => {
            if (err) return next(err);
            res.json(curso);
    });
	
});

module.exports = router;