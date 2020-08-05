'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.vacacionesController = void 0;
const database_1 = __importDefault(require('../database'));
class VacacionesController {
  listarVacaciones(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const licenciaLista = yield database_1.default.query(
        'SELECT * FROM vacaciones'
      );
      res.json(licenciaLista);
    });
  }
  getOneVacacion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { id } = req.params;
      const unaVacacion = yield database_1.default.query(
        'SELECT * FROM vacaciones WHERE idVaca = ?',
        [id]
      );
      if (unaVacacion.length > 0) {
        return res.json(unaVacacion[0]);
      }
      res.status(404).json({ text: 'La Vacacion no existe' });
    });
  }
  crearVacacion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      yield database_1.default.query('INSERT INTO vacaciones set ?', [
        req.body,
      ]);
      console.log(req.body);
      res.json({ message: 'Vacacion creada' });
    });
  }
  modificarVacacion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { id } = req.params;
      yield database_1.default.query(
        'UPDATE vacaciones set ? WHERE idVaca = ?',
        [req.body, id]
      );
      res.json({ message: 'La Vacacion fue Actualizada' });
    });
  }
  borrarVacacion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { id } = req.params;
      yield database_1.default.query(
        'DELETE FROM vacaciones WHERE idVaca = ?',
        [id]
      );
      res.json({ message: 'La vacacion ha sido borrada' });
    });
  }
}
exports.vacacionesController = new VacacionesController();
