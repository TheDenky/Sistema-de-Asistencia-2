import { Router } from 'express';

import { personalController } from '../Controllers/personalController';

class PersonalRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get('/', personalController.list);
    this.router.get('/cons/', personalController.listConsolidada);
    this.router.get('/asis/', personalController.listAsistencia);
    this.router.get('/:id', personalController.getOnePersonal);
    this.router.post('/', personalController.create);
    this.router.put('/:id', personalController.update);
    this.router.delete('/:id', personalController.delete);
  }
}
const personalRoutes = new PersonalRoutes();
export default personalRoutes.router;
