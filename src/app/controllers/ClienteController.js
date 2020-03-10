import Cliente from '../models/Cliente';
// import Cache from '../../lib/Cache';

class ClienteController {
    async list(req, res) {
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
            // order: ['date'],
            // attributes: ['id', 'date', 'past', 'cancelable'],
            limit: 20,
            // offset: (page - 1) * 20,
            // include: [
            //     {
            //         model: User,
            //         as: 'provider',
            //         attributes: ['id', 'name'],
            //         include: [
            //             {
            //                 model: File,
            //                 as: 'avatar',
            //                 attributes: ['id', 'path', 'url'],
            //             },
            //         ],
            //     },
            // ],
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
    }

    async store(req, res) {
        req.body.user_id = req.userId;
        const objCliente = await Cliente.create(req.body);

        if (objCliente) {
            return res.json({ message: 'Cliente salvo com sucesso!' });
            // invalidar lista
        }
        return res.json({ message: 'Erro ao salvar o registro!' });
    }

    async update(req, res) {
        const cliente = await Cliente.findByPk(req.userId);
        cliente.updated_at = new Date();
        const newCliente = await cliente.update(req.body);
        return res.json(newCliente);
    }

    async delete(req, res) {
        const cliente = await Cliente.findByPk(req.params.id);

        if (cliente.user_id !== req.userId) {
            return res.status(401).json({
                error: 'O registro não pode ser excluido!',
            });
        }

        cliente.canceled_at = new Date();
        await cliente.save();

        return res.json(cliente);
    }
}

export default new ClienteController();
