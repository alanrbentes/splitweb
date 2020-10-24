import Sequelize, { Model } from 'sequelize';

class OrdemServico extends Model {
    static init(sequelize) {
        super.init(
            {
                user_id: Sequelize.INTEGER,
                id_aparelho: Sequelize.INTEGER,
                descricao_servico: Sequelize.STRING,
                data_garantia: Sequelize.DATE,
                observacao: Sequelize.STRING,
                valor: Sequelize.DECIMAL(10, 2),
                canceled_at: Sequelize.DATE,
            },
            {
                sequelize,
                freezeTableName: true,
                tableName: 'ordens_servicos',
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

export default OrdemServico;
