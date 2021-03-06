import { Router } from 'express';
import { tardanzaController } from '../Controllers/tardanzaController';

class TardanzaRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get('/', tardanzaController.listarTardanza);
    this.router.get('/ln', tardanzaController.listarTardanzaNombre);
    this.router.get('/my/:id', tardanzaController.listarTardanzaUnoSolo);
    this.router.get('/:id', tardanzaController.getOneTardanza);
    this.router.post('/', tardanzaController.crearTardanza);
    this.router.put('/:id', tardanzaController.modificarTardanza);
    this.router.delete('/:id', tardanzaController.borrarTardanza);
  }
}
const tardanzaRoutes = new TardanzaRoutes();
export default tardanzaRoutes.router;