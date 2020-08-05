import { Request, Response } from 'express';
import pool from '../database';

class InstitucionController {
  public async listarInstitucion(req: Request, res: Response) {
    const institucionLista = await pool.query('SELECT * FROM institucion');
    res.json(institucionLista);
  }
  public async getOneInstitucion(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const unaInstitucion = await pool.query(
      'SELECT * FROM institucion WHERE idInst = ?',
      [id]
    );
    if (unaInstitucion.length > 0) {
      return res.json(unaInstitucion[0]);
    }
    res.status(404).json({ text: 'La institucion no existe' });
  }
  public async crearInstitucion(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO institucion set ?', [req.body]);
    console.log(req.body);
    res.json({ message: 'Institucion creado' });
  }
  public async modificarInstitucion(
    req: Request,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    await pool.query('UPDATE institucion set ? WHERE idInst = ?', [
      req.body,
      id,
    ]);
    res.json({ message: 'La institucion fue Actualizado' });
  }
  public async borrarInstitucion(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('DELETE FROM institucion WHERE idInst = ?', [id]);
    res.json({ message: 'La institucion ha sido borrado' });
  }
}

export const institucionController = new InstitucionController();
