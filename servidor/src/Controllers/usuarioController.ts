import { Request, Response } from 'express';
import pool from '../database';

class UsuarioController {
  public async listarUsuario(req: Request, res: Response) {
    const UsuarioLista = await pool.query('SELECT * FROM usuario');
    res.json(UsuarioLista);
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
