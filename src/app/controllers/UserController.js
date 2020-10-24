import User from '../models/User';
import Cache from '../../lib/Cache';

class UserController {
    async store(req, res) {
        // verifico se o email já não está cadastrado
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res
                .status(400)
                .json({ error: 'Email de usuário já cadastrado' });
        }

        const user = await User.create(req.body);

        return res.json(user);
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;
        const user = await User.findByPk(req.userId);

        // Só vai na base se os emails forem diferentes
        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email: req.body.email },
            });

            if (userExists) {
                return res
                    .status(400)
                    .json({ error: 'Email de usuário já cadastrado' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'senha invalida' });
        }

        const { id, name } = await user.update(req.body);

        return res.json({ id, name, email });
    }

    async delete(req, res) {
        try {
            const user = await User.findByPk(req.userId);

            if (!user) {
                return res.status(401).json({
                    error: 'O registro não encontrado!',
                });
            }

            if (user.id !== req.userId) {
                return res.status(401).json({
                    error: 'O registro não pode ser excluido!',
                });
            }

            if (user) {
                user.canceled_at = new Date();
                await user.save();

                const cacheKey = `user:${req.userId}:lusers`;
                await Cache.invalidate(cacheKey);

                return res.status(200).json({
                    success: 'Registro excluído com sucesso!',
                });
            }
        } catch (error) {
            return error.status(400).json({
                msg: 'O Registro não pode ser excluído!',
                objError: error,
            });
        }
    }
}

export default new UserController();
