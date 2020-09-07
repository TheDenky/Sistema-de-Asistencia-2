"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../Controllers/usuarioController");
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/register', usuarioController_1.usuarioController.createAdmin);
        this.router.post('/login', usuarioController_1.usuarioController.login);
        this.router.post('/logout', usuarioController_1.usuarioController.salir);
        this.router.post('/refresh', usuarioController_1.usuarioController.refresh);
        this.router.get('/', usuarioController_1.usuarioController.listarUsuario);
        this.router.get('/:id', usuarioController_1.usuarioController.getOneUsuario);
        this.router.get('/logged/:id', usuarioController_1.usuarioController.getUsuarioLogged);
        this.router.post('/', usuarioController_1.usuarioController.crearUsuario);
        this.router.put('/:id', usuarioController_1.usuarioController.modificarUsuario);
        this.router.delete('/:id', usuarioController_1.usuarioController.borrarUsuario);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
