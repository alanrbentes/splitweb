import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // PERMITE USAR O PADRÃO DE RETORNO COM ASYNC AWAIT
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Acesso não autorizado!' });
    }
    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secrete);
        req.userId = decoded.id;

        // Basicamente diz para o fluxo avançar
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};
