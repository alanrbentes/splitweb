module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('clientes', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            ddd: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            celular: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            uf: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            endereco: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            complemento: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            bairro: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            cep: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            canceled_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },
    down: queryInterface => {
        return queryInterface.dropTable('clientes');
    },
};
