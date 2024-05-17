/*

//Valores de mostrar tiempo
const elementoTiempo1 = document.getElementById("tiempo1");
// Establecer el contenido del elemento con el valor de numeroTiempo
elementoTiempo1.textContent = numeroTiempo;

const elementoTiempo2 = document.getElementById("tiempo2");
// Establecer el contenido del elemento con el valor de numeroTiempo
elementoTiempo2.textContent = numeroTiempo;

const elementoTiempo3 = document.getElementById("tiempo3");
// Establecer el contenido del elemento con el valor de numeroTiempo
elementoTiempo3.textContent = numeroTiempo;

const elementoTiempo4 = document.getElementById("tiempo4");
// Establecer el contenido del elemento con el valor de numeroTiempo
elementoTiempo4.textContent = numeroTiempo;

const nombresEquipos = JSON.parse(localStorage.getItem("nombresEquipos"));

// Utilizar los nombres de los equipos en variables individuales
let equipo1 = nombresEquipos[0];
let equipo2 = nombresEquipos[1];
let equipo3 = nombresEquipos[2];
let equipo4 = nombresEquipos[3];

// Imprimir los nombres de los equipos en la consola
console.log("Nombre del Equipo 1:", equipo1.toUpperCase());
console.log("Nombre del Equipo 2:", equipo2.toUpperCase());
console.log("Nombre del Equipo 3:", equipo3.toUpperCase());
console.log("Nombre del Equipo 4:", equipo4.toUpperCase());

let equipo1Element = document.getElementById("modalPlayer1");
if (equipo1Element) {
    equipo1Element.querySelector(".modal-contenido").innerHTML = `<p>Turno del equipo: ${equipo1}</p>`;
} else {
    console.error("Elemento modalPlayer1 no encontrado en el DOM.");
}

let equipo2Element = document.getElementById("modalPlayer2");
if (equipo2Element) {
    equipo2Element.querySelector(".modal-contenido").innerHTML = `<p>Turno del equipo: ${equipo2}</p>`;
} else {
    console.error("Elemento modalPlayer2 no encontrado en el DOM.");
}

let equipo3Element = document.getElementById("modalPlayer3");
if (equipo3Element) {
    equipo3Element.querySelector(".modal-contenido").innerHTML = `<p>Turno del equipo: ${equipo3}</p>`;
} else {
    console.error("Elemento modalPlayer3 no encontrado en el DOM.");
}

let equipo4Element = document.getElementById("modalPlayer4");
if (equipo4Element) {
    equipo4Element.querySelector(".modal-contenido").innerHTML = `<p>Turno del equipo: ${equipo4}</p>`;
} else {
    console.error("Elemento modalPlayer4 no encontrado en el DOM.");
}

// Nuevo modales
let equipo1Element1 = document.getElementById("modalPlayers1");
if (equipo1Element1) {
    equipo1Element1.querySelector(".modal-contenido1").innerHTML = `<p>Turno del equipo: ${equipo1}</p>`;
} else {
    console.error("Elemento modalPlayer1 no encontrado en el DOM.");
}

let equipo2Element1 = document.getElementById("modalPlayers2");
if (equipo2Element1) {
    equipo2Element1.querySelector(".modal-contenido1").innerHTML = `<p>Turno del equipo: ${equipo2}</p>`;
} else {
    console.error("Elemento modalPlayer2 no encontrado en el DOM.");
}

let equipo3Element1 = document.getElementById("modalPlayers3");
if (equipo3Element1) {
    equipo3Element1.querySelector(".modal-contenido1").innerHTML = `<p>Turno del equipo: ${equipo3}</p>`;
} else {
    console.error("Elemento modalPlayer3 no encontrado en el DOM.");
}

let equipo4Element1 = document.getElementById("modalPlayers4");
if (equipo4Element1) {
    equipo4Element1.querySelector(".modal-contenido1").innerHTML = `<p>Turno del equipo: ${equipo4}</p>`;
} else {
    console.error("Elemento modalPlayer4 no encontrado en el DOM.");
}
*/

const numeroTiempo = localStorage.getItem("numTiempo");
console.log("Prueba si esta el tiempo", numeroTiempo);
if (numeroTiempo === null) {
    console.error("Si no esta el tiempo");
}

