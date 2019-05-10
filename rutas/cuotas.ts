import { Router, Request, Response, response } from 'express';
import { Cuotas } from '../modelos/cuotas';
import { CUotas } from '../interfaces/cuotas';
import { fechaActual } from '../funciones/globales';
import moment from 'moment';

const cuotasRoutes = Router();

//=======================================
//Crear Cuotas
//=======================================
cuotasRoutes.post('/', (req: Request, res: Response) => {
    const body: CUotas = req.body;


    let suma_cuot: number = 
        Number( body.mantenimiento ) +
        Number( body.extraordinaria ) +
        Number( body.area_comun ) +
        Number( body.servicio_gas)  +
        Number( body.servicio_agua ) +
        Number( body.otros_servicios ) +
        Number( body.otros_cargos ) +
        Number( body.multas )+
        Number( body.int_moratorios );

        let menos_desc: number =
        Number( suma_cuot ) - 
        Number( body.descuento );

        let fechaUnix = parseInt((new Date(fechaActual()).getTime()/1000).toFixed(0))
        
    const cuota = new Cuotas({

        mantenimiento: body.mantenimiento,
        extraordinaria: body.extraordinaria,
        area_comun: body.area_comun,
        descuento: body.descuento,
        servicio_gas: body.servicio_gas,
        servicio_agua: body.servicio_agua,
        otros_servicios: body.otros_servicios,
        otros_cargos: body.otros_cargos,
        int_moratorios: body.int_moratorios,
        multas: body.multas,
        monto_total: suma_cuot,
        monto_con_desc: menos_desc,
        fecha_lim_pag: fechaUnix
    });

    console.log('fecha_lim_pag', fechaUnix)
       
    cuota.save((err: any, cuotaGuardada) => {
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err:err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Cuota guardada',
            cuota: cuotaGuardada
        });
    });
});


//=======================================
//Enlistar Cuotas
//=======================================
cuotasRoutes.get('/', (req: Request, res: Response) => {
    Cuotas.find((err: any, cuotaDB) => {

        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err:err
            });
        }

        
    
        res.status(200).json({
            ok: true,
            cuota: cuotaDB,
            
        });
    });
});

//=======================================
//Modificar Cuotas
//=======================================
cuotasRoutes.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;

    Cuotas.findById(id, (err, cuotaActualizada) => {
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err:err
            });
        }

        if(!cuotaActualizada){
            return res.status(404).json({
                ok: false,
                mensaje: 'Cuota no existe',
                err: err,
                cuota: cuotaActualizada
            });
        }

        cuotaActualizada.mantenimiento = body.mantenimiento;
        cuotaActualizada.extraordinaria = body.extraordinaria;
        cuotaActualizada.area_comun = body.area_comun;
        cuotaActualizada.descuento = body.descuento;
        cuotaActualizada.servicio_gas = body.servicio_gas;
        cuotaActualizada.servicio_agua = body.servicio_agua;
        cuotaActualizada.otros_servicios = body.otros_servicios;
        cuotaActualizada.otros_cargos = body.otros_cargos;
        cuotaActualizada.int_moratorios = body.int_moratorios;
        cuotaActualizada.multas = body.multas;
        cuotaActualizada.fecha_lim_pag = body.fecha_lim_pag;

        cuotaActualizada.save((err, cuotaGuardada) =>{

            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar',
                    err:err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Cuota actualizada',
                cuota: cuotaGuardada
            });
        });
    });
});

//=======================================
//Eliminar Cuota
//=======================================
cuotasRoutes.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    Cuotas.findByIdAndDelete(id, (err, cuotaDel) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'No se puede eliminar la cuota',
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Cuota eliminada',
            cuotaDel: cuotaDel
        });
    });
});


export default cuotasRoutes;