import { Request, Response } from 'express';
import pool from '../database';

class JustificacionController {
  public async listarJustificacion(req: Request, res: Response) {
    const institucionLista = await pool.query('SELECT * FROM justificacion');
    res.json(institucionLista);
  }
  public async getOneJustificacion(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const unaInstitucion = await pool.query(
      'SELECT * FROM justificacion WHERE idJust = ?',
      [id]
    );
    if (unaInstitucion.length > 0) {
      return res.json(unaInstitucion[0]);
    }
    res.status(404).json({ text: 'La justificacion no existe' });
  }
  public async crearJustificacion(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO justificacion set ?', [req.body]);
    console.log(req.body);
    res.json({ message: 'Justificacion creada' });
  }
  public async modificarJustificacion(
    req: Request,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    await pool.query('UPDATE justificacion set ? WHERE idJust = ?', [
      req.body,
      id,
    ]);
    res.json({ message: 'La Justificacion fue Actualizada' });
  }
  public async borrarJustificacion(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('DELETE FROM justificacion WHERE idJust = ?', [id]);
    res.json({ message: 'La justificacion ha sido borrada' });
  }
}

export const justificacionController = new JustificacionController();
