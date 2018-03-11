const express = require('express');
const path = require('path');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const universidadRoutes = require('./routes/universidades');
const cursoRoutes = require('./routes/cursos');
const carreraRoutes = require('./routes/carreras');
//const institucionRoutes = require('./routes/instituciones');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/api', usersRoutes);
app.use('/api', universidadRoutes);
app.use('/api', cursoRoutes);
app.use('/api', carreraRoutes);
//app.use('/api', institucionRoutes);


app.use(express.static(path.join(__dirname, '../dist')));

app.listen(app.get('port'), () => {
    console.log('server on port 3000');
});