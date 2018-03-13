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
router.get('/cursos/:id',(req,res,next) => {
	db.curso.findOne({_id:mongojs.ObjectId(req.params.id)},(err,cursos) =>{
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


// Update cursos
router.put('/cursos/update', (req, res, next) => {
    console.log("HOLA");
    const curso = req.body;
    //console.log({_id: universidad._id}, {$push: {escuelas: {$each: universidad.escuelas[0]} } });    
    
	const students = curso.estudiantes;
	console.log("Escuelas: "+students);

	 // ADD NEW TAGS IN MONGO DB
	 const updateTags = students.reduce((all, tag) => {
	     all.push(db.curso.update({ _id: mongojs.ObjectId(curso._id) }, { $push: { estudiantes: tag } }))
	     return all
	 }, [])
	 Promise.all(updateTags)
    
    /*var escuelas = post[];
    db.universidad.update({_id: universidad._id}, {$push: {"universidad.escuelas": {$each: universidad.escuelas} } }, {}, (err, task) => {

        if (err) return next(err);
        console.log(res.json(task));
        res.json(task);
    });*/

    db.curso.findOne({_id: mongojs.ObjectId(curso._id)},(err,curso) => {
		if(err) return next(err);
		res.json(curso);
	});

    /*for (var i = 0; i < universidad.escuelas.length; i++) {
    	db.universidad.findOne({_id:mongojs.ObjectId(universidad._id)}).exec(function(err,universidad) {
    	   universidad.attachments.push( universidad.escuelas[i] );    	   
    	});
    }*/
});


module.exports = router;