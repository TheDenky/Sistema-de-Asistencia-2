import { Request, Response } from 'express';
import pool from '../database';

class VacacionesController {
  public async listarVacaciones(req: Request, res: Response) {
    const licenciaLista = await pool.query('SELECT * FROM vacaciones');
    res.json(licenciaLista);
  }
  public async getOneVacacion(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const unaVacacion = await pool.query(
      'SELECT * FROM vacaciones WHERE idVaca = ?',
      [id]
    );
    if (unaVacacion.length > 0) {
      return res.json(unaVacacion[0]);
    }
    res.status(404).json({ text: 'La Vacacion no existe' });
  }
  public async crearVacacion(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO vacaciones set ?', [req.body]);
    console.log(req.body);
    res.json({ message: 'Vacacion creada' });
  }
  public async modificarVacacion(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('UPDATE vacaciones set ? WHERE idVaca = ?', [
      req.body,
      id,
    ]);
    res.json({ message: 'La Vacacion fue Actualizada' });
  }
  public async borrarVacacion(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('DELETE FROM vacaciones WHERE idVaca = ?', [id]);
    res.json({ message: 'La vacacion ha sido borrada' });
  }
}

export const vacacionesController = new VacacionesController();
