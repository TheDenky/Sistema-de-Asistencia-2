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
exports.personalController = void 0;
const database_1 = __importDefault(require("../database"));
class PersonalController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'listing personal'})
            const personalLista = yield database_1.default.query('SELECT * FROM personal');
            res.json(personalLista);
        });
    }
    listConsolidada(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'listing personal'})
            const personalLista = yield database_1.default.query('SELECT p.dniPers AS DNI, CONCAT(p.apelPatePers," ",p.apelMatePers," ",p.nombPers) AS "ApellidosyNombres",p.cargPers AS Cargo,p.contLaboPers AS "CondicionLaboral",p.jornLaboPers AS "JornadaLaboral",COUNT(estaAsis) AS Asistencias FROM asistencia a INNER JOIN personal p ON a.idPers=p.idPers  WHERE estaAsis=1 GROUP BY a.idPers');
            res.json(personalLista);
        });
    }
    listAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'listing personal'})
            const personalLista = yield database_1.default.query('select dniPers, apelPatePers, apelMatePers, nombPers, cargPers, contLaboPers, jornLaboPers from personal p inner join asistencia a on p.idPers = a.idPers group by p.dniPers');
            res.json(personalLista);
        });
    }
    getOnePersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'This is a personal' + req.params.id})
            const { id } = req.params;
            const unaPersona = yield database_1.default.query('SELECT * FROM personal WHERE idPers = ?', [id]);
            if (unaPersona.length > 0) {
                return res.json(unaPersona[0]);
            }
            //console.log(unaPersona);
            res.status(404).json({ text: 'El personal no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO personal set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Personal Created' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({ text: 'updating a personal' + req.params.id });
            const { id } = req.params;
            yield database_1.default.query('UPDATE personal set ? WHERE idPers = ?', [req.body, id]);
            res.json({ message: 'El personal fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'deleting a personal' + req.params.id });
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM personal WHERE idPers = ?', [id]);
            res.json({ message: 'El personal ha sido eliminado' });
        });
    }
}
exports.personalController = new PersonalController();
