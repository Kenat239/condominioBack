

function addZero( i: any ) {
    if ( i < 10 ) {
        i = '0' + i;
    }

    return i;
}

export function horaActual() {
    let h = new Date();
    let hora = h.getHours();
    let minuto = h.getMinutes();
    let segundo = h.getSeconds();

    let horaA = addZero(hora) + ':' + addZero(minuto) + ':' + addZero(segundo);

    return horaA;
}

export function fechaActual() {
    let f = new Date();
    let dia = f.getDate();
    let mes = f.getMonth() + 1;
    let anio = f.getFullYear();

    let fecha = addZero(dia) + '/' + addZero(mes) + '/' + anio;

    return fecha;  
}


