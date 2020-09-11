"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const institucionController_1 = require("../Controllers/institucionController");
class InstitucionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', institucionController_1.institucionController.listarInstitucion);
        this.router.get('/:id', institucionController_1.institucionController.getOneInstitucion);
        this.router.post('/', institucionController_1.institucionController.crearInstitucion);
        this.router.put('/:id', institucionController_1.institucionController.modificarInstitucion);
        this.router.delete('/:id', institucionController_1.institucionController.borrarInstitucion);
    }
}
const institucionRoutes = new InstitucionRoutes();
exports.default = institucionRoutes.router;
