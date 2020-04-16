class Token {
    constructor(numero, lexema, idtkn, tkn, fila, columna) {
        this.numero = numero;
        this.lexema = lexema;
        this.idtkn = idtkn;
        this.tkn = tkn;
        this.fila = fila;
        this.columna = columna;
    }
}

class Lexico
{
    constructor()
    {
        this.listaToken = [];
        this.listaError = [];
    }
    
Scanner(cadena)
{
    this.cadena += "\n   ";
    this.listaToken = [];
    this.listaError = [];

    var numero = 0, estado = 0, idtkn = 0, fila = 1, columna = 1, tempfila = 0, tempcolumna = 0, indice = 0;
    var concatenar = "", caracter = '';

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
                    this.listaError.push(numero,"Lexico",concatenar,"valor desconocido.",tempfila,tempcolumna);
                    indice++; numero++; columna++; concatenar = "";
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 1 ------------------------------
            case 1:
                if(caracter == String.fromCharCode(46))
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
                    let temporal = new Token(indice,concatenar,1,"Numero",tempfila, tempcolumna)
                    this.listaToken.push(temporal);
                    indice++; concatenar = "";
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 2 ------------------------------
            case 2:
                estado = 0;
                let temporal = new Token(indice,concatenar,this.AnalizarId(concatenar),this.AnalizarTkn(concatenar),tempfila,tempcolumna)
                this.listaToken.push(temporal);
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
                    this.AnalizarTkn(concatenar);
                    estado = 0;
                    let temporal = new Token(indice,concatenar,this.AnalizarId(concatenar),this.AnalizarTkn(concatenar),tempfila,tempcolumna);
                    this.listaToken.push(temporal);
                    indice++; concatenar = "";
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 4 ------------------------------
            case 4:
                if(caracter == String.fromCharCode(34))
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
                if(caracter == String.fromCharCode(39))
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
                if(caracter == String.fromCharCode(47))
                {
                    estado = 10; concatenar += caracter; columna++; numero++;                    
                }
                else
                {
                    this.AnalizarTkn(concatenar);
                    estado = 0;
                    let aux = new Token(indice,concatenar,50,"signo /",tempfila,tempcolumna);
                    this.listaToken.push(aux);
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
                if(caracter == String.fromCharCode(34))
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
                if(caracter == String.fromCharCode(39))
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
                if(caracter == String.fromCharCode(42))
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
                    let aux = new Token(indice,concatenar,48,"Decimal",tempfila,tempcolumna);
                    this.listaToken.push(aux);
                    indice++; concatenar = "";
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 12 ------------------------------
            case 12:
                this.AnalizarTkn(concatenar);
                estado = 0;
                let temporal1 = new Token(indice,concatenar,this.AnalizarId(concatenar),this.AnalizarTkn(concatenar),tempfila,tempcolumna);
                this.listaToken.push(temporal1);
                indice++; concatenar = "";
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 13 ------------------------------
            case 13:
                if(caracter == String.fromCharCode(10))
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
                if(caracter == String.fromCharCode(42))
                {
                    estado = 15; concatenar += caracter; columna++; numero++;
                }
                else if(caracter == String.fromCharCode(10))
                {
                    this.AnalizarTkn(concatenar);
                    estado = 0;
                    let aux = new Token(indice,concatenar,51,"Comentario",tempfila,tempcolumna);
                    this.listaToken.push(aux);
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
                if(caracter == String.fromCharCode(47))
                {
                    estado = 16; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 16 ------------------------------
            case 16:
                if(caracter == String.fromCharCode(47))
                {
                    estado = 17; concatenar += caracter; columna++; numero++;
                }
                break;
    //------------------------------ FIN ESTADO ------------------------------
    //------------------------------ Estado 17 ------------------------------
            case 17:
                this.AnalizarTkn(concatenar);
                estado = 0;
                let temporal2 = new Token(indice,concatenar,52,"Comentario Multilinea",tempfila,tempcolumna);
                this.listaToken.push(temporal2);
                indice++; concatenar = "";
                break;    
        }
    }

    console.log("//////////////////////");
    console.log("tokens:");
    if(this.listaToken.length == 0)
    {
        console.log("No hay valores en la lista");
    }
    else
    {
        for(var i = 0; i < this.listaToken.length; i++)
        {
           console.log(this.listaToken[i]);        
        }
    }

    console.log("errores:");
    for(var i = 0; i < this.listaError.length; i++)
    {
        console.log(this.listaError[i]);
    }
}

AnalizarTkn(valorTkn)
{
    switch(valorTkn)
    {
        case "class":
            return "Palabra Reservada.";

        case "static":
            return "Palabra Reservada.";

        case "void":
            return "Palabra Reservada.";

        case "Main":
            return "Palabra Reservada.";

        case "(":
            return "Signo de parentesis abierto.";

        case "args":
            return "Palabra Reservada.";

        case ")":
            return "Signo de parentesis que cierra.";

        case "{":
            return "Signo de llave que abre.";

        case "}":
            return "Signo llave que cierra";            

        case "int":
            return "Palabra Reservada, se utiliza para declara numeros enteros.";

        case "float":
            return "Palabra Reservada, se utiliza para declara numeros con decimal.";            

        case "bool":
            return "Palabra Reservada, se utiliza en variables boolenas.";            

        case "char":
            return "Palabra Reservada, se utiliza en variables tipo caracter.";

        case "string":
            return "Palabra Reservada, se utiliza en  variables tipo cadena.";            

        case "String":
            return "Palabra Reservada, se utiliza en  variables tipo cadena.";
            
        case ",":
            return "Signo de coma.";

        case ".":
            return "Signo de punto.";
            
        case ";":
            return "Signo de punto y coma.";
            
        case "/":
            return "Signo de division.";

        case "=":
            return "Signo igual.";            

        case "==":
            return "Signo de operador.";             

        case ">":
            return "Signo de operador.";             

        case "<":
            return "Signo de operador.";             

        case "!=":
            return "Signo de operador.";             

        case "+":
            return "Signo de operador.";             

        case "-":
            return "Signo de operador.";             

        case "*":
            return "Signo de operador.";             

        case "Console":
            return "Palabra Reservada.";             

        case "WriteLine":
            return "Palabra Reservada.";

        case "[":
            return "Signos de corchetes que abre.";
            
        case "]":
            return "Signo corchete que cierra.";
            
        case "new":
            return "Palabra Reservada.";
            
        case "if":
            return "Ciclo if.";
            
        case "else":
            return "Ciclo if.";
            
        case "switch":
            return "Sentencia Switch.";
            
        case "case":
            return "Sentencia Switch.";
            
        case "break":
            return "Sentencia Switch.";
            
        case "default":
            return "Sentecia Switch.";
            
        case ":":
            return "Signo dos puntos.";
            
        case "for":
            return "Ciclo for.";            

        case "<=":
            return "Operador.";
            
        case ">=":
            return "Operador.";
            
        case "while":
            return "Ciclo while.";
            
        case "true":
            return "Palabra Reservada.";
            
        case "false":
            return "Palabra Reservada.";
            
        case "public":
            return "Palabra Reservada.";
            
        case "void":
            return "Palabra Reservada.";
            
        default:
            return "Cadena";            
    }
}

AnalizarId(elemento)
{
    switch(elemento)
    {
        case "class":
            return 2;
            
        case "static":
            return 3;
            
        case "void":
            return 4;
            
        case "Main":
            return 5;
            
        case "(":
            return 6;
                          
        case "args":
            return 7;
            
        case ")":
            return 8;
            
        case "{":
            return 9;
            
        case "}":
            return 10;
            
        case "int":
            return 11;
            
        case "float":
            return 12;
            
        case "bool":
            return 13;
            
        case "char":
            return 14;
            
        case "string":
            return 15;
            
        case "String":
            return 15;
            
        case ",":
            return 16;
            
        case ".":
            return 17;
            
        case ";":
            return 18;
            
        case "/":
            return 19;
            
        case "=":
            return 20;
            
        case "==":
            return 21;
             
        case ">":
            return 22;
             
        case "<":
            return 23;
             
        case "!=":
            return 24;
             
        case "+":
            return 25;
             
        case "-":
            return 26;
             
        case "*":
            return 27;
             
        case "Console":
            return 28;
             
        case "WriteLine":
            return 29;
             
        case "[":
            return 30;
            
        case "]":
            return 31;
            
        case "new":
            return 32;
            
        case "if":
            return 33;
            
        case "else":
            return 34;
            
        case "switch":
            return 35;
            
        case "case":
            return 36;
            
        case "break":
            return 37;
            
        case "default":
            return 38;
            
        case ":":
            return 39;
            
        case "for":
            return 40;
            
        case "<=":
            return 41;
            
        case ">=":
            return 42;
            
        case "while":
            return 43;
            
        case "true":
            return 44;
            
        case "false":
            return 45;
            
        case "public":
            return 47;
            
        case "void":
            return 49;
            
        default:
            return 46;
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

}