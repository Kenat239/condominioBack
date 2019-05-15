import {Request, Response, Router} from 'express';
import {Servicios} from '../modelos/servicios';
import verificaToken from '../middlewares/authentication'

const PagosRoutes = Router();

PagosRoutes.put('/:id', /*verificaToken,*/(req:Request , res:Response) =>{
    const id = req.params.id;
    const body = req.body;
   // const admin = req.body.usuario;

    console.log('id', id)
/*
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: ' se requiere ser administrador para registrar nuevos usuarios',
        })
    } */
    Servicios.findById (id, (err:any, SerA:any) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err:err
            });
        }

        if (!SerA) {
            return res.status(500).json({
                ok: false,
                mensaje: 'el servicio no existe'
            });
        }

        SerA.status = body.status;
        SerA.pago = body.pago;

        SerA.save( (err:any, SerG:any) => {
            if (err) {
                return res.status(500).json({
                    ok:false,
                    mensaje: 'error al actualizar'
                });
            }

            res.status(200).json({
                ok:true,
                mensaje: 'servicio actualizado exitosamente',
                servicio: SerG
            });
        });
    });
});
export default PagosRoutes;

