import { Router } from 'express';
import { usuarioController } from '../Controllers/usuarioController';

class UsuarioRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.post('/register', usuarioController.create);
    this.router.post('/login', usuarioController.login);
    this.router.post('/logout', usuarioController.salir);
    this.router.post('/refresh', usuarioController.refresh);
    this.router.get('/', usuarioController.listarUsuario);
    this.router.get('/:id', usuarioController.getOneUsuario);
    this.router.get('/logged/:id', usuarioController.getUsuarioLogged);
    this.router.post('/', usuarioController.crearUsuario);
    this.router.put('/:id', usuarioController.modificarUsuario);
    this.router.delete('/:id', usuarioController.borrarUsuario);
  }
}
const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
