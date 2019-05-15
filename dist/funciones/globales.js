"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
function horaActual() {
    var h = new Date();
    var hora = h.getHours();
    var minuto = h.getMinutes();
    var segundo = h.getSeconds();
    var horaA = addZero(hora) + ':' + addZero(minuto) + ':' + addZero(segundo);
    return horaA;
}
exports.horaActual = horaActual;
function fechaActual() {
    var f = new Date();
    var dia = f.getDate();
    var mes = f.getMonth() + 1;
    var anio = f.getFullYear();
    var fecha = addZero(dia) + '/' + addZero(mes) + '/' + anio;
    return fecha;
}
exports.fechaActual = fechaActual;
