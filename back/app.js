
var express = require('express');
var bodyparser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./db/mongoose');

dotenv.config();

const app = express();
connectDB();

var test_routes = require('./routes/test');
var colaborador_routes = require('./routes/colaborador');
var cliente_routes = require('./routes/cliente');
var prospeccion_routes = require('./routes/prospeccion');
var curso_routes = require('./routes/curso');
var matricula_routes = require('./routes/matricula');
var pago_routes = require('./routes/pago');
var producto_routes = require('./routes/producto');
var venta_routes = require('./routes/venta');
var configuracion_routes = require('./routes/configuracion');
var email_routes = require('./routes/email');
var kpi_routes = require('./routes/kpi');

app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',test_routes);
app.use('/api',colaborador_routes);
app.use('/api',cliente_routes);
app.use('/api',prospeccion_routes);
app.use('/api',curso_routes);
app.use('/api',matricula_routes);
app.use('/api',pago_routes);
app.use('/api',producto_routes);
app.use('/api',venta_routes);
app.use('/api',configuracion_routes);
app.use('/api',email_routes);
app.use('/api',kpi_routes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
  });
  
  const PORT = process.env.PORT || 4201;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  module.exports = app;
  


