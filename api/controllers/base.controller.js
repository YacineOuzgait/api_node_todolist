const services = require('../services');

class BaseController {

    constructor() {

        this.name = this.constructor.name.replace(`Controller`, ``);
        this.table = this.name.toLowerCase();
        this.service = new services[this.table]();

    }

    getAll = async () => {
        // const service = new BaseService();
        // service.test();
        const result = await this.service.select();
        return result;
    }

    getOne = async (id) => {
        // const service = new BaseService();
        // service.test();
        const result = await this.service.getOne(id);
        return result;
    }

    postOneOrMany = async (params) => {
        const result = await this.service.insert(params);
        return result;
    }

    updateWhere = async (params) => {
        const result = await this.service.update(params);
        return result;
    };

    deleteOne = async (id) => {
        return `delete one ${this.table} row with id=${id}`;
    };

}

module.exports = BaseController;