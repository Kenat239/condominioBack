import { Router, Request, Response, response } from 'express';
import { Cuotas } from '../modelos/cuotas';
import bcrypt from 'bcrypt';
import { CUotas } from '../interfaces/cuotas';
import verificaToken from '../middlewares/authentication';

const cuotasRoutes = Router();

//=======================================
//Crear Cuotas
//=======================================
cuotasRoutes.post('/', (req: Request, res: Response) => {
    const body: CUotas = req.body;
    const cuota = new Cuotas({

        mantenimiento: body.mantenimiento,
        extraordinaria: body.extraordinaria,
        area_comun: body.area_comun,
        descuento: body.descuento,
        servicio_gas: body.servicio_gas,
        servicio_agua: body.servicio_agua,
        otros_servicios: body.otros_servicios,
        multas: body.multas,
        otros_cargos: body.otros_cargos,
        int_moratorios: body.int_moratorios,
        monto_total: body.monto_total,
        fch_lim_pag: body.fch_lim_pag
    });

    console.log(cuota);

    cuota.save((err:any, cuotaGuardada) => {
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
                mensaje: 'Error en la base d edatos',
                err:err
            });
        }

        res.status(200).json({
            ok: true,
            cuota: cuotaDB
        });
    });
});





export default cuotasRoutes;