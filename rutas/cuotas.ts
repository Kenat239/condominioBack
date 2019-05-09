import { Router, Request, Response, response } from 'express';
import { Cuotas } from '../modelos/cuotas';
import { CUotas } from '../interfaces/cuotas';
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
        
        const format_fecha = moment().format("DD-MMM-YYYY")

        console.log('Fecha con moment ' + format_fecha)


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
        fecha_lim_pag: body.fecha_lim_pag
    });
       console.log('Fecha limite de pago ', body.fecha_lim_pag)

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

export default cuotasRoutes;