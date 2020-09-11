"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asistenciaController_1 = require("../Controllers/asistenciaController");
class AsistenciaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', asistenciaController_1.asistenciaController.listarAsistencia);
        this.router.get('/:id', asistenciaController_1.asistenciaController.getOneAsistencia);
        this.router.post('/', asistenciaController_1.asistenciaController.crearAsistencia);
        this.router.put('/:id', asistenciaController_1.asistenciaController.modificarAsistencia);
        this.router.delete('/:id', asistenciaController_1.asistenciaController.borrarAsistencia);
    }
}
const asistenciaRoutes = new AsistenciaRoutes();
exports.default = asistenciaRoutes.router;