const numeroJugadores = parseInt(localStorage.getItem("numeroJug"), 10); // Aseguramos que es un número
console.log("Prueba si esta el Numequipos", numeroJugadores);
if (isNaN(numeroJugadores)) { // Cambiado a verificación de NaN por coherencia
    console.error("Si no esta Numequipos");
}

const nombresEquipos = JSON.parse(localStorage.getItem("nombresEquipos") || "[]"); // Asegurar una salida no null

// Asignar tiempo y nombres a elementos según el número de jugadores
for (let i = 1; i <= 4; i++) {
    const elementoTiempo = document.getElementById(`tiempo${i}`);
    const modalPlayer = document.getElementById(`modalPlayer${i}`);
    const modalPlayers = document.getElementById(`modalPlayers${i}`);
    
    if (i <= numeroJugadores) {
        // Establecer el contenido del elemento con el valor de numeroTiempo
        if (elementoTiempo) {
            elementoTiempo.textContent = numeroTiempo;
        }
        
        // Configurar el contenido del modal con el nombre del equipo
        const nombreEquipo = nombresEquipos[i - 1] || `Equipo ${i}`;
        if (modalPlayer) {
            modalPlayer.querySelector(".modal-contenido").innerHTML = `<p style="color: black;">Turno del equipo: ${nombreEquipo}</p>`;
        }
        if (modalPlayers) {
            modalPlayers.querySelector(".modal-contenido1").innerHTML = `<p style="color: black;">Turno del equipo: ${nombreEquipo}</p>`;
        }

        console.log(`Nombre del Equipo ${i}:`, nombreEquipo.toUpperCase());
    } else {
        // Ocultar elementos no usados
        if (elementoTiempo) elementoTiempo.parentNode.style.display = 'none';
        if (modalPlayer) modalPlayer.style.display = 'none';
        if (modalPlayers) modalPlayers.style.display = 'none';
    }
}

//inicializacion de variables
let tiempojuego = numeroTiempo;
let jugadores = numeroJugadores;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 70;
let timerinicial = 70;
let tiemporegresivo = null;

var tiempoMaximo = tiempojuego; // Tiempo máximo en segundos para cada jugador
console.log("Nombre del tiempo owo",tiempoMaximo);

var tiempoRestante = tiempoMaximo;

//sonidos
let winaudio = new Audio('./Sonido/ganar.wav');
let loseaudio = new Audio('./Sonido/perder.wav');
let clickaudio = new Audio('./Sonido/click.wav');
let rightaudio = new Audio('./Sonido/right.wav');
let wrongaudio = new Audio('./Sonido/wrong.wav');

//aputnando a documento html
let mostrarmovimientos = document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('t-restantes'); 
let mostrarmodelo = document.getElementById('modales')

// Jugadores
const displayScore1 = document.querySelector('#score1');
const displayScore2 = document.querySelector('#score2');
const displayScore3 = document.querySelector('#score3');
const displayScore4 = document.querySelector('#score4');
//carta de respuesta
let mostrartitulo = document.getElementById("titulo_respuesta");
let mostrardescripcion = document.getElementById("descripcion_respuesta");
let titulo = null;
let descripción = null;


// Llamar a la función para cargar datos de manera síncrona
cargarDatosFetch()
// console.log(titulos);
// console.log(descripciones);
window.dataVectorA = JSON.parse(localStorage.getItem('dataVectorA')) || [];
window.dataVectorB = JSON.parse(localStorage.getItem('dataVectorB')) || [];
window.dataVectorC = JSON.parse(localStorage.getItem('dataVectorC')) || [];

//crear auxiliares de los vectores fetch
const titulos = dataVectorA
const descripciones = dataVectorB
// console.log(titulos)
// console.log(descripciones)


//cargar y recortar enlaces para vincular imagenes
let ImagenesFetch1 = [];
for (let i = 0; i < dataVectorC.length; i++) {
    const link = dataVectorC[i];
    if (link === null || typeof link !== 'string') {
        ImagenesFetch1.push(String(link)); // Tratar el valor nulo o no string como texto
    } else {
        const regex = /\/d\/([^/]+)\//;
        const match = link.match(regex);
        if (match && match.length > 1) {
            ImagenesFetch1.push(match[1]); // Devolver la parte deseada del enlace
        } else {
            ImagenesFetch1.push(link); // Retornar el enlace original si no se puede encontrar la parte deseada
        }
    }
}
console.log("wow")
console.log(ImagenesFetch1);


