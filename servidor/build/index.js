'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
//configutacion de sevicios
const express_1 = __importDefault(require('express'));
const morgan_1 = __importDefault(require('morgan'));
const cors_1 = __importDefault(require('cors'));
const indexRoutes_1 = __importDefault(require('./routes/indexRoutes'));
const pruebaRoutes_1 = __importDefault(require('./routes/pruebaRoutes'));
const personalRoutes_1 = __importDefault(require('./routes/personalRoutes'));
const institucionRoutes_1 = __importDefault(
  require('./routes/institucionRoutes')
);
const justificacionRoutes_1 = __importDefault(
  require('./routes/justificacionRoutes')
);
const licenciaRoutes_1 = __importDefault(require('./routes/licenciaRoutes'));
const permisoRoutes_1 = __importDefault(require('./routes/permisoRoutes'));
const vacacionesRoutes_1 = __importDefault(
  require('./routes/vacacionesRoutes')
);
const usuarioRoutes_1 = __importDefault(require('./routes/usuarioRoutes'));
const asistenciaRoutes_1 = __importDefault(
  require('./routes/asistenciaRoutes')
);
var bodyParser = require('body-parser');
var app = express_1.default();
//app.use(cors);
//difinicion de la clase para el lado del servidor
class Server {
  constructor() {
    //inicializa express
    this.app = express_1.default();
    this.config();
    this.routes();
  }
  //configurar la propiedad app
  config() {
    this.app.set('port', process.env.PORT || 3000);
  }
  //difinir las rutas detscl servidor
  routes() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/', indexRoutes_1.default);
    this.app.use('/api/prueba', pruebaRoutes_1.default);
    this.app.use('/api/personal', personalRoutes_1.default);
    this.app.use('/api/institucion', institucionRoutes_1.default);
    this.app.use('/api/justificacion', justificacionRoutes_1.default);
    this.app.use('/api/licencia', licenciaRoutes_1.default);
    this.app.use('/api/permiso', permisoRoutes_1.default);
    this.app.use('/api/vacaciones', vacacionesRoutes_1.default);
    this.app.use('/api/asistencia', asistenciaRoutes_1.default);
    this.app.use('/api/usuario', usuarioRoutes_1.default);
    this.app.use(morgan_1.default('dev'));
    this.app.use(cors_1.default());
  }
  //iniciar el servidor
  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'));
    });
  }
}
//ejcutar la clase
const server = new Server();
server.start();
