"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aparelho = require('../models/Aparelho'); var _Aparelho2 = _interopRequireDefault(_Aparelho);
var _Cache = require('../../lib/Cache'); var _Cache2 = _interopRequireDefault(_Cache);

class AparelhoController {
    async list(req, res) {
        try {
            const { page = 1 } = req.query;
            const { id } = req.query;

            if (id) {
                const aparelho = await _Aparelho2.default.findOne({
                    where: { id, user_id: req.userId, canceled_at: null },
                });

                if (!aparelho) {
                    return res.json({ message: 'Aparelho não encontrado!' });
                }

                return res.json(aparelho);
            }
            const cacheKey = `user:${req.userId}:laparelhos`;
            const cached = await _Cache2.default.get(cacheKey);

            if (cached) {
                return res.json(cached);
            }
            const aparelho = await _Aparelho2.default.findAll({
                where: { user_id: req.userId, canceled_at: null },
                limit: 20,
                offset: (page - 1) * 20,
            });

            if (aparelho.length === 0) {
                return res.json({ message: 'Nenhum aparelho cadastrado!' });
            }

            await _Cache2.default.set(cacheKey, aparelho);
            return res.json(aparelho);
        } catch (err) {
            return res.status(400).json({
                error: 'Erro no envio dos dados!',
                messages: err,
            });
        }
    }

    async store(req, res) {
        try {
            req.body.user_id = req.userId;
            const aparelho = await _Aparelho2.default.create(req.body);
            if (aparelho) {
                const cacheKey = `user:${req.userId}:laparelhos`;
                await _Cache2.default.invalidate(cacheKey);
            }
            return res.json({
                message: 'Aparelho salvo com sucesso!',
                objSave: aparelho,
            });
        } catch (err) {
            return res.status(400).json({
                error: 'Erro no envio dos dados!',
                messages: err,
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.query;
            const aparelho = await _Aparelho2.default.findOne({
                where: {
                    id,
                    user_id: req.userId,
                    canceled_at: null,
                },
            });

            if (aparelho.user_id !== req.userId) {
                return res.status(401).json({
                    error: 'O registro não pode ser atualizado!',
                });
            }

            aparelho.modelo = req.body.modelo;
            aparelho.descricao = req.body.descricao;
            aparelho.local_instalacao = req.body.local_instalacao;
            aparelho.update_at = new Date();

            await aparelho.save();
            if (aparelho) {
                const cacheKey = `user:${req.userId}:laparelhos`;
                await _Cache2.default.invalidate(cacheKey);
            }
            return res.status(200).json({
                success: 'Registro atualizado com sucesso!',
            });
        } catch (err) {
            return res.status(400).json({
                error: 'Erro no envio dos dados!',
                messages: err,
            });
        }
    }

    async delete(req, res) {
        try {
            const aparelho = await _Aparelho2.default.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.userId,
                    canceled_at: null,
                },
            });

            if (aparelho.user_id !== req.userId) {
                return res.status(401).json({
                    error: 'O registro não pode ser excluido!',
                });
            }

            if (aparelho) {
                aparelho.canceled_at = new Date();
                await aparelho.save();

                const cacheKey = `user:${req.userId}:laparelhos`;
                await _Cache2.default.invalidate(cacheKey);

                return res.status(200).json({
                    success: 'Registro excluído com sucesso!',
                });
            }
            return res.status(400).json({
                error: 'Registro não encontrado!',
            });
        } catch (err) {
            return res.status(400).json({
                error: 'Erro no envio dos dados!',
                messages: err,
            });
        }
    }
}

exports. default = new AparelhoController();
