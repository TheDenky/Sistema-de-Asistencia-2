"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const licenciaController_1 = require("../Controllers/licenciaController");
class LicenciaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', licenciaController_1.licenciaController.listarLicencia);
        this.router.get('/:id', licenciaController_1.licenciaController.getOneLicencia);
        this.router.post('/', licenciaController_1.licenciaController.crearLicencia);
        this.router.put('/:id', licenciaController_1.licenciaController.modificarLicencia);
        this.router.delete('/:id', licenciaController_1.licenciaController.borrarLicencia);
    }
}
const licenciaRoutes = new LicenciaRoutes();
exports.default = licenciaRoutes.router;
