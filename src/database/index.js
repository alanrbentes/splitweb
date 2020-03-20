import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/User';
import Cliente from '../app/models/Cliente';
import Aparelho from '../app/models/Aparelho';
import OrdemServico from '../app/models/OrdemServico';

const models = [User, Cliente, Aparelho, OrdemServico];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
