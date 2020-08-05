'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const personalController_1 = require('../Controllers/personalController');
class PersonalRoutes {
  constructor() {
    this.router = express_1.Router();
    this.config();
  }
  config() {
    this.router.get('/', personalController_1.personalController.list);
    this.router.get(
      '/:id',
      personalController_1.personalController.getOnePersonal
    );
    this.router.post('/', personalController_1.personalController.create);
    this.router.put('/:id', personalController_1.personalController.update);
    this.router.delete('/:id', personalController_1.personalController.delete);
  }
}
const personalRoutes = new PersonalRoutes();
exports.default = personalRoutes.router;
