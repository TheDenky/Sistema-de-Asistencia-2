"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({ text: 'API IS  /api/personal' });
        //res.send("Hello")
    }
}
exports.indexController = new IndexController();
