import Sequelize, { Model } from 'sequelize';

class Cliente extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                email: Sequelize.STRING,
                ddd: Sequelize.STRING,
                celular: Sequelize.STRING,
                uf: Sequelize.STRING,
                endereco: Sequelize.STRING,
                complemento: Sequelize.STRING,
                bairro: Sequelize.STRING,
                cep: Sequelize.STRING,
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
    // static associate(models) {
    //     this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    //     this.belongsTo(models.Cliente, {
    //         foreignKey: 'id_cliente',
    //         as: 'cliente',
    //     });
    // }
}

export default Cliente;