//obtenr posiciones de respuestas a usar
// Creamos un nuevo arreglo con 12 valores aleatorios del arreglo original
const MostrarRespuestas = obtenerValoresAleatorios(titulos.length, 15); //proabando
// console.log(numeros[MostrarRespuestas[id]])
console.log(MostrarRespuestas)

let numeros = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,,13,13,14,14]; 
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funcion
function contartiempo(){
    tiemporegresivo = setInterval(()=>{
        timer--;
        mostrartiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiemporegresivo);
            bloqueartarjetas();
            loseaudio.play();
        }
    },1000);
}

function bloqueartarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetabloqueada = document.getElementById(i);
        tarjetabloqueada.innerHTML = `<img src="./Imagenes/${numeros[i]}.png" alt="">`;
        tarjetabloqueada.disabled = true;
    }
}

// Inicialización de variables // Cambia este valor según el número de jugadores
let turnoActual = 1;
let score1 = 0;
let score2 = 0;
let score3 = 0;
let score4 = 0;
let puntajeTotal = 0;
let p1Turn = true;
let p2Turn = true;
let p3Turn = true;
let p4Turn = true;
let juegoActivo = true;
// Funciones para el tiempo de partidos:
let temporizadorId;

function actualizarTiempo() {
     // Primero, verifica si el juego aún está activo. Si no, detén el temporizador.
     if (!juegoActivo) {
        console.log("El juego ha finalizado. Deteniendo el temporizador.");
        clearTimeout(temporizadorId);
        return; // Sale de la función para no seguir actualizando el tiempo ni cambiar de turno.
    }

    if (tiempoRestante === 0) {
        siguienteTurno(); // Cambia al siguiente jugador automáticamente
        document.getElementById('tiempo' + ((turnoActual === 1) ? jugadores : (turnoActual - 1))).textContent = tiempoMaximo;
        
    } else {
        tiempoRestante--;
        document.getElementById('tiempo' + turnoActual).textContent = tiempoRestante;
        // Actualizar el tiempo restante del jugador actual en la variable
        
        clearTimeout(temporizadorId); // Cancela el temporizador anterior por precaución
        temporizadorId = setTimeout(actualizarTiempo, 1000); // Establece un nuevo temporizador para continuar la cuenta regresiva
    }
}

function finalizarJuego() {
    const equipos = [
        { nombre: nombresEquipos[0] || 'Equipo 1', puntaje: score1 },
        { nombre: nombresEquipos[1] || 'Equipo 2', puntaje: score2 },
        { nombre: nombresEquipos[2] || 'Equipo 3', puntaje: score3 },
        { nombre: nombresEquipos[3] || 'Equipo 4', puntaje: score4 }
    ];

    // Filtrar solo los equipos que realmente participaron
    const equiposActivos = equipos.slice(0, numeroJugadores);

    localStorage.setItem('ganadores', JSON.stringify(equiposActivos));
    document.querySelector('.ganadoress').style.display = 'block';
}


function tiempodepar() {
     // Primero, verifica si el juego aún está activo. Si no, detén el temporizador.
     if (!juegoActivo) {
        console.log("El juego ha finalizado. Deteniendo el temporizador.");
        clearTimeout(temporizadorId);
        return; // Sale de la función para no seguir actualizando el tiempo ni cambiar de turno.
    }

    if (tiempoRestante === 0) {
        siguienteTurno(); // Cambia al siguiente jugador automáticamente
    } else {
        tiempoRestante--;
        document.getElementById('tiempo' + turnoActual).textContent = tiempoRestante;
        clearTimeout(temporizadorId); // Cancela el temporizador anterior por precaución
        temporizadorId = setTimeout(actualizarTiempo, 1000); // Establece un nuevo temporizador para continuar la cuenta regresiva
    }
}
let tiempoRegresivo;

