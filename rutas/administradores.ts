import {Router, Request, Response} from 'express'
import {Residente} from '../modelos/residentes';
import { IResidente } from '../interfaces/residentes';
import bcrypt  from 'bcrypt'
import verificaToken from '../middlewares/authentication'



const adminRoutes = Router();


//========================================================================
// nuevo residente
//========================================================================
adminRoutes.post('/',verificaToken,(req:Request, res: Response) => {
    const body: IResidente = req.body;
    
            const admin=req.body.usuario;
    
            if (admin.rol !== 'ADMIN_ROL') {
                return res.status(400).json({
                    ok: false,
                    mensaje: ' se requiere ser administrador para registrar nuevos usuarios',
                })
            }   

        const residente = new Residente ({
            nombre: body.nombre,
            apellidoP: body.apellidoP,
            apellidoM: body.apellidoM,
            casaNE: body.casaNE,
            casaNI: body.casaNI,
            telefono: body.telefono,
            celular: body.celular,
            email: body.email,
            password: bcrypt.hashSync(body.password,10),
            rol: body.rol,
            status: body.status,
        });
    
        residente.save((err:any, residenteGuard)=> {
            if (err) {
                res.status(500).json({
                    ok:false,
                    mensaje: 'error al guardar',
                    err:err
                });
            }
            res.status(200).json({
                ok:true,
                mensaje: 'residente registrado exitosamente',
                residente: residenteGuard
            });
        });
    });




//========================================================================
// actualizacion del residente como administrador
//========================================================================
adminRoutes.put('/:id', verificaToken, (req:Request, res:Response) => {
    const id = req.params.id;
    const body = req.body;
    const admin = req.body.usuario;
    console.log(admin);

    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok:false,
            mensaje: 'se necesita permiso de administrador',
        });
    }
    Residente.findById (id, (err:any, REsA:any) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err:err
            });
        }

        if (!REsA) {
            return res.status(500).json({
                ok: false,
                mensaje: 'el usuario no existe'
            });
        }

        REsA.nombre = body.nombre;
        REsA.apellidoP = body.apellidoP;
        REsA.apellidoM = body.apellidoM;
        REsA.telefono = body.telefono;
        REsA.celular = body.celular;
        REsA.email = body.email;
        REsA.rol = body.rol;
        REsA.status = body.status;


        REsA.save( (err:any, REsG:any) => {
            if (err) {
                return res.status(500).json({
                    ok:false,
                    mensaje: 'error al actualizar'
                });
            }

            res.status(200).json({
                ok:true,
                mensaje: 'residente actualizado exitosamente',
                residente: REsG
            });
        });
    });
});

//========================================================================
// obtener todos los residentes como admin
//========================================================================

adminRoutes.get('/', verificaToken, (req: Request, res: Response) => {

const admin =req.body.usuario;

if (admin.rol !== 'ADMIN_ROL') {
    return res.status(400).json({
        ok:false,
        mensaje: 'se necesita permiso de administrador',
    });
}
    Residente.find(  (err:any, usuariosDB) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            usuariot: usuariosDB.length,
            usuarios: usuariosDB
        });
    } );

});

//========================================================================
// Borrar usuario
//========================================================================
adminRoutes.delete('/:id',verificaToken, (req: Request, res: Response) => {

    const id = req.params.id;

    const admin=req.body.usuario

    
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok:false,
            mensaje: 'se necesita permiso de administrador',
        });
    }
        Residente.findByIdAndDelete(id, (err, usuarioDel) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'no se pudo borrar el usuario',
                    err:err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'usuario eliminado exitosamente',
                usuarios: usuarioDel
            });
        });
});

export default adminRoutes;