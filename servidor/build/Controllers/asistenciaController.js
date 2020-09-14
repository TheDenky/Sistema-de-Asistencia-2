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
exports.asistenciaController = void 0;
const database_1 = __importDefault(require("../database"));
class AsistenciaController {
    listarAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const asistenciaLista = yield database_1.default.query('SELECT * FROM asistencia');
            res.json(asistenciaLista);
        });
    }
    listarAsistenciaUnoSolo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const asistenciaLista = yield database_1.default.query('SELECT * FROM asistencia where idPers = ?', [id]);
            res.json(asistenciaLista);
        });
    }
    logs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const asistenciaLogs = yield database_1.default.query('select nombInst, nombPers, apelPatePers, apelMatePers,fechaLog, estadoAsisNuev, estadoAsisViej, acciLog from (log l inner join personal p on l.idPers = p.idPers) inner join institucion i on i.idInst = l.idIns');
            res.json(asistenciaLogs);
        });
    }
    getOneAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const unaAsistencia = yield database_1.default.query('SELECT * FROM asistencia WHERE idAsis = ?', [id]);
            if (unaAsistencia.length > 0) {
                return res.json(unaAsistencia[0]);
            }
            res.status(404).json({ text: 'La asistencia no existe' });
        });
    }
    crearAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO asistencia set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Asistencia creada' });
        });
    }
    modificarAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE asistencia set ? WHERE idAsis = ?', [
                req.body,
                id,
            ]);
            res.json({ message: 'La Asistencia fue Actualizada' });
        });
    }
    modificarAsistenciaNuevo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE asistencia set ? WHERE idAsis = ?', [
                req.body,
                id,
            ]);
            res.json({ message: 'La Asistencia fue Actualizada' });
        });
    }
    borrarAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM asistencia WHERE idAsis = ?', [id]);
            res.json({ message: 'La asistencia ha sido borrada' });
        });
    }
}
exports.asistenciaController = new AsistenciaController();
