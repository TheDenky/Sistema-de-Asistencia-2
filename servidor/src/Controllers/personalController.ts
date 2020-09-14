import { Request, Response } from 'express';
import pool from '../database';

class PersonalController {
  public async list(req: Request, res: Response) {
    //res.json({text: 'listing personal'})
    const personalLista = await pool.query('SELECT * FROM personal');
    res.json(personalLista);
  }
  public async listConsolidada(req: Request, res: Response) {
    //res.json({text: 'listing personal'})
    const personalLista = await pool.query('SELECT p.dniPers AS DNI, CONCAT(p.apelPatePers," ",p.apelMatePers," ",p.nombPers) AS "ApellidosyNombres",p.cargPers AS Cargo,p.contLaboPers AS "CondicionLaboral",p.jornLaboPers AS "JornadaLaboral",COUNT(estaAsis) AS Asistencias FROM asistencia a INNER JOIN personal p ON a.idPers=p.idPers  WHERE estaAsis=1 GROUP BY a.idPers');
    res.json(personalLista);
  }
  public async listAsistencia(req: Request, res: Response) {
    //res.json({text: 'listing personal'})
    const personalLista = await pool.query('select dniPers, apelPatePers, apelMatePers, nombPers, cargPers, contLaboPers, jornLaboPers from personal p inner join asistencia a on p.idPers = a.idPers group by p.dniPers');
    res.json(personalLista);
  }
  public async getOnePersonal(req: Request, res: Response): Promise<any> {
    //res.json({text: 'This is a personal' + req.params.id})
    const { id } = req.params;
    const unaPersona = await pool.query(
      'SELECT * FROM personal WHERE idPers = ?',
      [id]
    );

    if (unaPersona.length > 0) {
      return res.json(unaPersona[0]);
    }
    //console.log(unaPersona);
    res.status(404).json({ text: 'El personal no existe' });
  }
  public async create(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO personal set ?', [req.body]);
    console.log(req.body);
    res.json({ message: 'Personal Created' });
  }

  public async update(req: Request, res: Response): Promise<void> {
    //res.json({ text: 'updating a personal' + req.params.id });
    const { id } = req.params;
    await pool.query('UPDATE personal set ? WHERE idPers = ?', [req.body, id]);
    res.json({ message: 'El personal fue actualizado' });
  }
  public async delete(req: Request, res: Response): Promise<void> {
    //res.json({text: 'deleting a personal' + req.params.id });
    const { id } = req.params;
    await pool.query('DELETE FROM personal WHERE idPers = ?', [id]);
    res.json({ message: 'El personal ha sido eliminado' });
  }
}

export const personalController = new PersonalController();