function actualizarColorFondo(turnoActual) {
    // Resetear el fondo a todos los marcadores primero
    var todosLosFrames = ['jugador1Scoreboard', 'jugador2Scoreboard', 'jugador3Scoreboard', 'jugador4Scoreboard'];
    todosLosFrames.forEach(function(frameId) {
        document.getElementById(frameId).style.background = "white";  // color original
    });

    // Establecer el nuevo color de fondo según el turno actual
    switch(turnoActual) {
        case 1:
            console.log(`Entro aqui owoo owowowowo`);
            document.getElementById('jugador1Scoreboard').style.background = "#ff6961"; // Rojo para el equipo 1
            break;
        case 2:
            console.log(`Entro el el segundo color`);
            document.getElementById('jugador2Scoreboard').style.background = "#84b6f4"; // Azul para el equipo 2
            break;
        case 3:
            document.getElementById('jugador3Scoreboard').style.background = "#fdfd96"; // Amarillo para el equipo 3
            break;
        case 4:
            document.getElementById('jugador4Scoreboard').style.background = "#77dd77"; // Verde para el equipo 4
            break;
    }
}

function siguienteTurno() {
    // Verificar si hay tarjetas destapadas y taparlas si es necesario
    if (tarjetasdestapadas > 0) {
        if (tarjetasdestapadas === 1) {
            tarjeta1.textContent = parseInt(tarjeta1.id) + 1; // O el contenido por defecto que represente una carta tapada
            tarjeta1.disabled = false;
        } else if (tarjetasdestapadas === 2) {
            tarjeta1.textContent = parseInt(tarjeta1.id) + 1; // o el contenido por defecto que represente una carta tapada
            tarjeta1.disabled = false;
            tarjeta2.textContent = parseInt(tarjeta2.id) + 1;
            tarjeta2.disabled = false;
        }
        tarjetasdestapadas = 0; // Resetear el contador de tarjetas destapadas
        
    }

    turnoActual = (turnoActual % jugadores) + 1;
    console.log(`Turno del jugador ${turnoActual}`);
    tiempoRestante = tiempoMaximo;
    document.getElementById('tiempo' + ((turnoActual === 1) ? jugadores : (turnoActual - 1))).textContent = tiempoMaximo;
    console.log(tiempoMaximo);
    // Ocultar todos los modales
    for (let i = 1; i <= jugadores; i++) {
        let modal = document.getElementById(`modalPlayer${i}`);
        modal.style.display = 'none';
        modal.classList.remove('modal-rojo', 'modal-azul', 'modal-amarillo', 'modal-verde'); // Remover todas las clases de color

        let modal2 = document.getElementById(`modalPlayers${i}`);
        modal2.style.display = 'none';

        
    }
    

    // Reiniciar el temporizador para el nuevo jugador
    clearTimeout(temporizadorId); // Asegúrate de cancelar cualquier temporizador existente antes de iniciar uno nuevo
    temporizadorId = setTimeout(actualizarTiempo, 1000);

    
    // Mostrar el modal correspondiente al jugador actual
    let modalActual = document.getElementById(`modalPlayer${turnoActual}`);
    modalActual.style.display = 'block';
    
    
    // Cambiar el color de fondo de la pantalla completa
    
    // Asignar la clase de color correspondiente al modal del jugador actual
    switch (turnoActual) {
        case 1:
            modalActual.classList.add('modal-rojo');
            break;
        case 2:
            modalActual.classList.add('modal-azul');
            break;
        case 3:
            modalActual.classList.add('modal-amarillo');
            break;
        case 4:
            modalActual.classList.add('modal-verde');
            break;
        // Agrega más casos según la cantidad de jugadores si es necesario
        default:
            break;
    }
     

    setTimeout(function() {
        modalActual.style.display = 'none';
      }, 3000);

    
     
    actualizarTiempo();
    
    actualizarColorFondo(turnoActual);
}



//Recarga pagina del juego 
function recargarPagina() {
    location.reload();
}

function iniciarJuego() {
   
    siguienteTurno(); // Prepara el juego para el primer jugador
}

