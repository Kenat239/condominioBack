"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sumaServ() {
    var num = 20;
    var factorial = 0;
    while (num >= factorial) {
        factorial = factorial + num;
        num--;
    }
    return factorial;
}
exports.sumaServ = sumaServ;
function sumaS(monto_total, costo) {
    var costo = 5;
    var monto_total = 0;
    while (costo >= monto_total) {
        monto_total = monto_total + costo;
        costo--;
    }
    return monto_total;
}
exports.sumaS = sumaS;
function sumServicios() {
    var num = 4;
    var i;
    var factorial = 2;
    for (i = num; i >= 1; i--) {
        factorial += i;
    }
    return factorial;
}
exports.sumServicios = sumServicios;
/*export function suma(){
    var monto_total = req.body.monto_total;
    var costo = req.body.costo;

 for( monto_total=0; monto_total<monto_total;monto_total+costo);

} */
