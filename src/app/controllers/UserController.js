import User from '../models/User';

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
        // { name, email, password, provider }

        const user = await User.create(req.body);

        return res.json(user);
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;
        const user = await User.findByPk(req.userId);

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
}

export default new UserController();
