//Cargar Canvas[Zona de Dibujado]
canvas = document.getElementById("relativo"); //Variable del Canvas.
ctx = canvas.getContext("2d"); //Variable del Contexto.
xflValor = document.getElementById("xflValor");
xflVar = document.getElementById('xfl');
explain = document.getElementById('explainNivel');
//Carga Imagenes.
imgLancha = new Image ();
imgLancha.src = '../../img/boat.png'
imgubicacionMuelle = new Image();
imgubicacionMuelle.src = '../../img/ubicationline.png';

//Cargador de Renderizado.
window.onload = drawUbicacion()

//Variables Canvas.
var ancho = 601;
var alto = 300;
//Variables Calculos.
var y = 300;
var x = 600;
var vlr = 9;
var vrt = 6;
//Calculo
time = y/vlr;
var xfinal = time*vrt;

//Definir Botones.
bStart = document.getElementById("bStart");
bStart.addEventListener("click", saveDatos);
bReset = document.getElementById("bReset");
bReset.addEventListener("click", resetDatos);

function saveDatos () {
    let xfl = parseInt(xflVar.value);
    if (xfl == xfinal){
        xflVar.disabled = true;
        alert("¡Muy bien! Valor Correcto.");
        drawLanchaFinal();
    } else {
        xflVar.disabled = true;
        xflVar.value = xfinal;
        xflValor.value = xfinal;
        drawLanchaFinal();
        alert("¡Qué lastima! Te explicaré cómo obtener el Valor Correcto.")
        fetch('../../soluciones/nivel1.txt')
            .then(res => res.text())
            .then(content => {
            let lines = content.split(/\n/);
            lines.forEach(line => alert(line));
        });
    }
}

function resetDatos () {
    xflVar.disabled = false;
    xflVar.value = 600/2;
    Main();
}

function drawUbicacion (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let xfl = parseInt(xflVar.value);
    ctx.drawImage(imgLancha, 0, 250);
    ctx.drawImage(imgubicacionMuelle,0,0,1,300,xfl,0,1,300);
    console.log(xfl); //Muestra la posición por consola.
    xflValor.innerHTML = xfl;
    requestAnimationFrame(drawUbicacion);
}

function drawLanchaFinal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgLancha, 150, 0);
    ctx.drawImage(imgubicacionMuelle, 200, 0);
    if (xflVar.disabled == true){
        requestAnimationFrame(drawLanchaFinal);
    }     
}