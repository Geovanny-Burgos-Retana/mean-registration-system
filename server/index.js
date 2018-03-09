const express = require('express');
const path = require('path');
const cors = require('cors');

const usersRoutes = require('./routes/users');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', usersRoutes);

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(app.get('port'), () => {
    console.log('server on port 3000');
});