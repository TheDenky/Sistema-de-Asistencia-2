import { Request, Response } from 'express';
import pool from '../database';

class TardanzaController {
  public async listarTardanza(req: Request, res: Response) {
    const tardanzaLista = await pool.query('SELECT * FROM tardanza');
    res.json(tardanzaLista);
  }
  public async getOneTardanza(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const unaTardanza = await pool.query(
      'SELECT * FROM tardanza WHERE idTard = ?',
      [id]
    );
    if (unaTardanza.length > 0) {
      return res.json(unaTardanza[0]);
    }
    res.status(404).json({ text: 'La tardanza no existe' });
  }
  public async crearTardanza(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO tardanza set ?', [req.body]);
    console.log(req.body);
    res.json({ message: 'Tardanza creado' });
  }
  public async modificarTardanza(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('UPDATE tardanza set ? WHERE idTard = ?', [req.body, id]);
    res.json({ message: 'La tardanza fue Actualizada' });
  }
  public async borrarTardanza(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('DELETE FROM tardanza WHERE idTard = ?', [id]);
    res.json({ message: 'La tardanza ha sido borrada' });
  }
}

export const tardanzaController = new TardanzaController();