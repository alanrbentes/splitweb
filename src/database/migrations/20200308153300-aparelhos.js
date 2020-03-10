module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('aparelhos', {
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
                allowNull: true,
            },
            id_cliente: {
                type: Sequelize.INTEGER,
                references: { model: 'clientes', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            modelo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            local_instalacao: {
                type: Sequelize.STRING,
                allowNull: true,
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
        return queryInterface.dropTable('aparelhos');
    },
};
