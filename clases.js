//CLASE 10 STORAGE:

//Primeros datos en localStorage
// let ingresoComi = prompt("Ingrese el num de su comi")
let ingresoComi
localStorage.setItem("Comisión Coder", ingresoComi)
localStorage.setItem("rol", "Profesor")
localStorage.setItem("nombre", "Gonza")
localStorage.setItem("edad", 29)

let nombre = localStorage.getItem("nombre")
console.log(nombre)

let rolEnCoder = localStorage.getItem("rol")
console.log(rolEnCoder)

const numeros = [1,2,3,4,5]
localStorage.setItem("miArray", numeros)

let nums = localStorage.getItem("miArray")
console.log(nums)
localStorage.removeItem("edad")

//Dark Mode
let btnDarkMode = document.getElementById("botonDarkMode")
let btnLightMode = document.getElementById("botonLightMode")
let modoOscuro
//Condicional que evalua si EXISTE ALGO O NO EN EL STORAGE
if(localStorage.getItem("darkMode")){
    modoOscuro = localStorage.getItem("darkMode")
}else{
    console.log("Entro por primera vez")
    localStorage.setItem("darkMode", false)
}
console.log(modoOscuro)
//Condicional que evalua variable
if(modoOscuro == "true"){
    // document.body.style.backgroundColor = "black"
    // document.body.style.color = "antiquewhite"

    //OTRA MANERA DE HACERLO con clases CSS
    document.body.classList.add("darkMode")
}else{
    // document.body.style.backgroundColor = "antiquewhite"
    // document.body.style.color = "black"

    //OTRA MANERA DE HACERLO con clases CSS
    document.body.classList.remove("darkMode")
}
//Eventos btnDarkMode
btnDarkMode.addEventListener("click", ()=>{
    console.log("Funciona boton oscuro")
    // document.body.style.backgroundColor = "black"
    // document.body.style.color = "antiquewhite"
    document.body.classList.add("darkMode")
    localStorage.setItem("darkMode", true)
})
btnLightMode.addEventListener("click", ()=>{
    console.log("Funciona boton claro")
    // document.body.style.backgroundColor = "antiquewhite"
    // document.body.style.color = "black"
    document.body.classList.remove("darkMode")
    localStorage.setItem("darkMode", false)
})
//RemoveItem
let btnEliminarMode = document.getElementById("eliminarMode")
btnEliminarMode.addEventListener("click", ()=>{
    localStorage.removeItem("darkMode")
    
})
//Clase constuctora 
class Libro {
    constructor(id, autor, titulo, precio, imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.autor = autor,
        this.titulo = titulo,
        this.precio = precio,
        this.imagen = imagen

    }
    //métodos
    mostrarData(){
        console.log(`El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`)
    }
}
//Instanciación de objetos -- respetamos orden y cantidad de atributos

const libro1 = new Libro(1,"Jorge Luis Borges","Aleph", 900, "AlephBorges.jpg")

const libro2 = new Libro(2,"Gabriel García Marquez","Cien años de Soledad", 4500, "CienSoledadMarquez.jpg")

const libro3 = new Libro(3,"Isabel Allende", "Paula", 2800, "PaulaAllende.jpg")

const libro4 = new Libro(4,"Jorge Luis Borges","Ficciones", 1400, "FiccionesBorges.jpg")

const libro5 = new Libro(5,"Mario Benedetti", "Andamios", 2200, "AndamiosBenedetti.jpg")

const libro6 = new Libro(6,"Mario Vargas Llosa", "La ciudad y los perros", 2000, "CiudadPerrosVargasLlosa.jpg")


