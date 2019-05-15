import Server from './clases/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { SERVER_PORT, DB_URL } from './global/environment';

const server = Server.instance;

server.app.enable('trust proxy');

// BodyParser
server.app.use( bodyParser.urlencoded({extended: true}));
server.app.use( bodyParser.json());

// CORS
server.app.use( cors( { origin: true, credentials: true }) );

// Importar rutas
import loginRoutes from './rutas/login';
import uploadRoutes from './rutas/uploads';
import serviciosRoutes from './rutas/servicios';
import residentRoutes from './rutas/residentes';
import adminRoutes from './rutas/administradores';
import PagosRoutes from './rutas/pagos';

// Rutas de servicios
server.app.use('/login', loginRoutes);
server.app.use('/uploads', uploadRoutes);
server.app.use('/servicios', serviciosRoutes);
server.app.use('/residentes', residentRoutes);
server.app.use('/admins', adminRoutes);
server.app.use('/pago', PagosRoutes);

// Conexion a base de datos
mongoose.connect(`mongodb://${ DB_URL }`, {useCreateIndex: true, useNewUrlParser: true}, (err) => {
    if ( err ) throw err;

    const DB = DB_URL.split('/');
    const DB_NAME = DB[DB.length -1];

    console.log(`Conectado a la base de datos:${ DB_NAME }`);
});

// Arranque de servidor
server.start(() => {
    console.log(`Servidor corriendo en el puerto:${ SERVER_PORT }`);
});
