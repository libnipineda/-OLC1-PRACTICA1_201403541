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
    //let ana = new Lexico();

    //ana.vertokns();
    vertokens();    
}