let productosEnCarrito = []
let estanteria = []
//Guardar estanteria en el Storage
//Revisa si existe en el local y lo trae 
if(localStorage.getItem("estanteria")){
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
}
else{
    console.log("Seteando por primera vez el array")

estanteria.push(libro1, libro2, libro3, libro4, libro5, libro6)
localStorage.setItem("estanteria", JSON.stringify(estanteria) )
}
console.log(estanteria)
let divProductos = document.getElementById("productos")
function mostrarCatalogo(array){
    
    divProductos.innerHTML = ""
    array.forEach((libro)=>{
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<div id="${libro.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top" style="height: 250px;" src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
                                    <div class="card-body">
                                        <h4 class="card-title">${libro.titulo}</h4>
                                        <p>Autor: ${libro.autor}</p>
                                        <p class="">Precio: ${libro.precio}</p>
                                        <button id="agregarBtn${libro.id}" class="btn btn-outline-success btnComprar">Agregar al carrito</button>
                                    </div>
        </div>`
        divProductos.append(nuevoProducto)

        let btnAgregar = document.getElementById(`agregarBtn${libro.id}`)
        console.log(btnAgregar)
        btnAgregar.addEventListener("click", ()=>{
            console.log(libro)
            agregarAlCarrito(libro)

        })
    })


    // let btnCompra = document.getElementsByClassName("btnComprar")
    // for(let compra of btnCompra){
    // compra.addEventListener("click", ()=>{
    //     alert("El producto ha sido comprado")
    // })
    // }

}

function agregarAlCarrito(libro){
    productosEnCarrito.push(libro)
    console.log(productosEnCarrito)
}



function ocultarCatalogo(){
    divProductos.innerHTML = ""
}
// //function agregar Libro
function nuevoLibro(array){
    let autorIngresado = prompt("Ingrese el autor")
    let tituloIngresado = prompt("Ingrese el titulo")
    let precioIngresado = parseInt(prompt("Ingrese el precio"))
    let libroCreado = new Libro (estanteria.length+1, autorIngresado, tituloIngresado, precioIngresado)
    array.push(libroCreado)
    
}

//function nuevoLibro actualiza a inputs!
function guardarLibro(array){
    let autorInput = document.getElementById("autorInput")
    let tituloInput = document.getElementById("tituloInput")
    let precioInput = document.getElementById("precioInput")
    let libroCreado = new Libro (array.length+1, autorInput.value, tituloInput.value, parseInt(precioInput.value), "libroNuevo.jpg")
    console.log(libroCreado)
    array.push(libroCreado)
    //Actualizamos Storage
    localStorage.setItem("estanteria", JSON.stringify(array))
    console.log(array)
    //Provisorio resetear form
    precioInput.value = ""
    tituloInput.value = ""
    autorInput.value = ""
    mostrarCatalogo(array)
}
//btnGuardar adjuntamos evento
let btnGuardar = document.getElementById("guardarLibroBtn")
btnGuardar.addEventListener("click", ()=>{
    guardarLibro(estanteria)
})
//BtnMostrarCatalogo adjuntamos evento
let btnMostrarCatalogo = document.getElementById("verCatalogo")
btnMostrarCatalogo.addEventListener("click", ()=>{
    mostrarCatalogo(estanteria)
})


//btn ocultar adjuntamos evento
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
btnOcultarCatalogo.onclick = ocultarCatalogo


//Clase STORAGE

let libro1JSON = JSON.stringify(libro1)

localStorage.setItem("objetoLibro", libro1)
localStorage.setItem("objetoLibroJSON", libro1JSON )

let libroStorage = localStorage.getItem("objetoLibro")
console.log(libroStorage)

let libroStorageJSON = JSON.parse(localStorage.getItem("objetoLibroJSON"))
console.log(libroStorageJSON)

//DOM CARRITO
let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
function cargarProductosCarrito(array){

    modalBody.innerHTML = ""
    array.forEach((productoCarrito)=>{

        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.titulo}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar"><i class="fas fa-trash-alt"></i></button>
            </div>    
        
        
        </div>
`

    })
    //calcular el total
    compraTotal(array)
}

function compraTotal(array){
    let acumulador = 0

    acumulador = array.reduce((acumulador, productoCarrito)=>{
        return acumulador + productoCarrito.precio
    },0)
    // console.log(`EL total hasta ahora es: ${acumulador}`)
    if(acumulador == 0){
        parrafoCompra.innerHTML = `<strong>No hay productos en el carrito</strong>`
    }
    else{
        parrafoCompra.innerHTML = `El total de su carrito es ${acumulador}`
    }
}