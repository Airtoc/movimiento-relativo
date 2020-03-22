//Cargar Canvas[Zona de Dibujado]
canvas = document.getElementById("relativo-angle"); //Variable del Canvas.
ctx = canvas.getContext("2d"); //Variable del Contexto.
angleUserVar = document.getElementById("angleData");

//Carga Imagenes.
imgLancha = new Image ();
imgLancha.src = '../../img/boat.png'
imgubicacionMuelle = new Image();
imgubicacionMuelle.src = '../../img/port.png';
imgLanchaUser = new Image ();
imgLanchaUser.src = '../../img/boatUser.png'

//Cargador de Renderizado.
window.onload = drawUbicacion()

//Definir Botones.
bStart = document.getElementById("bStart");
bStart.addEventListener("click", saveDatos);
bReset = document.getElementById("bReset");
bReset.addEventListener("click", resetDatos);

//Listener Datos.
angleUserVar.addEventListener("input",restrictValues);

//Variables COM.
var y = canvas.height;
var x = canvas.width;
var vrt = 2;
var vlr = 4;
var angleDegInt, angleDegFloat, angleRad;
//Variables User.
var angleUserS, timeFail, xFail, angleUserRadS, vxTotal, vxHelper;
var xpos, ypos;

//Variables COM.
var angleRad, angleDegFloat, angledegInt;

//Restringe los Inputs.
function restrictValues () {
    this.value = Math.abs(this.value)
    var max = parseInt(this.max);
    value = Math.abs(this.value);
    if (parseInt(this.value) > max) {
        this.value = max;
    }
}

function saveDatos(){
    angleUserVar.disabled = true;
    angleUserS = parseInt(angleUserVar.value);
    console.log(angleUserS);
    //Calculos angulo COM.
    angleRad = Math.asin(vrt/vlr);
    angleDegFloat = angleRad*(180/Math.PI);
    angleDegInt = parseInt(angleDegFloat);
    console.log(angleDegInt);
    //Calculos angulo User.
    angleUserRadS = parseFloat((angleUserS*(Math.PI/180)).toFixed(1));
    vxHelper = parseFloat((vlr*(Math.sin(angleUserRadS))).toFixed(1));
    timeFail = y/(vlr*Math.cos(angleUserRadS));
    vxTotal = parseFloat((vrt - vxHelper).toFixed(0));
    xFail = vxTotal * timeFail;
    ypos = 250;
    xpos = 275;
    console.log(vxHelper);
    console.log(vxTotal);
    console.log(angleUserRadS);
    console.log(xFail);
    console.log(timeFail);
    gamePass();
}

function resetDatos(){
    angleUserVar.disabled = false;
    angleUserVar.value = '';
    angleUserS = '';
    drawUbicacion();
}

function gamePass () {
    if(angleUserS == angleDegInt){
        angleUserVar.disabled = true;
        alert("¡Muy bien! Valor Correcto.");
        drawLanchaCorrect();
    }else{
        alert("¡Qué lastima! Te explicaré cómo obtener el Valor Correcto.");
        fetch('../../soluciones/nivel2.txt')
            .then(res => res.text())
            .then(content => {
            let lines = content.split(/\n/);
            lines.forEach(line => alert(line));
        });
        drawLanchaFail();
    }
}

function drawUbicacion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgLancha, 275, 250);
    ctx.drawImage(imgubicacionMuelle, 288.5, 0);
    requestAnimationFrame(drawUbicacion);
}

function drawLanchaCorrect () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgLancha, xpos, ypos);
    ypos -= 4;
    if (angleUserVar.disabled == true && ypos > 0) {
        requestAnimationFrame (drawLanchaCorrect);
    }else {
        drawLanchaCorrectS ();
    }
}

function drawLanchaCorrectS () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height);
    ctx.drawImage(imgLancha, xpos, 0);
    requestAnimationFrame (drawLanchaCorrectS);
}

function drawLanchaFail () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgLancha, xpos, 0);
    ctx.drawImage(imgLanchaUser, 285 - xFail, 0);
    requestAnimationFrame (drawLanchaFail);
}