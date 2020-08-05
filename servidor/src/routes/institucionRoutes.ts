import { Router } from 'express';
import { institucionController } from '../Controllers/institucionController';

class InstitucionRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get('/', institucionController.listarInstitucion);
    this.router.get('/:id', institucionController.getOneInstitucion);
    this.router.post('/', institucionController.crearInstitucion);
    this.router.put('/:id', institucionController.modificarInstitucion);
    this.router.delete('/:id', institucionController.borrarInstitucion);
  }
}
const institucionRoutes = new InstitucionRoutes();
export default institucionRoutes.router;
