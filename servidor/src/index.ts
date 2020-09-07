//configutacion de sevicios
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import pruebaRoutes from './routes/pruebaRoutes';
import personalRoutes from './routes/personalRoutes';
import institucionRoutes from './routes/institucionRoutes';
import justificacionRoutes from './routes/justificacionRoutes';
import licenciaRoutes from './routes/licenciaRoutes';
import permisoRoutes from './routes/permisoRoutes';
import vacacionesRoutes from './routes/vacacionesRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import asistenciaRoutes from './routes/asistenciaRoutes';
import tardanzaRoutes from './routes/tardanzaRoutes';
import { asistenciaController } from './Controllers/asistenciaController';
import { usuarioController } from './Controllers/usuarioController';

import passport from 'passport';
import dotenv from 'dotenv';
const pass = require('./auth/passport');
const JwtStrategy = require('passport-strategy');
const ExtractJwt = require('passport-jwt').ExtractJwt;


var bodyParser = require('body-parser');
var app = express();
//app.use(cors);

//difinicion de la clase para el lado del servidor
class Server {
  public app: Application;

  constructor() {
    //inicializa express
    dotenv.config();
    this.app = express();
    require('./auth/passport');
    this.config();
    this.routes();
  }
  //configurar la propiedad app
  config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(cors());
  }
  //difinir las rutas detscl servidor
  routes(): void {
    //this.app.use(bodyParser.json());
    //this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/', indexRoutes);
    this.app.use('/api/prueba', pruebaRoutes);
    this.app.use('/api/personal', personalRoutes);
    this.app.use('/api/institucion', institucionRoutes);
    this.app.use('/api/justificacion', justificacionRoutes);
    this.app.use('/api/licencia', licenciaRoutes);
    this.app.use('/api/permiso', permisoRoutes);
    this.app.use('/api/vacaciones', vacacionesRoutes);
    this.app.use('/api/asistencia', asistenciaRoutes);
    this.app.use('/api/usuario', usuarioRoutes);
    this.app.use('/api/tardanza', tardanzaRoutes);
    this.app.use('', usuarioRoutes);
    //this.app.use(morgan('dev'));
    //this.app.use(cors());
  }
  //iniciar el servidor
  start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'));
    });
  }
}

//ejcutar la clase
const server = new Server();
server.start();