let tarjetasdestapadas = 0;
//funcion principal
function destapar(id){
    //if(temporizador == false){
        //contartiempo();
        //temporizador = true;
    //}
    
    tarjetasdestapadas++;
    console.log(tarjetasdestapadas);
    
    if(tarjetasdestapadas == 1){
        
        // Mostrar el primer numero
        tarjeta1 =document.getElementById(id);
        primerresultado = numeros[id]

        // tarjeta1.innerHTML = `<img src="./Imagenes/${MostrarRespuestas[primerresultado]}.png" alt="">`;
        tarjeta1.innerHTML = `<img src="https://drive.google.com/thumbnail?sz=w&id=${ImagenesFetch1[MostrarRespuestas[primerresultado]]}" >`;
        clickaudio.play();
        
        //Deshabilitar primer boton
        tarjeta1.disabled = true;

    } else if(tarjetasdestapadas ==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoresultado = numeros[id];
        // tarjeta2.innerHTML = `<img src="./Imagenes/${MostrarRespuestas[segundoresultado]}.png" alt="">`;
        tarjeta2.innerHTML = `<img src="https://drive.google.com/thumbnail?sz=w&id=${ImagenesFetch1[MostrarRespuestas[segundoresultado]]}" >`;
        
        //Deshabilirtar segundo boton
        tarjeta2.disabled = true;
       
        
        //incrementar movimientos
        //movimientos++;
        //mostrarmovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerresultado == segundoresultado){
            
            tarjetasdestapadas = 0;
            tiempodepar();
            //Aumento aciertos
            //aciertos++;
            //mostraraciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightaudio.play();

            //MOSTRAR CUADRO DE RESPUESTA
            // crear una varibale que permita cerar el cuadro de respuesta
            const closemodal = document.querySelector('.modal_close');
            // asignar uan imagen al cuadro de respuesta
            console.log("hola" + segundoresultado);
            console.log("verdader posicion " +MostrarRespuestas[segundoresultado] )
            // mostrarmodelo.innerHTML = `<img src="./Imagenes/${MostrarRespuestas[segundoresultado]}.png" alt="">`;
            mostrarmodelo.innerHTML = `<img src="https://drive.google.com/thumbnail?sz=w&id=${ImagenesFetch1[MostrarRespuestas[segundoresultado]]}" >`;
            mostrarmodelo.disabled = true;
            //asignar titulo
            // titulo = "Ejemplo poner titulo :)";
            mostrartitulo.innerHTML = `<span style="color: black;">${titulos[MostrarRespuestas[segundoresultado]]}</span>`;
            //asignar descripcion
            // descripción = "Eejemplo descripción"
            mostrardescripcion.innerHTML = `<span style="color: black;">${descripciones[MostrarRespuestas[segundoresultado]]}</span>`;


            const modal = document.querySelector('.modal');
            modal.classList.add('modal--show');

            // Función para cerrar el modal al hacer clic en el enlace de "Cerrar"
            closemodal.addEventListener('click', function() {
                modal.classList.remove('modal--show');
            });

            let randomF = Math.floor(Math.random() * 4) + 1;
            console.log(randomF);
            let turno = document.getElementById(`turno${randomF}`);

            turno.style.display = 'block';
            turno.querySelector(`.gana${randomF}`).style.opacity = 1;
            turno.querySelector(`.gana${randomF}`).style.visibility = 'visible';

            setTimeout(() => {
                turno.querySelector(`.gana${randomF}`).style.opacity = 0;
                turno.querySelector(`.gana${randomF}`).style.visibility = 'hidden';
                turno.style.display = 'none';
            }, 1500);
            //modal.innerHTML = `<img src="./Imagenes/${segundoresultado}.png" alt="">`;
            //fin de prueba
            // Sumar puntos al equipo o jugador actual
            sumarPuntos();
            // Función para cerrar el modal al hacer clic en el enlace de "Cerrar"
            if(puntajeTotal == 15){
                closemodal.addEventListener('click', function() {
                    modal.classList.remove('modal--show');
                    window.location.href = "gana.html";
                });
            }
            else{
                closemodal.addEventListener('click', function() {
                    modal.classList.remove('modal--show');
                    // window.location.href = "ganador.html?team1";
                });
            }
            
            if(puntajeTotal == 15){
                
                juegoActivo = false;
                winaudio.play();
                console.log("Entro porque gano alguien");
                clearInterval(tiemporegresivo);
                //mostraraciertos.innerHTML = `Aciertos: ${aciertos} :)`;
                //mostrartiempo.innerHTML = `Fantastico solo demoraste ${timerinicial - timer} segundos`;
                //mostrarmovimientos.innerHTML = `Movimientos: ${movimientos} :)`;
                finalizarJuego();

                if (jugadores === 1) {
                    console.log("¡EQUIPO 1 GANA!");
                    // Supongamos que esto se ejecuta cuando determinas el ganador
                    
                } else if (jugadores === 2) {
                    if (score1 > score2) {
                         console.log("¡EQUIPO 1 GANA!");

                    } else if (score1 < score2) {
                        console.log("¡EQUIPO 2 GANA!");
                    } else {
                        console.log("¡EMPATE! ¡SIGAN ASÍ!");
                    }
                } else if (jugadores === 3) {
                    if (score1 > score2 && score1 > score3) {
                        console.log("¡EQUIPO 1 GANA!");
                    } else if (score2 > score1 && score2 > score3) {
                        console.log("¡EQUIPO 2 GANA!");
                    } else if (score3 > score1 && score3 > score2) {
                        console.log("¡EQUIPO 3 GANA!");
                    } else {
                        console.log("¡EMPATE! ¡SIGAN ASÍ!");
                    }
                } else if (jugadores === 4) {
                    if (score1 > score2 && score1 > score3 && score1 > score4) {
                        console.log("¡EQUIPO 1 GANA!");
                        
                    } else if (score2 > score1 && score2 > score3 && score2 > score4) {
                        console.log("¡EQUIPO 2 GANA!");
                        
                    } else if (score3 > score1 && score3 > score2 && score3 > score4) {
                        console.log("¡EQUIPO 3 GANA!");
                        
                    } else if (score4 > score1 && score4 > score2 && score4 > score3) {
                        console.log("¡EQUIPO 4 GANA!");
                        
                    } else {
                        console.log("¡EMPATE! ¡SIGAN ASÍ!");
                    }
                } else {
                    console.log("Error: Número desconocido de jugadores");
                }
            }
            //minuto 44:11
        }else{
            wrongaudio.play();
            
            //mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.textContent = parseInt(tarjeta1.id) + 1;
                tarjeta2.textContent = parseInt(tarjeta2.id) + 1;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasdestapadas = 0;
                mostrarmodelo.innerHTML = `<p>Error. ¡Inténtalo de nuevo!</p>`;
                const modal = document.querySelector('.modal4');
                modal.classList.add('modal--show');

                switch (jugadores) {
                    case 1:
                        if (p1Turn){
                            p1Turn = true;
                        }
                      break;
                    case 2:
                        if (p1Turn){
                            p1Turn = false;
                        }
                        else if (!p1Turn){
                            p1Turn = true;
                        }
                      break;
                    case 3:
                        if (p1Turn) {
                            p1Turn = false;
                            p2Turn = true;
                        } else if (p2Turn) {
                            p2Turn = false;
                            p3Turn = true;
                        } else if (p3Turn) {
                            p3Turn = false;
                            p1Turn = true;
                        }
                      break;
                    case 4:
                        if (p1Turn) {
                            p1Turn = false;
                            p2Turn = true;
                        } else if (p2Turn) {
                            p2Turn = false;
                            p3Turn = true;
                        } else if (p3Turn) {
                            p3Turn = false;
                            p4Turn = true;
                        } else if (p4Turn) {
                            p4Turn = false;
                            p1Turn = true;
                        }
                      break;
                    default:
                      console.log("Error: Unknown number of players");
                      break;
                }
                
                iniciarJuego();
            },800);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("click", function(e) {
        if (e.target.classList.contains("modal4") || e.target.closest(".modal-contenido")) {
            return; // Evita ocultar el modal si se hace clic dentro de su contenido
        }
        document.querySelectorAll(".modal4").forEach(function(modal) {
            modal.style.display = "none";
        });
    });

    document.querySelectorAll(".modal4").forEach(function(modal) {
        modal.addEventListener("click", function(e) {
            if (e.target.classList.contains("modal4") || e.target.closest(".modal-contenido")) {
                modal.style.display = "none";
            }
        });
    });
});

