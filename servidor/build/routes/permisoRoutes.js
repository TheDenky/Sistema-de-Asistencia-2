"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permisoController_1 = require("../Controllers/permisoController");
class PermisoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', permisoController_1.permisoController.listarPermiso);
        this.router.get('/:id', permisoController_1.permisoController.getOnePermiso);
        this.router.post('/', permisoController_1.permisoController.crearPermiso);
        this.router.put('/:id', permisoController_1.permisoController.modificarPermiso);
        this.router.delete('/:id', permisoController_1.permisoController.borrarPermiso);
    }
}
const permisoRoutes = new PermisoRoutes();
exports.default = permisoRoutes.router;
