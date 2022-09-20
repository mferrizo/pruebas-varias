document.addEventListener('DOMContentLoaded', () => {

// Constante de cada carta del juego (Cada imagen que esta en la matriz del juego)
const imagenArray = [
    {
        nombre: 'minion-bob-corazon',
        img: 'images/minion-bob-corazon.jpg'
    },
    {
        nombre: 'minion-bob-corazon',
        img: 'images/minion-bob-corazon.jpg'
    },
    {
        nombre: 'minion-bob-peluche',
        img: 'images/2.jpg'
    },
    {   nombre: 'minion-bob-peluche',
        img: 'images/2.jpg'
    },
    {
        nombre: 'minion-bob-rey',
        img: 'images/3.jpg'
    },
    {
        nombre: 'minion-bob-rey',
        img: 'images/3.jpg'
    },
    {
        nombre: 'minion-stuart-saltando',
        img: 'images/4.jpg'
    },
    {
        nombre: 'minion-stuart-saltando',
        img: 'images/4.jpg'
    },
    {
        nombre: 'minion-kevin-abrigado',
        img: 'images/5.jpg'
    },
    {
        nombre: 'minion-kevin-abrigado',
        img: 'images/5.jpg'
    },
    {
        nombre: 'minion-kevin-banana',
        img: 'images/6.jpg'
    },    
    {
        nombre: 'minion-kevin-banana',
        img: 'images/6.jpg'
    }
]


//ARRAY DE LAS IMAGENES ORDENADO CON SORT Y CON MATH EN RANDOM PARA EL ALETORIO
imagenArray.sort(() => 0.5 - Math.random())

//TABLERO DE JUEGO CON QUERY SELECTOR
const tablero = document.querySelector('#tableroJuego')

//RESULTADO ARRIBA DEL TABLERO CON QUERY SELECTOR
const resuladoDisplay = document.querySelector('#result')

// DECLARACION DE VARIABLES
let imagenElegida = []
let imagenID = []
let ImagenGanadora = []

//TABLERO DEL JUEGO CON LA IMAGEN BASE ANTES DE SELECCIOANRLA
function crearTablero() {
    for (let i = 0; i < imagenArray.length; i++) { //Agrega una a la lista del Array
    const imagenM = document.createElement('img') //Constante de imagen base
    imagenM.setAttribute('src', 'images/frente.jpg') // Variable de asignacion de imagen
    imagenM.setAttribute('ID', i) // Variable del ID 

    //Al hacer click llama a la funcion que da vuelta la imagen y la compara
    imagenM.addEventListener('click', cartaDadaVuelta)
    
    //Reemplaza la imagen del tablero 
    tablero.appendChild(imagenM)
    }
}


//CONTADOR DE CLIC HASTA GANAR!
    let pElement = document.getElementById("areaContador");
    let contador = 0;
        tablero.onclick = function () {
        contador++;
        pElement.textContent = `Clicks que genero ${contador}`
        }

let resultadoGeneral = document.getElementById("resultadoGeneral")

//REVISA EL RESULTADO DE LA ELECCION CON CON QUERY SELECTOR (VALIDA QUE LAS IMAGENES SEAN LAS MISMAS)
function controlEleccion() {
    const imagenesM = document.querySelectorAll('img')
    const opcionUnoId = imagenID[0]
    const opcionDosId = imagenID[1]

    if(opcionUnoId == opcionDosId) {
    imagenesM[opcionUnoId].setAttribute('src', 'images/frente.jpg')
    imagenesM[opcionDosId].setAttribute('src', 'images/frente.jpg')
    resultadoGeneral.innerText = `Diste Click sobre la misma imagen`
}
    else if (imagenElegida[0] === imagenElegida[1]) {
    resultadoGeneral.innerText = 'Encontraste dos imagenes iguales!'
    imagenesM[opcionUnoId].setAttribute('src', 'images/blanco.jpg')
    imagenesM[opcionDosId].setAttribute('src', 'images/blanco.jpg')
    imagenesM[opcionUnoId].removeEventListener('click', cartaDadaVuelta)
    imagenesM[opcionDosId].removeEventListener('click', cartaDadaVuelta)
    ImagenGanadora.push(imagenElegida)
    // resuladoDisplay.innerHTML = `<img src="./images/${ImagenGanadora.op}.jpg"> `
} else {
    resultadoGeneral.innerText = 'Vuelve a Intentarlo!'

    imagenesM[opcionUnoId].setAttribute('src', 'images/frente.jpg')
    imagenesM[opcionDosId].setAttribute('src', 'images/frente.jpg')
}
    imagenElegida = []
    imagenID = []
    resuladoDisplay.textContent = ImagenGanadora.length
    if  (ImagenGanadora.length === imagenArray.length/2) {
        let resultadoFinal = document.getElementById("resultadoFinal")
        resultadoFinal.innerHTML = `${resuladoDisplay.textContent}`
}
}


let mensajeUsuario = document.getElementById("mensajeUsuario")
//CUANDO DA VUELTA LA CARTA
function cartaDadaVuelta() {
    let imagenMid = this.getAttribute('ID')
    imagenElegida.push(imagenArray[imagenMid].nombre)
    imagenID.push(imagenMid)
    this.setAttribute('src', imagenArray[imagenMid].img)
if (imagenElegida.length ===2) {
    setTimeout(controlEleccion, 400)
}


}

let ingreso = document.getElementById("ingreso")
let valores = document.getElementById("texto").value;
let btnPedido = document.getElementById("btnPedido")
btnPedido.addEventListener("click", respuestaClick)

function respuestaClick(){
    crearTablero()
    mensajeUsuario.innerText = `Bienvenido ${valores}, disfruta del juego!`
    borrado()
    localStorage.setItem("prueba3", JSON.stringify(valores))
}

function borrado (){
    ingreso.remove()
}

// let btnResultado = document.getElementById("btnResultado")
// btnResultado.addEventListener("click",(localStorage.setItem("prueba4", JSON.stringify(respuestaClick()))) )




})
