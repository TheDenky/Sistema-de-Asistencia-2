import { Request, Response } from 'express';
import pool from '../database';

class AsistenciaController {
  public async listarAsistencia(req: Request, res: Response) {
    const asistenciaLista = await pool.query('SELECT * FROM asistencia');
    res.json(asistenciaLista);
  }
  public async getOneAsistencia(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const unaAsistencia = await pool.query(
      'SELECT * FROM asistencia WHERE idAsis = ?',
      [id]
    );
    if (unaAsistencia.length > 0) {
      return res.json(unaAsistencia[0]);
    }
    res.status(404).json({ text: 'La asistencia no existe' });
  }
  public async crearAsistencia(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO asistencia set ?', [req.body]);
    console.log(req.body);
    res.json({ message: 'Asistencia creada' });
  }
  public async modificarAsistencia(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('UPDATE asistencia set ? WHERE idAsis = ?', [
      req.body,
      id,
    ]);
    res.json({ message: 'La Asistencia fue Actualizada' });
  }
  public async borrarAsistencia(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('DELETE FROM asistencia WHERE idAsis = ?', [id]);
    res.json({ message: 'La asistencia ha sido borrada' });
  }
}

export const asistenciaController = new AsistenciaController();
