import {Router, Request, Response} from 'express'
import {Residente} from '../modelos/residentes';
import { IResidente } from '../interfaces/residentes';
import bcrypt  from 'bcrypt'
import verificaToken from '../middlewares/authentication'


const residentRoutes = Router();



//========================================================================
// actualizacion del residente como residente
//========================================================================

residentRoutes.put('/:id', verificaToken, (req:Request, res:Response) => {
     const id = req.params.id;
     const body = req.body;
      const resUp = req.body.usuario;
         console.log(resUp)
    
     if (id !== resUp._id ) { 
          return res.status(400).json({
              ok:false,
              mensaje:'estos no son tus datos'
          });
        }
        Residente.findById(id, (err: any, resActualizado: any)=> {
            if (err) {
                res.status(500).json({
                    ok:false,
                    mensaje:'error en la base de datos',
                    err:err
                });
            }
            if (!resActualizado) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'residente no existe'
                });
            }

            resActualizado.nombre = body.nombre
            resActualizado.apellidoP = body.apellidoP
            resActualizado.apellidoM= body.apellidoM
            resActualizado.telefono = body.telefono
            resActualizado.celular = body.celular
            resActualizado.password = bcrypt.hashSync(body.password,10)
    

            resActualizado.save((err:any, resGuardado:any) =>{
                if (err) {
                    return res.status(500).json({
                        ok:false,
                        mensaje:'error al guardar',
                        err:err
                    });
                }
                resGuardado.password = bcrypt.hashSync(body.password,10);

                res.status(200).json({
                    ok:true,
                    mensaje:'tu informacion se ha actualizado',
                    residente:resGuardado
                });
            });
        });
   

});
//========================================================================
// que el residente pueda leer solo sus datos
//========================================================================
residentRoutes.get('/:id', verificaToken, (req: Request, res: Response) => {
    const REsid = req.body.usuario;
    const id = req.params.id
    console.log(REsid)

    if ( id !== REsid._id ) {
        return res.status(401).json({
            ok: false,
            mensaje: 'no eres tú'
        });
    }

    Residente.findById( id, (err:any, residenteDB) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            reidente: residenteDB
        });
    } );

});




export default residentRoutes;