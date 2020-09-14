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
exports.tardanzaController = void 0;
const database_1 = __importDefault(require("../database"));
class TardanzaController {
    listarTardanza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tardanzaLista = yield database_1.default.query('SELECT * FROM tardanza');
            res.json(tardanzaLista);
        });
    }
    listarTardanzaUnoSolo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tardanzaLista = yield database_1.default.query('SELECT * FROM tardanza where idPers = ?', [id]);
            res.json(tardanzaLista);
        });
    }
    getOneTardanza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const unaTardanza = yield database_1.default.query('SELECT * FROM tardanza WHERE idTard = ?', [id]);
            if (unaTardanza.length > 0) {
                return res.json(unaTardanza[0]);
            }
            res.status(404).json({ text: 'La tardanza no existe' });
        });
    }
    crearTardanza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tardanza set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Tardanza creado' });
        });
    }
    modificarTardanza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tardanza set ? WHERE idTard = ?', [req.body, id]);
            res.json({ message: 'La tardanza fue Actualizada' });
        });
    }
    borrarTardanza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM tardanza WHERE idTard = ?', [id]);
            res.json({ message: 'La tardanza ha sido borrada' });
        });
    }
}
exports.tardanzaController = new TardanzaController();
