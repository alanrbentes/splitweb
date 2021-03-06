import * as Yup from 'yup';

export default async (req, res, next) => {
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
