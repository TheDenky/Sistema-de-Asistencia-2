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
exports.usuarioController = void 0;
const database_1 = __importDefault(require("../database"));
class UsuarioController {
    listarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const UsuarioLista = yield database_1.default.query('SELECT * FROM usuario');
            res.json(UsuarioLista);
        });
    }
    getOneUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const unUsuario = yield database_1.default.query('SELECT * FROM usuario WHERE idPers = ?', [id]);
            if (unUsuario.length > 0) {
                return res.json(unUsuario[0]);
            }
            res.status(404).json({ text: 'El usuario no existe' });
        });
    }
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO usuario set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Usuario creado' });
        });
    }
    modificarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE usuario set ? WHERE idPers = ?', [req.body, id]);
            res.json({ message: 'El usuario fue Actualizado' });
        });
    }
    borrarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM usuario WHERE idPers = ?', [id]);
            res.json({ message: 'El usuario ha sido borrado' });
        });
    }
}
exports.usuarioController = new UsuarioController();
