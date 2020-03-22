"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

exports. default = async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(4),
            password: Yup.string()
                .min(4)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when(
                'oldPassword',
                (oldPassword, field) =>
                    oldPassword
                        ? field.required().oneOf([Yup.ref('password')])
                        : field
            ),
        });
        await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (err) {
        return res
            .status(400)
            .json({ error: 'Dados enviados com falha', messages: err.inner });
    }
};
