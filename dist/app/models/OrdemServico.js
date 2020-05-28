"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class OrdemServico extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                user_id: _sequelize2.default.INTEGER,
                id_aparelho: _sequelize2.default.INTEGER,
                descricao_servico: _sequelize2.default.STRING,
                data_garantia: _sequelize2.default.DATE,
                observacao: _sequelize2.default.STRING,
                valor: _sequelize2.default.DECIMAL(10, 2),
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
            foreignKey: 'id_aparelho',
            as: 'aparelho',
        });
    }
}

exports. default = OrdemServico;
