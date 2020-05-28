"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Aparelho extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                user_id: _sequelize2.default.INTEGER,
                id_cliente: _sequelize2.default.INTEGER,
                modelo: _sequelize2.default.STRING,
                descricao: _sequelize2.default.STRING,
                local_instalacao: _sequelize2.default.STRING,
                canceled_at: _sequelize2.default.DATE,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Cliente, {
            foreignKey: 'id_cliente',
            as: 'cliente',
        });
    }
}

exports. default = Aparelho;
