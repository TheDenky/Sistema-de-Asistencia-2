"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tardanzaController_1 = require("../Controllers/tardanzaController");
class TardanzaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tardanzaController_1.tardanzaController.listarTardanza);
        this.router.get('/ln', tardanzaController_1.tardanzaController.listarTardanzaNombre);
        this.router.get('/my/:id', tardanzaController_1.tardanzaController.listarTardanzaUnoSolo);
        this.router.get('/:id', tardanzaController_1.tardanzaController.getOneTardanza);
        this.router.post('/', tardanzaController_1.tardanzaController.crearTardanza);
        this.router.put('/:id', tardanzaController_1.tardanzaController.modificarTardanza);
        this.router.delete('/:id', tardanzaController_1.tardanzaController.borrarTardanza);
    }
}
const tardanzaRoutes = new TardanzaRoutes();
exports.default = tardanzaRoutes.router;
