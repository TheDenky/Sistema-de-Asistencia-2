import { Request, Response } from 'express';
import pool from '../database';

class LicenciaController {
  public async listarLicencia(req: Request, res: Response) {
    const licenciaLista = await pool.query('SELECT * FROM licencia');
    res.json(licenciaLista);
  }
  public async listarLicenciaNombres(req: Request, res: Response) {
    const licenciaLista = await pool.query('select idlice, l.idPers, tipoLice, motiLice, fechIniLice, fechFinLice, obseLice, dniPers, concat(p.nombPers," ",p.apelPatePers," ",p.apelMatePers) as "ApellidosyNombres" from licencia l inner join personal p on l.idPers = p.idPers');
    res.json(licenciaLista);
  }
  public async getOneLicencia(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const unaLicencia = await pool.query(
      'SELECT * FROM licencia WHERE idLice = ?',
      [id]
    );
    if (unaLicencia.length > 0) {
      return res.json(unaLicencia[0]);
    }
    res.status(404).json({ text: 'La licencia no existe' });
  }
  public async crearLicencia(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO licencia set ?', [req.body]);
    console.log(req.body);
    res.json({ message: 'Licencia creada' });
  }
  public async modificarLicencia(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('UPDATE licencia set ? WHERE idLice = ?', [req.body, id]);
    res.json({ message: 'La licencia fue Actualizada' });
  }
  public async borrarLicencia(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('DELETE FROM licencia WHERE idLice = ?', [id]);
    res.json({ message: 'La licencia ha sido borrada' });
  }
}

export const licenciaController = new LicenciaController();
