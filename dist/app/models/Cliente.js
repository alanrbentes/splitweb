"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Cliente extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                nome: _sequelize2.default.STRING,
                email: _sequelize2.default.STRING,
                ddd: _sequelize2.default.STRING,
                celular: _sequelize2.default.STRING,
                uf: _sequelize2.default.STRING,
                endereco: _sequelize2.default.STRING,
                complemento: _sequelize2.default.STRING,
                bairro: _sequelize2.default.STRING,
                cep: _sequelize2.default.STRING,
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
    }

}

exports. default = Cliente;
