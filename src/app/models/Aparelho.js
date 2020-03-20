import Sequelize, { Model } from 'sequelize';

class Aparelho extends Model {
    static init(sequelize) {
        super.init(
            {
                user_id: Sequelize.INTEGER,
                id_cliente: Sequelize.INTEGER,
                modelo: Sequelize.STRING,
                descricao: Sequelize.STRING,
                local_instalacao: Sequelize.STRING,
                canceled_at: Sequelize.DATE,
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

export default Aparelho;