function sumarPuntos() {
    switch (jugadores) {
        case 1:
            if (p1Turn) {
                score1 += 1;
                displayScore1.textContent = score1.toString();
                console.log(displayScore1);
                puntajeTotal += 1;
            }
            break;
        case 2:
            if (p1Turn) {
                score1 += 1;
                displayScore1.textContent  = score1.toString();
                console.log(displayScore1);
                console.log("valor de",score1);
                puntajeTotal += 1;
            } else {
                score2 += 1;
                displayScore2.textContent  = score2.toString();
                console.log(displayScore2);
                console.log(score2);
                puntajeTotal += 1;
            }
            puntajeTotal.toString();
            console.log(puntajeTotal);
            break;
        case 3:
            if (p1Turn) {
                score1 += 1;
                displayScore1.textContent = score1.toString();
                puntajeTotal += 1;
            } else if (p2Turn) {
                score2 += 1;
                displayScore2.textContent = score2.toString();
                puntajeTotal += 1;
            } else if (p3Turn) {
                score3 += 1;
                displayScore3.textContent = score3.toString();
                puntajeTotal += 1;
            }
            puntajeTotal.toString();
            console.log(puntajeTotal);
            break;
        case 4:
            if (p1Turn) {
                score1 += 1;
                displayScore1.textContent = score1.toString();
                puntajeTotal += 1;
            } else if (p2Turn) {
                score2 += 1;
                displayScore2.textContent = score2.toString();
                puntajeTotal += 1;
            } else if (p3Turn) {
                score3 += 1;
                displayScore3.textContent = score3.toString();
                puntajeTotal += 1;
            } else if (p4Turn) {
                score4 += 1;
                displayScore4.textContent = score4.toString();
                puntajeTotal += 1;
            }
            puntajeTotal.toString();
            
            console.log(puntajeTotal);
            break;
        default:
            console.log("Error: Unknown number of players");
            break;
    }
}






