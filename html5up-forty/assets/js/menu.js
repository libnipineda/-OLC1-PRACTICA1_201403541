document.querySelector("#boton").addEventListener('click', CargarJson());

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
    //console.log("prueba");
    // C://Users//libni//Downloads//Tokens.json
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET','file:///C://Users//libni//Downloads//Tokens.json',false);
//    xhttp.open('GET','Tokens.json"',true);
    xhttp.send(null);
    if(this.status == 0)
    {
        console.log(this.responseText);

        let datos = JSON.parse(this.responseText);

    }    
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