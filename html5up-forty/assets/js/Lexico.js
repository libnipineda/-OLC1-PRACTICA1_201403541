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

        this.listaError = [];
    }
}

var numero = 0, estado = 0, idtkn = 0, fila = 1, columna = 1, tempfila = 0, tempcolumna = 0, indice = 0;
var concatenar = "", caracter = '', token;


Scanner(cadena)
{
    this.cadena += "\n   ";
    this.listaToken = [];
    this.listaError = [];    

    while(numero < this.cadena.length)
    {
        caracter = this.cadena[numero];

        switch(estado)
        {
    //------------------------------ Estado 0 ------------------------------
            case 0:
                tempfila = fila;
                tempcolumna = columna;

                if(cadena == '\n' || caracter == '\t' || caracter == '\r' || caracter == ' ')
                {
                    if(caracter == '\n')
                    {
                        columna = 1;
                        fila++;
                    }
                    else
                    {
                        columna++;
                    }
                    numero++;
                }
                else if(this.EsNumero(caracter))
                {
                    estado = 1; concatenar += caracter; numero++; columna++;
                }
                else if(this.EsSimbolo(caracter))
                {
                    estado = 2; concatenar += caracter; numero++; columna++;
                }
                else if(this.EsLetra(caracter))
                {
                    estado = 3; concatenar += caracter; numero++; columna++;
                }
                else if(caracter == String.fromCharCode(34)) // signo "
                {
                    estado = 4; concatenar += caracter;  numero++; columna++;
                }
                else if(caracter == String.fromCharCode(39)) // signo '
                {
                    estaedo = 5; concatenar += caracter; numero++; columna++;
                }
                else if(caracter == '/')
                {
                    estado = 6; concatenar += caracter; numero++; columna++;
                }
                else
                {
                    this.listaError.push(new Errores(numero,"Lexico",concatenar,"valor desconocido.",tempfila,tempcolumna));
                    indice++; numero++; columna++; concatenar = "";
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 1 ------------------------------
            case 1:
                if(caracter.fromCharCode(46))
                {
                    estado = 7; concatenar += caracter; numero++; columna++;
                }
                if(this.EsNumero(caracter))
                {
                    estado = 1; concatenar += caracter; numero++; columna++;
                }
                else
                {
                    estado = 0;
                    this.listaToken(new Token(indice,concatenar,1,"Numero",tempfila, tempcolumna));
                    indice++; concatenar = "";
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 2 ------------------------------
            case 2:
                AnalizarTkn(concatenar);
                estado = 0;
                this.listaToken(new Token(indice,concatenar,idtkn,token,tempfila,tempcolumna));
                indice++; concatenar = "";
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 3 ------------------------------
            case 3:
                if(this.EsLetra(caracter))
                {
                    estado = 3; concatenar += caracter; columna++; numero++;
                }
                else if(this.EsNumero(caracter))
                {
                    estado = 3; concatenar += caracter; columna++; numero++;
                }
                else if(caracter == String.fromCharCode(95))
                {
                    estado = 3; concatenar += caracter; columna++; numero++;
                }
                else
                {
                    AnalizarTkn(concatenar);
                    estado = 0;
                    this.listaToken(new Token(indice,concatenar,idtkn,token,tempfila,tempcolumna));
                    indice++; concatenar = "";
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 4 ------------------------------
            case 4:
                if(caracter.fromCharCode(34))
                {
                    estado =12; concatenar += caracter; columna++; numero++;
                }
                else
                {
                    estado = 8; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 5 ------------------------------
            case 5:
                if(caracter.fromCharCode(39))
                {
                    estado = 12; concatenar += caracter; columna++; numero++;
                }
                else
                {
                    estado = 9; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 6 ------------------------------
            case 6:
                if(caracter.fromCharCode(47))
                {
                    estado = 10; concatenar += caracter; columna++; numero++;                    
                }
                else
                {
                    AnalizarTkn(concatenar);
                    estado = 0;
                    this.listaToken(new Token(indice,concatenar,idtkn,token,tempfila,tempcolumna));
                    indice++; concatenar = "";
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 7 ------------------------------
            case 7:
                if(this.EsNumero(caracter))
                {
                    estado = 11; concatenar += cadena; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 8 ------------------------------
            case 8:
                if(caracter.fromCharCode(34))
                {
                    estado = 12; concatenar += caracter; columna++; numero++;
                }
                else
                {
                    estado = 8; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 9 ------------------------------    
            case 9:
                if(caracter.fromCharCode(39))
                {
                    estado = 12; concatenar += caracter; columna++; numero++;
                }
                else
                {
                    estado = 9; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 10 ------------------------------                
            case 10:
                if(caracter.fromCharCode(42))
                {
                    estado = 13; concatenar += caracter; columna++; numero++;
                }
                else
                {
                    estado = 14; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 11 ------------------------------
            case 11:
                if(this.EsNumero(caracter))
                {
                    estado = 11; concatenar += caracter; columna++; numero++;
                }
                else
                {
                    estado = 0;
                    this.listaToken(new Token(indice,concatenar,48,"Decimal",tempfila,tempcolumna));
                    indice++; concatenar = "";
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 12 ------------------------------
            case 12:
                AnalizarTkn(concatenar);
                estado = 0;
                this.listaToken(new Token(indice,concatenar,idtkn,token,tempfila,tempcolumna));
                indice++; concatenar = "";
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 13 ------------------------------
            case 13:
                if(caracter.fromCharCode(10))
                {
                    estado = 14; concatenar += caracter; columna++; numero++;
                }
                else
                {
                    estado = 13; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 14 ------------------------------
            case 14:
                if(caracter.fromCharCode(42))
                {
                    estado = 15; concatenar += caracter; columna++; numero++;
                }
                else if(caracter.fromCharCode(10))
                {
                    AnalizarTkn(concatenar);
                    estado = 0;
                    this.listaToken(new Token(indice,concatenar,idtkn,token,tempfila,tempcolumna));
                    indice++; concatenar = "";
                }
                else
                {
                    estado = 14; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 15 ------------------------------
            case 15:
                if(caracter.fromCharCode(47))
                {
                    estado = 16; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 16 ------------------------------
            case 16:
                if(caracter.fromCharCode(47))
                {
                    estado = 17; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 17 ------------------------------
            case 17:
                AnalizarTkn(concatenar);
                estado = 0;
                this.listaToken(new Token(indice,concatenar,idtkn,token,tempfila,tempcolumna));
                indice++; concatenar = "";
                break;    
        }
    }

    console.log("//////////////////////");
    console.log("tokens:");
    for(var i = 0; i < this.listaToken.length; i++)
    {
        console.log(this.listaTokens[i]);        
    }

    console.log("errores:");
    for(var i = 0; i < this.listaError.length; i++)
    {
        console.log(this.listaError[i]);
    }
}


EsLetra(caracter)
{
    if(caracter >= 'A' &  caracter <= 'Z')
      return true;
    if(caracter >= 'a' & caracter <='z')
      return true;
    if (caracter == 'ñ' | caracter == 'Ñ')
      return true;
  return false;
}

EsNumero(caracter)
{
    if (caracter >= '0' & caracter <= '9')
    {
        return true;
    }
    return false;
}

EsSimbolo(caracter)
{
    switch(caracter)
    {
        case '(':
        case ')':
        case '{':
        case '}':
        case ',':
        case '.':
        case ';':
        case '=':
        case '>':
        case '<':
        case '+':
        case '-':
        case '*':
        case '[':
        case ']':
        case ':':
        case '!':  return true;
        break;
    }
    return false;
}

AnalizarTkn(valorTkn)
{
    switch(valorTkn)
    {
        case "class":
            token = "Palabra Reservada."; idtkn = 2;
            break;

        case "static":
            token = "Palabra Reservada."; idtkn = 3;
            break;

        case "void":
            token = "Palabra Reservada."; idtkn = 4;
            break;

        case "Main":
            token = "Palabra Reservada."; idtkn = 5;
            break;

        case "(":
            token = "Signo de parentesis abierto."; idtkn = 6;
            break;               

        case "args":
            token = "Palabra Reservada."; idtkn = 7;
            break;

        case ")":
            token = "Signo de parentesis que cierra."; idtkn = 8;
            break;

        case "{":
            token = "Signo de llave que abre."; idtkn = 9;
            break;

        case "}":
            token = "Signo llave que cierra"; idtkn = 10;
            break;

        case "int":
            token = "Palabra Reservada, se utiliza para declara numeros enteros."; idtkn = 11;
            break;

        case "float":
            token = "Palabra Reservada, se utiliza para declara numeros con decimal."; idtkn = 12;
            break;

        case "bool":
            token = "Palabra Reservada, se utiliza en variables boolenas."; idtkn = 13;
            break;

        case "char":
            token = "Palabra Reservada, se utiliza en variables tipo caracter."; idtkn = 14;
            break;

        case "string":
            token = "Palabra Reservada, se utiliza en  variables tipo cadena."; idtkn = 15;
            break;

        case "String":
            token = "Palabra Reservada, se utiliza en  variables tipo cadena."; idtkn = 15;
            break;

        case ",":
            token = "Signo de coma."; idtkn = 16;
            break;

        case ".":
            token = "Signo de punto."; idtkn = 17;
            break;

        case ";":
            token = "Signo de punto y coma."; idtkn = 18;
            break;

        case "/":
            token = "Signo de division."; idtkn = 19;
            break;

        case "=":
            token = "Signo igual."; idtkn = 20;
            break;

        case "==":
             token = "Signo de operador."; idtkn = 21;
             break;

        case ">":
             token = "Signo de operador."; idtkn = 22;
             break;

        case "<":
             token = "Signo de operador."; idtkn = 23;
             break;

        case "!=":
             token = "Signo de operador."; idtkn = 24;
             break;

        case "+":
             token = "Signo de operador."; idtkn = 25;
             break;

        case "-":
             token = "Signo de operador."; idtkn = 26;
             break;

        case "*":
             token = "Signo de operador."; idtkn = 27;
             break;

        case "Console":
             token = "Palabra Reservada."; idtkn = 28;
             break;

        case "WriteLine":
             token = "Palabra Reservada."; idtkn = 29;
             break;

        case "[":
                    token = "Signos de corchetes que abre."; idtkn = 30;
                    break;

        case "]":
                    token = "Signo corchete que cierra."; idtkn = 31;
                    break;

        case "new":
                    token = "Palabra Reservada."; idtkn = 32;
                    break;

        case "if":
                    token = "Ciclo if."; idtkn = 33;
                    break;

        case "else":
                    token = "Ciclo if."; idtkn = 34;
                    break;

        case "switch":
                    token = "Sentencia Switch."; idtkn = 35;
                    break;

        case "case":
                    token = "Sentencia Switch."; idtkn = 36;
                    break;

        case "break":
                    token = "Sentencia Switch."; idtkn = 37;
                    break;

        case "default":
                    token = "Sentecia Switch."; idtkn = 38;
                    break;

        case ":":
                    token = "Signo dos puntos."; idtkn = 39;
                    break;

                case "for":
                    token = "Ciclo for."; idtkn = 40;
                    break;

                case "<=":
                    token = "Operador."; idtkn = 41;
                    break;

                case ">=":
                    token = "Operador."; idtkn = 42;
                    break;

                case "while":
                    token = "Ciclo while."; idtkn = 43;
                    break;

                case "true":
                    token = "Palabra Reservada."; idtkn = 44;
                    break;

                case "false":
                    token = "Palabra Reservada."; idtkn = 45;
                    break;

                case "public":
                    token = "Palabra Reservada."; idtkn = 47;
                    break;

                case "void":
                    token = "Palabra Reservada."; idtkn = 49;
                    break;

                default:
                    token = "Cadena"; idtkn = 46;
                    break;
    }
}