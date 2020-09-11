"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const justificacionController_1 = require("../Controllers/justificacionController");
class JustificacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', justificacionController_1.justificacionController.listarJustificacion);
        this.router.get('/:id', justificacionController_1.justificacionController.getOneJustificacion);
        this.router.post('/', justificacionController_1.justificacionController.crearJustificacion);
        this.router.put('/:id', justificacionController_1.justificacionController.modificarJustificacion);
        this.router.delete('/:id', justificacionController_1.justificacionController.borrarJustificacion);
    }
}
const justificacionRoutes = new JustificacionRoutes();
exports.default = justificacionRoutes.router;
