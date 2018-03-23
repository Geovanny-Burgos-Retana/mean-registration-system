const router = require('express-promise-router')();
const mongojs = require('mongojs');
const db = mongojs('mongodb://gio:1234@ds151558.mlab.com:51558/universities',['universidad']);

/*// GET All universidades
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
	db.universidad.save(universidad, (err, universidad) => {
            if (err) return next(err);
            res.json(universidad);
    });
	
});

// Update universidad
router.put('/universidades/update', (req, res, next) => {
    const universidad = req.body;
    //console.log({_id: universidad._id}, {$push: {escuelas: {$each: universidad.escuelas[0]} } });    
    
	const schools = universidad.escuelas;
	console.log("Escuelas: "+schools);

	 // ADD NEW TAGS IN MONGO DB
	 const updateTags = schools.reduce((all, tag) => {
	     all.push(db.universidad.update({ _id: mongojs.ObjectId(universidad._id) }, { $push: { escuelas: tag } }))
	     return all
	 }, [])
	 Promise.all(updateTags)
    
    /*var escuelas = post[];
    db.universidad.update({_id: universidad._id}, {$push: {"universidad.escuelas": {$each: universidad.escuelas} } }, {}, (err, task) => {

        if (err) return next(err);
        console.log(res.json(task));
        res.json(task);
    });

    db.universidad.findOne({_id: mongojs.ObjectId(universidad._id)},(err,universidad) => {
		if(err) return next(err);
		res.json(universidad);
	});

    /*for (var i = 0; i < universidad.escuelas.length; i++) {
    	db.universidad.findOne({_id:mongojs.ObjectId(universidad._id)}).exec(function(err,universidad) {
    	   universidad.attachments.push( universidad.escuelas[i] );    	   
    	});
    }
});
*/

//Obtener universidades
router.get('/university/get', (req, res, next) => {
    db.universidad.find((err, universidades) => {
        if (err) return next(err);
        res.json(universidades);
    });
});

//Crear universidad
router.post('/university/create', (req, res, next) => {
    const university = req.body;
    db.universidad.save(university, (err, university) => {
        if (err) return next(err);
        res.json(university);
    });
});

//Actualizar universidad
router.put('/university/update', (req, res, next) => {
    const university = req.body;
    let updateUniversity = {};
    
    if(university.nombre) {
        updateUniversity.nombre = university.nombre;
    }
    if(university.escuelas) {
        updateUniversity.escuelas = university.escuelas;
    }
    if(!updateUniversity) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.universidad.update({_id: mongojs.ObjectId(university._id)}, updateUniversity, {}, (err, universidad) => {
            if (err) return next(err);
            res.json(universidad);
        });
    }
});

//Eliminar universidad
router.delete('/university/delete/:_id', (req, res, next) => {    
    db.universidad.remove({_id: mongojs.ObjectId(req.params._id)}, (err, universidad) => {
        if (err) {res.send(err);}
        res.json(universidad);
    });
});

//Obtener universidad por (nombre)
router.get('/university/get/:nombre', function(req, res, next){
    db.universidad.findOne({nombre: req.params.nombre}, function(err, universidad){
        if(err){res.send(err);}
        res.json(universidad);
    });
});

//Obtener universidad que contenga la escuela
router.get('/university/get/:nombre/:escuela', function(req, res, next){    
    db.universidad.findOne({nombre: req.params.nombre, escuelas: req.params.escuela}, function(err, universidad){
        if(err){res.send(err);}
        res.json(universidad);
    });
});


module.exports = router;