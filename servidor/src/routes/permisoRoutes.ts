import { Router } from 'express';
import { permisoController } from '../Controllers/permisoController';

class PermisoRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get('/', permisoController.listarPermiso);
    this.router.get('/my/:id', permisoController.listarPermisoUnoSolo);
    this.router.get('/:id', permisoController.getOnePermiso);
    this.router.post('/', permisoController.crearPermiso);
    this.router.put('/:id', permisoController.modificarPermiso);
    this.router.delete('/:id', permisoController.borrarPermiso);
  }
}
const permisoRoutes = new PermisoRoutes();
export default permisoRoutes.router;