// Función para obtener un arreglo con "cantidad" valores aleatorios de rango 0 a "tamanoArreglo" tamaño
//tamanoArreglo: tamaño de un arreglo
function obtenerValoresAleatorios(tamanoArreglo, cantidad) {
    // Creamos un arreglo con números crecientes
  const posicionesRespuesta = [];

  for (let i = 0; i < tamanoArreglo; i++) {
    posicionesRespuesta.push(i);
  }
  // Usamos el método sort para mezclar el arreglo de forma aleatoria
  const arregloMezclado = posicionesRespuesta.sort(() => Math.random() - 0.5);
  
  // Tomamos los primeros 'cantidad' elementos del arreglo mezclado
  return arregloMezclado.slice(0, cantidad);
}

// Función para cargar los datos de manera síncronaa
function cargarDatos() {
    // Crear una nueva instancia de XMLHttpRequest
    const xhr = new XMLHttpRequest();
  
    // Abrir una conexión síncrona
    xhr.open('GET', './Texto/Respuestas.txt', false);
    xhr.send();
  
    // Verificar si la solicitud fue exitosa (status 200)
    if (xhr.status === 200) {
      const contenidoTxt = xhr.responseText;
  
      // Dividir el contenido del archivo por líneas y almacenarlo en el arreglo
      const lineas = contenidoTxt.split('\n');
      lineas.forEach(linea => {
      // Verificar si la línea no está vacía
      if (linea.trim() !== '') {
          const [titulo, descripcion] = linea.split(':');
          titulos.push(titulo.trim());
          descripciones.push(descripcion.trim());
      }
      });
  
  
      // console.log(titulos);
      // console.log(descripciones);
    } else {
      console.error('Error al cargar los datos. Código de estado:', xhr.status);
    }
  }

  function recargarPagina() {
    location.reload();
}


function cargarDatosFetch() {
    let url = 'https://docs.google.com/spreadsheets/d/1qmCUikHtGJq3y7QyJUOytKPYqffK2PEy8B-fX-2lY-k/gviz/tq?';

    return fetch(url)
        .then(res => res.text())
        .then(rep => {
            const data = JSON.parse(rep.substr(47).slice(0, -2));
            let dataVectorA = [];
            let dataVectorB = [];
            let dataVectorC = [];

            data.table.rows.forEach((main) => {
                main.c.forEach((ele, index) => {
                    if (index === 1) {
                        dataVectorA.push(ele.v);
                    } else if (index === 2) {
                        dataVectorB.push(ele.v);
                    } else if (index === 3) {
                        dataVectorC.push(ele.v);
                    }
                });
            });

            // Guardar los datos en el localStorage
            localStorage.setItem('dataVectorA', JSON.stringify(dataVectorA));
            localStorage.setItem('dataVectorB', JSON.stringify(dataVectorB));
            localStorage.setItem('dataVectorC', JSON.stringify(dataVectorC));

            // Asignar los datos a las variables globales
            window.dataVectorA = dataVectorA;
            window.dataVectorB = dataVectorB;
            window.dataVectorC = dataVectorC;
            console.log("OLAP")
            console.log(dataVectorA);

            return { dataVectorA, dataVectorB, dataVectorC };
        });
}
