import { Request, Response } from 'express';
import pool from '../database';

class PermisoController {
  public async listarPermiso(req: Request, res: Response) {
    const permisoLista = await pool.query('SELECT * FROM permiso');
    res.json(permisoLista);
  }
  public async listarPermisoNombre(req: Request, res: Response) {
    const permisoLista = await pool.query('select idPerm, p.idPers, dniPers, concat(pe.nombPers," ",pe.apelPatePers," ",pe.apelMatePers) as "ApellidosyNombres", p.horaPerm, p.minutoPerm, p.fechaPerm, p.obsePerm, p.motiPerm from permiso p inner join personal pe on p.idPers = pe.idPers');
    res.json(permisoLista);
  }
  
  public async listarPermisoUnoSolo(req: Request, res: Response) {
    const { id } = req.params;
    const permisoLista = await pool.query('SELECT * FROM permiso where idPers = ?', [id]);
    res.json(permisoLista);
  }
  public async getOnePermiso(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const unPermiso = await pool.query(
      'SELECT * FROM permiso WHERE idPerm = ?',
      [id]
    );
    if (unPermiso.length > 0) {
      return res.json(unPermiso[0]);
    }
    res.status(404).json({ text: 'El permiso no existe' });
  }
  public async crearPermiso(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO permiso set ?', [req.body]);
    console.log(req.body);
    res.json({ message: 'Permiso creado' });
  }
  public async modificarPermiso(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('UPDATE permiso set ? WHERE idPerm = ?', [req.body, id]);
    res.json({ message: 'El permiso fue Actualizado' });
  }
  public async borrarPermiso(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('DELETE FROM permiso WHERE idPerm = ?', [id]);
    res.json({ message: 'El permiso ha sido borrado' });
  }
}

export const permisoController = new PermisoController();
