import Cliente from '../models/Cliente';
// import Cache from '../../lib/Cache';

class ClienteController {
    async list(req, res) {
        try {
            const { id } = req.query;

            if (id) {
                const cliente = await Cliente.findOne({
                    where: { id, user_id: req.userId, canceled_at: null },
                });

                if (!cliente) {
                    return res.json({ message: 'Cliente não encontrado!' });
                }

                return res.json(cliente);
            }
            // const { page = 1 } = req.query;

            // const cacheKey = `user:${req.userId}:cliente:${page}`;
            // const cached = await Cache.get(cacheKey);

            // if (cached) {
            //     return res.json(cached);
            // }

            const clientes = await Cliente.findAll({
                where: { user_id: req.userId, canceled_at: null },
                limit: 20,
            });

            if (clientes.length === 0) {
                return res.json({ message: 'Nenhum cliente encontrado!' });
            }

            // if (clientes) {
            //     const cached = await Cache.get('clientes');

            //     if (cached) {
            //         return res.json(cached);
            //     }
            // }
            // await Cache.set('clientes', clientes);
            return res.json(clientes);
        } catch (err) {
            return res.status(400).json({
                error: 'Erro no envio dos dados!',
                messages: err,
            });
        }
    }

    async store(req, res) {
        req.body.user_id = req.userId;

        try {
            const objCliente = await Cliente.create(req.body);

            return res.json({
                message: 'Cliente salvo com sucesso!',
                objSave: objCliente,
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

            if (cliente.user_id !== req.userId) {
                return res.status(401).json({
                    error: 'O registro não pode ser excluido!',
                });
            }

            if (cliente) {
                cliente.canceled_at = new Date();
                await cliente.save();
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
