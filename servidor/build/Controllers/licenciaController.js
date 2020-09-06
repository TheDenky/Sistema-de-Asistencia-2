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
exports.licenciaController = void 0;
const database_1 = __importDefault(require("../database"));
class LicenciaController {
    listarLicencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const licenciaLista = yield database_1.default.query('SELECT * FROM licencia');
            res.json(licenciaLista);
        });
    }
    getOneLicencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const unaLicencia = yield database_1.default.query('SELECT * FROM licencia WHERE idLice = ?', [id]);
            if (unaLicencia.length > 0) {
                return res.json(unaLicencia[0]);
            }
            res.status(404).json({ text: 'La licencia no existe' });
        });
    }
    crearLicencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO licencia set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Licencia creada' });
        });
    }
    modificarLicencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE licencia set ? WHERE idLice = ?', [req.body, id]);
            res.json({ message: 'La licencia fue Actualizada' });
        });
    }
    borrarLicencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM licencia WHERE idLice = ?', [id]);
            res.json({ message: 'La licencia ha sido borrada' });
        });
    }
}
exports.licenciaController = new LicenciaController();
