"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../Controllers/usuarioController"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/register', usuarioController_1.default.create);
        this.router.post('/login', usuarioController_1.default.login);
        this.router.post('/logout', usuarioController_1.default.salir);
        this.router.post('refresh', usuarioController_1.default.refresh);
        this.router.get('/home', usuarioController_1.default.inicio);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
