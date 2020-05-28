import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // PERMITE USAR O PADRÃO DE RETORNO COM ASYNC AWAIT
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token inválido!' });
    }
    const [, token] = authHeader.split(' '); // RETORNA UM ARRAY

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secrete); // REALIZA A DESCRIPTOGRAFIA DO PAYLOAD JWT
        req.userId = decoded.id; // ADD O ID NA REQ

        // Basicamente diz para o fluxo avançar
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};
