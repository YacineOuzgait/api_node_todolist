const Router = require('express').Router;
const controllers = require('../controllers');

class BaseRouter {

    constructor() {
        this.router = Router();
        this.name = this.constructor.name.replace(`Router`, ``);
        this.table = this.name.toLowerCase();
        this.controller = new controllers[this.table]();
        this.initializeRoutes();
    }

    initializeRoutes = () => {

        this.router.get('/', async (req, res) => {
            const data = await this.controller.getAll();
            res.send(data);
        })

        this.router.get('/:id', async (req, res) => {
            const data = await this.controller.getOne(req.params.id);
            res.send(data);
        })


        this.router.post('/', async (req, res) => {
            const data = await this.controller.postOneOrMany(req.body);
            res.send(data);
        })

        // this.router.put('/:id', async (req, res) => {
        //     const data = await this.controller.crea
        //     res.send();
        // })

        this.router.put("/:id", async (req, res) => {
            const params = { ...req.body, where: `id=${req.params.id}` };
            const response = await this.controller.updateWhere(params);
            res.send(response);
        });

        //update with condition
        this.router.patch("/", async (req, res) => {
            const response = await this.controller.updateWhere(req.body);
            res.send(response);
        });
        //soft delete
        this.router.patch("/:id", async (req, res) => {
            const params = { deleted: "1", where: `id=${req.params.id}` }
            const response = await this.controller.updateWhere(params);
            res.send(response);
        });
        //delete to destroy one row in db table contact
        this.router.delete("/:id", async (req, res) => {
            const response = await this.controller.deleteOne(req.params.id);
            res.send(response);
        });
    }

}

module.exports = BaseRouter;