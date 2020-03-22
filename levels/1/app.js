//Cargar Canvas[Zona de Dibujado]
canvas = document.getElementById("relativo"); //Variable del Canvas.
ctx = canvas.getContext("2d"); //Variable del Contexto.
xText = document.getElementById("xText");
xUser = document.getElementById('xUser');
vlrUser = document.getElementById('vlr');

//Carga Imagenes.
imgLancha = new Image ();
imgLancha.src = '../../img/boat2.png'
imgubicacionMuelle = new Image();
imgubicacionMuelle.src = '../../img/ubicationline.png';

//Cargador de Renderizado.
window.onload = drawUbicacion();

//Definir Botones.
bStart = document.getElementById("bStart");
bStart.addEventListener("click", saveDatos);
bReset = document.getElementById("bReset");
bReset.addEventListener("click", resetDatos);

//Variables User.
var xUserS, vlrUserS;

//Variables COM.
var x = canvas.width-1;
var y = canvas.height;
var vrt = 6;
var time, xCom, vrtFail;
var ypos, xpos;
var yposf, xposf;

function saveDatos () {
    xUser.disabled = true;
    xUserS = parseInt(xUser.value);
    vlrUserS = Math.floor(vlrUser.value);
    vlrUser.disabled = true;
    console.log(vlrUserS);
    console.log(xUserS);
    //Calculos.
    time = y/vlrUserS;
    xCom = Math.floor(time*vrt);
    vrtFail = Math.floor((xUserS)/(y/vlrUserS));
    ypos = canvas.height-12;
    xpos = 0;
    yposf = canvas.height-12;
    xposf = 0;
    gamePass();
}

function resetDatos () {
    xUser.disabled = false;
    xUser.value = x/2;
    vlrUser.disabled = false;
    vlrUser.value = '';
    xUserS = x/2;
    vlrUserS = '';
    ypos = canvas.height-12;
    xpos = 0;
    yposf = canvas.height-12;
    xposf = 0;
    drawUbicacion();
}

function gamePass () {
    //Se muestran los valores en Consola.s
    console.log(xCom);
    console.log(xUserS);
    console.log(time);
    console.log(vrtFail);
    if (xCom == xUserS) {
        alert("¡Muy bien! Valor Correcto.");
        drawLanchaCorrect();
    }else{
        alert("¡Qué lastima! Te explicaré cómo obtener el Valor Correcto.")
        fetch('../../soluciones/nivel1.txt')
            .then(res => res.text())
            .then(content => {
            let lines = content.split(/\n/);
            lines.forEach(line => alert(line));
        });
        drawLanchaFail();
    }
}

function drawUbicacion () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let xUserDraw = parseInt(xUser.value);
    ctx.drawImage(imgLancha, 0, canvas.height-25);
    ctx.drawImage(imgubicacionMuelle, xUserDraw, 0);
    console.log(xUserDraw); //Muestra la posición por consola.
    xText.innerHTML = xUserDraw;
    requestAnimationFrame(drawUbicacion);
}

function drawLanchaCorrect () { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Linea Recorrida
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(xCom, 0);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    //Recorrido del usuario (correcto).
    ctx.drawImage(imgLancha, xpos-12, ypos);
    xpos += vrt;
    ypos -= vlrUserS;
    console.log(ypos);
    if (xUser.disabled == true && ypos > 0){
        requestAnimationFrame(drawLanchaCorrect);
    }else{
        drawLanchaCorrectS();
    }   
}

function drawLanchaCorrectS () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Linea Recorrida.
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(xCom, 0);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.drawImage(imgLancha, xCom-25, ypos);
    requestAnimationFrame(drawLanchaCorrectS);
}

function drawLanchaFail () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Dibuja linea del Usuario.
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(xUserS, 0);
    ctx.strokeStyle = "#ff00e1";
    ctx.stroke();
    //Dibuja linea Correcta/COM.
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(xCom, 0);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    //Dibuja lancha Correcta.
    ctx.drawImage(imgLancha, xpos-12, ypos);
    xpos += vrt;
    ypos -= vlrUserS;
    console.log(ypos);
    //Dibuja lancha Usuario.
    ctx.drawImage(imgLancha, xposf, yposf)
    xposf += vrtFail;
    yposf -= vlrUserS;
    if (xUser.disabled == true && ypos > 0 && yposf > 0 ){
        requestAnimationFrame(drawLanchaFail);
    }else {
        drawLanchaFailS ();
    }
}

function drawLanchaFailS () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(xUserS, 0);
    ctx.strokeStyle = "#ff00e1";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(xCom, 0);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.drawImage(imgLancha, xCom-25, 0);
    ctx.drawImage(imgLancha, xUserS-25, 0);
    requestAnimationFrame(drawLanchaFailS);
}