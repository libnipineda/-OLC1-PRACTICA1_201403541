class Token
{
    constructor(numero,lexema, idtkn, tkn, fila, columna)
    {
        this.numero = numero;
        this.lexema = lexema;
        this.idtkn = idtkn;
        this.tkn = tkn;
        this.fila = fila;
        this.columna = columna;

        this.listaToken = [];
        this.listaError = [];
    }
}

class Errores
{
    constructor(enumero, tipo, elexema, descripcion, efila, ecolumna)
    {
        this.enumero = enumero;
        this.tipo = tipo;
        this.elexema = elexema;
        this.descripcion = descripcion;
        this.efila = efila;
        this.ecolumna = ecolumna;
    }
}