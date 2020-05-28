"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
    async store(req, res) {
        // verifico se o email já não está cadastrado
        const userExists = await _User2.default.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res
                .status(400)
                .json({ error: 'Email de usuário já cadastrado' });
        }
        // { name, email, password, provider }

        const user = await _User2.default.create(req.body);

        return res.json(user);
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;
        const user = await _User2.default.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await _User2.default.findOne({
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

exports. default = new UserController();
