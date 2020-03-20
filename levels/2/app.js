//Cargar Canvas[Zona de Dibujado]
canvas = document.getElementById("relativo-angle"); //Variable del Canvas.
ctx = canvas.getContext("2d"); //Variable del Contexto.
angleUserVar = document.getElementById("angleData");

//Carga Imagenes.
imgLancha = new Image ();
imgLancha.src = '../../img/boat.png'
imgubicacionMuelle = new Image();
imgubicacionMuelle.src = '../../img/port.png';
imgAngle = new Image ();
imgAngle.src = '../../img/angle.png'

//Cargador de Renderizado.
window.onload = drawUbicacion()

//Variables Canvas.
var ancho = 601;
var alto = 300;

//Variables Calculos.
var y = 300;
var x = 600;
var vrt = 2;
var vlr = 4;
//Obtiene el angulo en Radianes.
var anglerad = Math.asin(vrt/vlr);
//Vuelve el angulo en Grados.
var angledegfloat = anglerad*(180/Math.PI);
//Redondea el valor.
var angledegint = parseInt(angledegfloat);
console.log(angledegint);

//Definir Botones.
bStart = document.getElementById("bStart");
bStart.addEventListener("click", saveDatos);
bReset = document.getElementById("bReset");
bReset.addEventListener("click", resetDatos);

function saveDatos(){
    let angle = angleUserVar.value;
    if(angle == angledegint){
        angleUserVar.disabled = true;
        alert("¡Muy bien! Valor Correcto.");
        drawLanchaFinalMove();
        drawLanchaFinalStatic();
    }else{
        angleUserVar.disabled = true;
        angleUserVar.value = angledegint;
        alert("¡Qué lastima! Te explicaré cómo obtener el Valor Correcto.");
        fetch('../../soluciones/nivel2.txt')
            .then(res => res.text())
            .then(content => {
            let lines = content.split(/\n/);
            lines.forEach(line => alert(line));
        });
        drawLanchaFinalMove();
        drawLanchaFinalStatic();
    }
}
function resetDatos(){
    angleUserVar.disabled = false;
    angleUserVar.value = '';
    ypos = 250;
    drawUbicacion();
}

function drawUbicacion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgLancha, 275, 250);
    ctx.drawImage(imgubicacionMuelle, 288.5, 0);
    requestAnimationFrame(drawUbicacion);
}

function drawLanchaFinalMove() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgLancha, 275, 250);
    ctx.drawImage(imgubicacionMuelle, 288.5, 0);
    ctx.drawImage(imgAngle, 175, 0);
    requestAnimationFrame(drawLanchaFinalMove);
}

function drawLanchaFinalStatic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgLancha, 275, 0);
    ctx.drawImage(imgAngle, 175, 0);
    requestAnimationFrame(drawLanchaFinalStatic);
}