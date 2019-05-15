import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SEED } from '../global/environment';


function verificaToken ( req: Request, res: Response, next: NextFunction ) {
    const token: any = req.headers.authorization;

    verify( token, SEED, ( err: any, decoded: any) => {
        if ( err ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto'
            });
        }

        if ( decoded.usuario.status !== 'activo' ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Su usuario se encuentra desactivado, contacte a un administrador'
            });
        }

        req.body.usuario = decoded.usuario;

        next();
    });
}

export default verificaToken;


