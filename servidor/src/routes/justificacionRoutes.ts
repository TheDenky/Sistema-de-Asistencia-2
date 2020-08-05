import { Router } from 'express';
import { justificacionController } from '../Controllers/justificacionController';

class JustificacionRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get('/', justificacionController.listarJustificacion);
    this.router.get('/:id', justificacionController.getOneJustificacion);
    this.router.post('/', justificacionController.crearJustificacion);
    this.router.put('/:id', justificacionController.modificarJustificacion);
    this.router.delete('/:id', justificacionController.borrarJustificacion);
  }
}
const justificacionRoutes = new JustificacionRoutes();
export default justificacionRoutes.router;
