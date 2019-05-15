import { Router, Request, Response, response } from 'express';
import { Servicios } from '../modelos/servicios';
import { SErvicios} from '../interfaces/servicios';
import { fechaActual } from '../funciones/globales';
import verificaToken from '../middlewares/authentication';

const serviciosRoutes = Router();

//=======================================
//Crear Servicio
//=======================================
serviciosRoutes.post('/:id', verificaToken , (req: Request, res: Response) => {

    const body: SErvicios = req.body;
    const admin = req.body.usuario;
    const residente = req.body.usuario;

    if(admin.rol !== 'ADMIN_ROL'){
        return res.status(400).json({
            ok: false,
            mensaje: 'No eres administrador para crear servicios'
        });
    }

    let fechaUnix = parseInt((new Date(body.dia_pago).getTime()/1000).toFixed(0)) 
    
    const servicio = new Servicios({

        nombre_serv: body.nombre_serv,
        costo: body.costo,
        dia_pago: fechaUnix,
    });

    servicio.save((err: any, servicioGuardado) => {
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err:err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Servicio guardado',
            servicio: servicioGuardado
        });
    });
});


//=======================================
//Enlistar Servicio
//=======================================
serviciosRoutes.get('/', (req: Request, res: Response) => {
    Servicios.find((err: any, servicioDB) => {

        var monto_total = req.body.monto_total;
        var costo = req.body.costo;

            if (err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error en la base de datos',
                    err:err
                });
            }
                      
         res.status(200).json({
            ok: true,
            servicio: servicioDB
    
        });
    });
});


//=======================================
//Enlistar Servicio por Id
//=======================================
serviciosRoutes.get('/:id', verificaToken, (req: Request, res: Response) => {
    Servicios.find((err: any, servicioDB ) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err:err
            });
        }

        res.status(200).json({
            ok: true,
            servicio: servicioDB
    
        });
    });
});


//=======================================
//Modificar Servicio
//=======================================
serviciosRoutes.put('/:id', verificaToken, (req: Request, res: Response) => {

    const id = req.params.id;
    const body = req.body;
    const admin = req.body.usuario;

    if(admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: 'No eres administrador para modificar cuotas'
        });
    }

    Servicios.findById(id, (err, servicioActualizado) => {
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err:err
            });
        }

        if(!servicioActualizado){
            return res.status(404).json({
                ok: false,
                mensaje: 'El servicio no existe',
                err: err,
                servicio: servicioActualizado
            });
        }
        
        servicioActualizado.nombre_serv = body.nombre_serv;
        servicioActualizado.costo = body.costo;
        servicioActualizado.dia_pago = body.dia_pago;

        servicioActualizado.save((err, servicioGuardado) =>{

            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar',
                    err:err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Servicio actualizado',
                servicio: servicioGuardado
            });
        });
    });
});


//=======================================
//Eliminar Servicio
//=======================================
serviciosRoutes.delete('/:id', verificaToken, (req: Request, res: Response) => {
    const id = req.params.id;
    const admin = req.body.usuario;

    if(admin.rol !== 'ADMIN_ROL'){
        return res.status(400).json({
            ok: false,
            mensaje: 'No eres administrador para eliminar cuotas'
        });
    }

    Servicios.findByIdAndDelete(id, (err, servicioDel) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'No se puede eliminar el servicio',
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Servicio eliminado',
            servicio: servicioDel
        });
    });
});

export default serviciosRoutes;