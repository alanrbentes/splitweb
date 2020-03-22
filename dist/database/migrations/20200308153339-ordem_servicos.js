"use strict";module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ordens_servicos', {
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
            id_aparelho: {
                type: Sequelize.INTEGER,
                references: { model: 'aparelhos', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            descricao_servico: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            data_garantia: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            observacao: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            valor: {
                type: Sequelize.DECIMAL(10, 2),
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
        return queryInterface.dropTable('ordens_servicos');
    },
};
