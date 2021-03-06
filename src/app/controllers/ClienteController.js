import Cliente from '../models/Cliente';
import Cache from '../../lib/Cache';

class ClienteController {
    async list(req, res) {
        try {
            const { page = 1 } = req.query;
            const { id } = req.query;

            if (id) {
                const cliente = await Cliente.findOne({
                    where: { id, user_id: req.userId, canceled_at: null },
                });

                if (!cliente) {
                    return res.status(200).json({
                        error: 'Registro não encontrado!',
                    });
                }

                return res.json(cliente);
            }
            const cacheKey = `user:${req.userId}:lclientes`;
            const cached = await Cache.get(cacheKey);

            if (cached) {
                return res.json(cached);
            }
            const clientes = await Cliente.findAll({
                where: { user_id: req.userId, canceled_at: null },
                limit: 20,
                offset: (page - 1) * 20,
            });

            if (clientes.length === 0) {
                return res.json({ message: 'Nenhum cliente cadastrado!' });
            }

            await Cache.set(cacheKey, clientes);
            return res.json(clientes);
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
            const cliente = await Cliente.create(req.body);
            if (cliente) {
                const cacheKey = `user:${req.userId}:lclientes`;
                await Cache.invalidate(cacheKey);
            }
            return res.json({
                message: 'Cliente salvo com sucesso!',
                objSave: cliente,
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
            const cliente = await Cliente.findOne({
                where: {
                    id,
                    user_id: req.userId,
                    canceled_at: null,
                },
            });

            if (!cliente) {
                return res.status(200).json({
                    error: 'Registro não encontrado!',
                });
            }

            if (cliente.user_id !== req.userId) {
                return res.status(401).json({
                    error: 'O registro não pode ser atualizado!',
                });
            }
            cliente.nome = req.body.nome;

            if (cliente.email !== req.body.email) {
                cliente.email = req.body.email;
            }

            cliente.ddd = req.body.ddd;

            if (cliente.celular !== req.body.celular) {
                cliente.celular = req.body.celular;
            }

            cliente.uf = req.body.uf;
            cliente.endereco = req.body.endereco;
            cliente.complemento = req.body.complemento;
            cliente.bairro = req.body.bairro;
            cliente.cep = req.body.cep;
            cliente.update_at = new Date();

            await cliente.save();
            if (cliente) {
                const cacheKey = `user:${req.userId}:lclientes`;
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
            const cliente = await Cliente.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.userId,
                    canceled_at: null,
                },
            });

            if (!cliente) {
                return res.status(401).json({
                    error: 'O registro não encontrado!',
                });
            }

            if (cliente.user_id !== req.userId) {
                return res.status(401).json({
                    error: 'O registro não pode ser excluido!',
                });
            }

            if (cliente) {
                cliente.canceled_at = new Date();
                await cliente.save();

                const cacheKey = `user:${req.userId}:lclientes`;
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

export default new ClienteController();
