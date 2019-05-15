import { Request, Response, Router } from 'express';
import { Residente } from '../modelos/residentes';
import { SEED } from '../global/environment';
import jwd from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const loginRoutes = Router();

//===================================================================
// login de usuario
//===================================================================

loginRoutes.post('/', (req: Request, res: Response) => {
    const body = req.body;

    Residente.findOne({ email: body.email }, (err:any, residenteDB) => {
        if (err){
            return res.status(500).json({
                ok:false,
                mensaje:'error en la base de datos',
                err: err

           });
           
        }
        if(!residenteDB){
            return res.status(404).json({
                ok: false,
                mensaje: 'el usuario no existe'
            });
        }

        if( !bcrypt.compareSync(body.password, residenteDB.password) ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas',
            });  
        }

        const token = jwd.sign( { usuario: residenteDB }, SEED, { expiresIn: 14400 });
        
       

        
        res.status(200).json({
            ok: true,
            token: token,
            usuario: residenteDB
        });
    });
});

export default loginRoutes;