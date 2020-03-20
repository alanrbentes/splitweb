import OrdemServico from '../models/OrdemServico';
import Cache from '../../lib/Cache';

class OrdemServicoController {
    async list(req, res) {
        try {
            const { page = 1 } = req.query;
            const { id } = req.query;

            if (id) {
                const ordem_servico = await OrdemServico.findOne({
                    where: { id, user_id: req.userId, canceled_at: null },
                });

                if (!ordem_servico) {
                    return res.json({
                        message: 'Nenhuma ordem de servico encontrada!',
                    });
                }

                return res.json(ordem_servico);
            }
            const cacheKey = `user:${req.userId}:lordemservico`;
            const cached = await Cache.get(cacheKey);

            if (cached) {
                return res.json(cached);
            }
            const ordem_servico = await OrdemServico.findAll({
                where: { user_id: req.userId, canceled_at: null },
                limit: 20,
                offset: (page - 1) * 20,
            });

            if (ordem_servico.length === 0) {
                return res.json({
                    message: 'Nenhuma Ordem de Serviço cadastrada!',
                });
            }

            await Cache.set(cacheKey, ordem_servico);
            return res.json(ordem_servico);
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
            const ordem_servico = await OrdemServico.create(req.body);
            if (ordem_servico) {
                const cacheKey = `user:${req.userId}:lordemservico`;
                await Cache.invalidate(cacheKey);
            }
            return res.json({
                message: 'Ordem de serviço salva com sucesso!',
                objSave: ordem_servico,
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
            const ordem_servico = await OrdemServico.findOne({
                where: {
                    id,
                    user_id: req.userId,
                    canceled_at: null,
                },
            });
            ordem_servico.id_aparelho = req.body.id_aparelho;
            ordem_servico.descricao_servico = req.body.descricao_servico;
            ordem_servico.data_garantia = req.body.data_garantia;
            ordem_servico.observacao = req.body.observacao;
            ordem_servico.valor = req.body.valor;
            ordem_servico.update_at = new Date();

            await ordem_servico.save();
            if (ordem_servico) {
                const cacheKey = `user:${req.userId}:lordemservico`;
                await Cache.invalidate(cacheKey);
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
            const ordem_servico = await OrdemServico.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.userId,
                    canceled_at: null,
                },
            });

            if (ordem_servico.user_id !== req.userId) {
                return res.status(401).json({
                    error: 'O registro não pode ser excluido!',
                });
            }

            if (ordem_servico) {
                ordem_servico.canceled_at = new Date();
                await ordem_servico.save();

                const cacheKey = `user:${req.userId}:lordemservico`;
                await Cache.invalidate(cacheKey);

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

export default new OrdemServicoController();
