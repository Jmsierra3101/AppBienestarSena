const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

app.set('PORT', process.env.PORT || 4000);

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Middleware de debug
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
});

// **SOLO RUTAS BÁSICAS TEMPORALMENTE**
app.use('/api/v1/rols', require('./api/v1/routes/rols.routes'));
app.use('/api/v1/users', require('./api/v1/routes/users.routes'));

// **COMENTAR TEMPORALMENTE LAS OTRAS RUTAS**
app.use('/api/v1/categories', require('./api/v1/routes/categories.routes'));
app.use('/api/v1/events', require('./api/v1/routes/events.routes'));

// Ruta de prueba básica
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

// Ruta de prueba simple
app.get('/test/:id', (req, res) => {
    res.json({ test: 'ok', id: req.params.id });
});

app.listen(app.get('PORT'), ()=> {
    console.log(`🚀 Server running on PORT ${app.get('PORT')}`);
});