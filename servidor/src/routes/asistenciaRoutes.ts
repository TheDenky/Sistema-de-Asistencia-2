import { Router } from 'express';
import { asistenciaController } from '../Controllers/asistenciaController';

class AsistenciaRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get('/', asistenciaController.listarAsistencia);
    this.router.get('/logs', asistenciaController.logs);
    this.router.get('/my/:id', asistenciaController.listarAsistenciaUnoSolo);
    this.router.get('/:id', asistenciaController.getOneAsistencia);
    this.router.post('/', asistenciaController.crearAsistencia);
    this.router.put('/:id', asistenciaController.modificarAsistencia);
    this.router.put('/mod/:id', asistenciaController.modificarAsistenciaNuevo);
    this.router.delete('/:id', asistenciaController.borrarAsistencia);
  }
}
const asistenciaRoutes = new AsistenciaRoutes();
export default asistenciaRoutes.router;
