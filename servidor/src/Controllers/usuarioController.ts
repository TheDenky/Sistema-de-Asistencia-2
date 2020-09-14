import { Request, Response } from 'express';
import pool from '../database';
import helper from '../auth/helpers';
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

const refreshTokens: any = {};

class UsuarioController {
  public async listarUsuario(req: Request, res: Response) {
    const UsuarioLista = await pool.query('SELECT * FROM usuario');
    res.json(UsuarioLista);
  }

  public async getUsuarioLogged(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const unUsuario = await pool.query(
      'SELECT p.idPers, i.idInst, i.codiModuInst, u.tipoUsua, u.estaUsua, p.dniPers, p.apelPatePers, p.apelMatePers, p.nombPers, p.cargPers, p.contLaboPers, p.fotoPers, i.nombInst, i.numeInst, i.niveEduInst, i.modaInst, i.turnInst, i.direInst FROM usuario u inner join personal p on u.idPers = p.idPers inner join institucion i on u.idInst = i.idInst WHERE usuaUsua = ?',
      [id]
    );
    if (unUsuario.length > 0) {
      return res.json(unUsuario[0]);
    }
    res.status(404).json({ text: 'El usuario no existe' });
  }

  public async login(req: Request, res: Response, done: any): Promise<any> {
    const { username, password } = req.body;
    const usuario = await pool.query(
      'SELECT p.idPers, i.idInst, i.codiModuInst, u.usuaUsua, u.passUsua, u.tipoUsua, u.estaUsua, p.dniPers, p.apelPatePers, p.apelMatePers, p.nombPers, p.cargPers, p.contLaboPers, p.fotoPers, i.nombInst, i.numeInst, i.niveEduInst, i.modaInst, i.turnInst, i.direInst FROM usuario u inner join personal p on u.idPers = p.idPers inner join institucion i on u.idInst = i.idInst WHERE usuaUsua = ?',
      [username]
    );
    console.log(usuario.length);
    const user = usuario[0];
    console.log(user);
    if (user === undefined) {
      console.log('Usuario no existe');
      return done(undefined, false, {
        message: `username ${username} no encontrado`,
      });
    } else {
      const equals = await helper.matchPassword(password, user.passUsua);
      if (!equals) {
        return done({ message: `password ${user.password} incorrecto` });
      } else {
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
          expiresIn: 600,
        });
        const refreshToken = randtoken.uid(256);
        refreshTokens[refreshToken] = username;
        res.json({ jwt: token, refreshToken: refreshToken });
        //this.getOneUsuario(user.idPers, user);
      }
    }
  }

  public async createAdmin(req: Request, res: Response): Promise<void> {
    const user = req.body;
    //res.json(user);
    //const { username, password, estado, tipo } = req.body;
    const encriptada = await helper.encryptPassword(user.passUsua);
    //res.json(encriptada);
    const result = await pool.query(
      'INSERT INTO usuario(idPers, idInst, usuaUsua, passUsua, tipoUsua, estaUsua) values(?,?,?,?,?,?)',
      ['9', '3', user.usuaUsua, encriptada, 'Docente', 'Activo' ]
    );
    res.json({message : 'Usuario guardado'});
  }

  public async create(req: Request, res: Response): Promise<void> {
    const {idPers, idInst, usuaUsua, passUsua, tipoUsua, estaUsua } = req.body;
    const encriptada = await helper.encryptPassword(passUsua);

    //const {id} = req.headers;
    //console.log(id); 

    const result = await pool.query(
      'INSERT INTO usuario(idPers, idInst, usuaUsua, passUsua, tipoUsua, estaUsua) values(?,?,?,?,?,?)',
      [idPers, idInst, usuaUsua, encriptada, tipoUsua, estaUsua ]
    );
    res.json({message : 'Usuario guardado'});
  }

  public salir(req: Request, res: Response) {
    const refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens) {
      delete refreshTokens[refreshToken];
    }
    res.sendStatus(204);
  }

  public refresh(req: Request, res: Response) {
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
    } else {
      res.sendStatus(401);
    }
  }

  public async getOneUsuario(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const unUsuario = await pool.query(
      'SELECT * FROM usuario WHERE idPers = ?',
      [id]
    );
    if (unUsuario.length > 0) {
      return res.json(unUsuario[0]);
    }
    res.status(404).json({ text: 'El usuario no existe' });
  }

  public async crearUsuario(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO usuario set ?', [req.body]);
    console.log(req.body);
    res.json({ message: 'Usuario creado' });
  }
  public async modificarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('UPDATE usuario set ? WHERE idPers = ?', [req.body, id]);
    res.json({ message: 'El usuario fue Actualizado' });
  }
  public async borrarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('DELETE FROM usuario WHERE idPers = ?', [id]);
    res.json({ message: 'El usuario ha sido borrado' });
  }
}

export const usuarioController = new UsuarioController();
