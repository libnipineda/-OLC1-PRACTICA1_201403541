//document.querySelector("#boton").addEventListener('click', CargarJson);

function processFiles(files)
{
    var file = files[0];

    var reader = new FileReader();

    reader.onload = function(e){
        var output = document.getElementById("editor");
        output.textContent = e.target.result;
    };

    reader.readAsText(file);
}

function Guardar()
{
    var escribir = document.getElementById("editor").value;

    var archivoblob = new Blob([escribir], {type:'c#'});

    var nombreguardar = "Archivo.txt";


    var dowloadlink = document.createElement("a");

    dowloadlink.download = nombreguardar;

    dowloadlink.innerHTML = "Link";

    window.URL = window.URL || window.webkitURL;

    dowloadlink.href = window.URL.createObjectURL(archivoblob);

    dowloadlink.onclick = destroyClickedElement;

    dowloadlink.style.display = "none";

    document.body.appendChild(dowloadlink);

    dowloadlink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function analizar(){
//  let ana = new Lexico();

    var archivo = document.getElementById("editor").value;

//    ana.Scanner(archivo);
    Scanner(archivo);
}

function addTable()
{
    vertokens();    
}

function CargarJson()
{
    // C://Users//libni//Downloads//Tokens.json
    var path = 'C://Users//libni//Downloads//Tokens.json';

    const xhttp = new XMLHttpRequest();

    //xhttp.open('GET',path,true);
    xhttp.open('GET','file:///C:/Users/libni/Downloads/Tokens.json',true);
    var datajson = xhttp.responseText;
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200 || xhttp.status == 0)
        {
           //let datos = JSON.stringify(this.responseText);
           var modificar = JSON.parse(JSON.stringify(datajson));
           //console.log(modificar);
           let respuesta = document.querySelector('#Table');
           respuesta.innerHTML = '';
           for(let item in modificar)
           {
               //console.log(item.lexema);
               respuesta.innerHTML += `
                 <tr>
                    <td>${item.lexema}</td>
                    <td>${item.id}</td>
                    <td>${item.token}</td>
                    <td>${item.fila}</td>
                    <td>${item.columna}</td>
                 </tr>
               `
           }
        }
        else
        {
            alert("Error cargar pagina\n");
        }
    };
    xhttp.send();
}

/*
    var json = archivojson[0];

    var reader = new FileReader();
    reader.onload = function(e){
        
    };

    console.log(json);
    var DatosJson = JSON.parse(json);
    console.log(DatosJson.Tokens.length);

    $("#Table").append('<tr><td>lexema</td>'+
    '<td>id</td>' + 
    '<td>token</td>' +
    '<td>fila</td>' +
    '<td>columna</td>');

    for(i = 0; i < DatosJson.Tokens.length; i++)
    {
        $("#Table").append('<tr>' +
 	 '<td align="center" style="dislay: none;">' + DatosJson.Tokens[i].lexema + '</td>'+
 	 '<td align="center" style="dislay: none;">' + DatosJson.Tokens[i].id + '</td>'+
     '<td align="center" style="dislay: none;">' + DatosJson.Tokens[i].token + '</td>'+
     '<td align="center" style="dislay: none;">' + DatosJson.Tokens[i].fila + '</td>'+
     '<td align="center" style="dislay: none;">' + DatosJson.Tokens[i].columna + '</td>'+'</tr>');
    }*/