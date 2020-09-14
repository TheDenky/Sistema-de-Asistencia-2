"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permisoController = void 0;
const database_1 = __importDefault(require("../database"));
class PermisoController {
    listarPermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const permisoLista = yield database_1.default.query('SELECT * FROM permiso');
            res.json(permisoLista);
        });
    }
    listarPermisoUnoSolo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const permisoLista = yield database_1.default.query('SELECT * FROM permiso where idPers = ?', [id]);
            res.json(permisoLista);
        });
    }
    getOnePermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const unPermiso = yield database_1.default.query('SELECT * FROM permiso WHERE idPerm = ?', [id]);
            if (unPermiso.length > 0) {
                return res.json(unPermiso[0]);
            }
            res.status(404).json({ text: 'El permiso no existe' });
        });
    }
    crearPermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO permiso set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Permiso creado' });
        });
    }
    modificarPermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE permiso set ? WHERE idPerm = ?', [req.body, id]);
            res.json({ message: 'El permiso fue Actualizado' });
        });
    }
    borrarPermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM permiso WHERE idPerm = ?', [id]);
            res.json({ message: 'El permiso ha sido borrado' });
        });
    }
}
exports.permisoController = new PermisoController();
