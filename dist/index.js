"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./clases/server"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var environment_1 = require("./global/environment");
var server = server_1.default.instance;
server.app.enable('trust proxy');
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Importar rutas
var login_1 = __importDefault(require("./rutas/login"));
var uploads_1 = __importDefault(require("./rutas/uploads"));
var servicios_1 = __importDefault(require("./rutas/servicios"));
var residentes_1 = __importDefault(require("./rutas/residentes"));
var administradores_1 = __importDefault(require("./rutas/administradores"));
var pagos_1 = __importDefault(require("./rutas/pagos"));
// Rutas de servicios
server.app.use('/login', login_1.default);
server.app.use('/uploads', uploads_1.default);
server.app.use('/servicios', servicios_1.default);
server.app.use('/residentes', residentes_1.default);
server.app.use('/admins', administradores_1.default);
server.app.use('/pago', pagos_1.default);
// Conexion a base de datos
mongoose_1.default.connect("mongodb://" + environment_1.DB_URL, { useCreateIndex: true, useNewUrlParser: true }, function (err) {
    if (err)
        throw err;
    var DB = environment_1.DB_URL.split('/');
    var DB_NAME = DB[DB.length - 1];
    console.log("Conectado a la base de datos:" + DB_NAME);
});
// Arranque de servidor
server.start(function () {
    console.log("Servidor corriendo en el puerto:" + environment_1.SERVER_PORT);
});
