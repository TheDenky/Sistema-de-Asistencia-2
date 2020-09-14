import { Router } from 'express';
import { vacacionesController } from '../Controllers/vacacionesController';

class VacacionesRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get('/', vacacionesController.listarVacaciones);
    this.router.get('/ln', vacacionesController.listarVacacionesNombres);
    this.router.get('/:id', vacacionesController.getOneVacacion);
    this.router.post('/', vacacionesController.crearVacacion);
    this.router.put('/:id', vacacionesController.modificarVacacion);
    this.router.delete('/:id', vacacionesController.borrarVacacion);
  }
}
const vacacionesRoutes = new VacacionesRoutes();
export default vacacionesRoutes.router;
