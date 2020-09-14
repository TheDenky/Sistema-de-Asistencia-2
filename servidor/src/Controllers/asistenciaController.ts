import { Request, Response } from 'express';
import pool from '../database';

class AsistenciaController {
  public async listarAsistencia(req: Request, res: Response) {
    const asistenciaLista = await pool.query('SELECT * FROM asistencia');
    res.json(asistenciaLista);
  }
  public async listarAsistenciaNombres(req: Request, res: Response) {
    const asistenciaLista = await pool.query('select idAsis, dniPers, idInst, concat(p.nombPers," ",p.apelPatePers," ",p.apelMatePers) as "ApellidosyNombres", estaAsis, fechAsis from asistencia a inner join personal p on a.idPers = p.idPers;');
    res.json(asistenciaLista);
  }
  public async listarAsistenciaUnoSolo(req: Request, res: Response) {
    const { id } = req.params;
    const asistenciaLista = await pool.query('SELECT * FROM asistencia where idPers = ?', [id]);
    res.json(asistenciaLista);
  }
  public async logs(req: Request, res: Response) {
    const asistenciaLogs = await pool.query('select nombInst, nombPers, apelPatePers, apelMatePers,fechaLog, estadoAsisNuev, estadoAsisViej, acciLog from (log l inner join personal p on l.idPers = p.idPers) inner join institucion i on i.idInst = l.idIns');
    res.json(asistenciaLogs);
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
  public async modificarAsistenciaNuevo(req: Request, res: Response): Promise<void> {
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
