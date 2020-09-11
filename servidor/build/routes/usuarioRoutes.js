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
        this.router.get('/', usuarioController_1.usuarioController.listarUsuario);
        this.router.get('/:id', usuarioController_1.usuarioController.getOneUsuario);
        this.router.post('/', usuarioController_1.usuarioController.crearUsuario);
        this.router.put('/:id', usuarioController_1.usuarioController.modificarUsuario);
        this.router.delete('/:id', usuarioController_1.usuarioController.borrarUsuario);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
