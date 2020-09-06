"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacacionesController_1 = require("../Controllers/vacacionesController");
class VacacionesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', vacacionesController_1.vacacionesController.listarVacaciones);
        this.router.get('/:id', vacacionesController_1.vacacionesController.getOneVacacion);
        this.router.post('/', vacacionesController_1.vacacionesController.crearVacacion);
        this.router.put('/:id', vacacionesController_1.vacacionesController.modificarVacacion);
        this.router.delete('/:id', vacacionesController_1.vacacionesController.borrarVacacion);
    }
}
const vacacionesRoutes = new VacacionesRoutes();
exports.default = vacacionesRoutes.router;
