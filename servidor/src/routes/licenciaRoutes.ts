import { Router } from 'express';
import { licenciaController } from '../Controllers/licenciaController';

class LicenciaRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get('/', licenciaController.listarLicencia);
    this.router.get('/:id', licenciaController.getOneLicencia);
    this.router.post('/', licenciaController.crearLicencia);
    this.router.put('/:id', licenciaController.modificarLicencia);
    this.router.delete('/:id', licenciaController.borrarLicencia);
  }
}
const licenciaRoutes = new LicenciaRoutes();
export default licenciaRoutes.router;
