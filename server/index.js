const express = require('express');
const path = require('path');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const universidadRoutes = require('./routes/universidades');
const cursoRoutes = require('./routes/cursos');
const carreraRoutes = require('./routes/carreras');
const materiaRoutes = require('./routes/materia');
const evaluacionRoutes = require('./routes/evaluaciones');
const foroRoutes = require('./routes/foro');
const asistenciaRoutes = require('./routes/asistencias');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/api', usersRoutes);
app.use('/api', universidadRoutes);
app.use('/api', cursoRoutes);
app.use('/api', carreraRoutes);
app.use('/api', materiaRoutes);
app.use('/api', evaluacionRoutes);
app.use('/api', foroRoutes);
app.use('/api', asistenciaRoutes);

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(app.get('port'), () => {
    console.log('server on port 3000');
});