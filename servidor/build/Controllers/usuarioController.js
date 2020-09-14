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
const helpers_1 = __importDefault(require("../auth/helpers"));
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const refreshTokens = {};
class UsuarioController {
    listarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const UsuarioLista = yield database_1.default.query('SELECT * FROM usuario');
            res.json(UsuarioLista);
        });
    }
    getUsuarioLogged(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const unUsuario = yield database_1.default.query('SELECT p.idPers, i.idInst, i.codiModuInst, u.tipoUsua, u.estaUsua, p.dniPers, p.apelPatePers, p.apelMatePers, p.nombPers, p.cargPers, p.contLaboPers, p.fotoPers, i.nombInst, i.numeInst, i.niveEduInst, i.modaInst, i.turnInst, i.direInst FROM usuario u inner join personal p on u.idPers = p.idPers inner join institucion i on u.idInst = i.idInst WHERE usuaUsua = ?', [id]);
            if (unUsuario.length > 0) {
                return res.json(unUsuario[0]);
            }
            res.status(404).json({ text: 'El usuario no existe' });
        });
    }
    login(req, res, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const usuario = yield database_1.default.query('SELECT p.idPers, i.idInst, i.codiModuInst, u.usuaUsua, u.passUsua, u.tipoUsua, u.estaUsua, p.dniPers, p.apelPatePers, p.apelMatePers, p.nombPers, p.cargPers, p.contLaboPers, p.fotoPers, i.nombInst, i.numeInst, i.niveEduInst, i.modaInst, i.turnInst, i.direInst FROM usuario u inner join personal p on u.idPers = p.idPers inner join institucion i on u.idInst = i.idInst WHERE usuaUsua = ?', [username]);
            console.log(usuario.length);
            const user = usuario[0];
            console.log(user);
            if (user === undefined) {
                console.log('Usuario no existe');
                return done(undefined, false, {
                    message: `username ${username} no encontrado`,
                });
            }
            else {
                const equals = yield helpers_1.default.matchPassword(password, user.passUsua);
                if (!equals) {
                    return done({ message: `password ${user.password} incorrecto` });
                }
                else {
                    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
                        expiresIn: 600,
                    });
                    const refreshToken = randtoken.uid(256);
                    refreshTokens[refreshToken] = username;
                    res.json({ jwt: token, refreshToken: refreshToken });
                    //this.getOneUsuario(user.idPers, user);
                }
            }
        });
    }
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            //res.json(user);
            //const { username, password, estado, tipo } = req.body;
            const encriptada = yield helpers_1.default.encryptPassword(user.passUsua);
            //res.json(encriptada);
            const result = yield database_1.default.query('INSERT INTO usuario(idPers, idInst, usuaUsua, passUsua, tipoUsua, estaUsua) values(?,?,?,?,?,?)', ['9', '3', user.usuaUsua, encriptada, 'Docente', 'Activo']);
            res.json({ message: 'Usuario guardado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPers, idInst, usuaUsua, passUsua, tipoUsua, estaUsua } = req.body;
            const encriptada = yield helpers_1.default.encryptPassword(passUsua);
            //const {id} = req.headers;
            //console.log(id); 
            const result = yield database_1.default.query('INSERT INTO usuario(idPers, idInst, usuaUsua, passUsua, tipoUsua, estaUsua) values(?,?,?,?,?,?)', [idPers, idInst, usuaUsua, encriptada, tipoUsua, estaUsua]);
            res.json({ message: 'Usuario guardado' });
        });
    }
    salir(req, res) {
        const refreshToken = req.body.refreshToken;
        if (refreshToken in refreshTokens) {
            delete refreshTokens[refreshToken];
        }
        res.sendStatus(204);
    }
    refresh(req, res) {
        const refreshToken = req.body.refreshToken;
        if (refreshToken in refreshTokens) {
            const user = {
                username: refreshTokens[refreshToken],
                role: 'admin',
            };
            const token = jwt.sign(user, process.env.TOKEN_SECRET, {
                expiresIn: 600,
            });
            res.json({ jwt: token });
        }
        else {
            res.sendStatus(401);
        }
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
