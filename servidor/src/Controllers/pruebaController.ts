import { Request, Response } from 'express';
import pool from '../database';

class PruebaController {
  public index(req: Request, res: Response) {
    pool.query('DESCRIBE usuario');
    res.json('usuario');
  }
}
const pruebaController = new PruebaController();
export default pruebaController;
