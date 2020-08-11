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
exports.institucionController = void 0;
const database_1 = __importDefault(require("../database"));
class InstitucionController {
    listarInstitucion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const institucionLista = yield database_1.default.query('SELECT * FROM institucion');
            res.json(institucionLista);
        });
    }
    getOneInstitucion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const unaInstitucion = yield database_1.default.query('SELECT * FROM institucion WHERE idInst = ?', [id]);
            if (unaInstitucion.length > 0) {
                return res.json(unaInstitucion[0]);
            }
            res.status(404).json({ text: 'La institucion no existe' });
        });
    }
    crearInstitucion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO institucion set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Institucion creado' });
        });
    }
    modificarInstitucion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE institucion set ? WHERE idInst = ?', [
                req.body,
                id,
            ]);
            res.json({ message: 'La institucion fue Actualizado' });
        });
    }
    borrarInstitucion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM institucion WHERE idInst = ?', [id]);
            res.json({ message: 'La institucion ha sido borrado' });
        });
    }
}
exports.institucionController = new InstitucionController();
