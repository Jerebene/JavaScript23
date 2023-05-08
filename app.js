class Skin {
    constructor(id, nombre, precio, img, float, estado, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.float = float;
        this.estado = estado;
        this.categoria = categoria;
    }
}

class SkinController {
    constructor (){
        this.listaSkins = []
        this.cardContainer = document.getElementById("cardContainer")
    }

    levantarSkins(){
        this.listaSkins = [
            new Skin(1, "AK47 | Legion de anubis", 2000, "./Assets/img/ak47.png", 0.0053, " (Factory New)", "Pistolas"),
            new Skin(2, "M4A4 | Emperador", 2100, "./Assets/img/ak47.png", 0.1657, " (Field Tested)", "Rifles"),
            new Skin(3, "USP | Muerte confirmada", 2200, "./Assets/img/ak47.png", 1.9463, " (Factory New)", "Rifles"),
            new Skin(4, "AK47 | LEGION DE ANUBIS", 2000, "./Assets/img/ak47.png", 0.0053, " (Minimal Wear)", "Pistolas"),
            new Skin(5, "M4A4 | EMPERADOR", 2100, "./Assets/img/ak47.png", 0.1657, " (Well Worn)", "SubFusiles"),
            new Skin(6, "USP | MUERTE CONFIRMADA", 2200, "./Assets/img/ak47.png", 1.9463, " (Battle Scarred)", "Pistolas"),
        ]

        /*async function solicitarDatosYRenderizar(){
            const response = await fetch ('./BD.json')
            const listaSkins = await response.json()
            const cardContainer = document.getElementById("cardContainer")
        
            listaSkins.forEach(Skin => {
                cardContainer.innerHTML += `
                <div class="skinCard card-body ${Skin.categoria}" style="max-width: 10rem; max-height: 21.2rem">
                        <img src="${Skin.img}" class="card-img-top" alt="">
                        <div class=" d-flex flex-column">
                            <h5 class="cardName">${Skin.nombre}${Skin.estado}</h5>
                            <p class="cardFloat">Float ${Skin.float}</p>
                            <p class="cardPrice">$${Skin.precio}</p>
                            <a href="#" id="skin-${Skin.id}" class="cardButton btn btn-outline-success w-60 m-auto mb-2 ";">Comprar</a>
                        </div>
                     </div>
                `
            })
            
            console.log(listaSkins)
        }
        
        solicitarDatosYRenderizar() */
    }

    mostrarEnDom (){
        this.listaSkins.forEach(Skin => {
            this.cardContainer.innerHTML += `
            <div class="skinCard hide card-body ${Skin.categoria}" style="max-width: 10rem; max-height: 21.2rem">
                    <img src="${Skin.img}" class="card-img-top" alt="">
                    <div class=" d-flex flex-column">
                        <h5 class="cardName">${Skin.nombre}${Skin.estado}</h5>
                        <p class="cardFloat">Float ${Skin.float}</p>
                        <p class="cardPrice">$${Skin.precio}</p>
                        <a href="#" id="skin-${Skin.id}" class="cardButton btn btn-outline-success w-60 m-auto mb-2 ";">Comprar</a>
                    </div>
                 </div>
            `
        })
    }

    eventoEnComprarSkin(controladorCarrito){
        this.listaSkins.forEach(Skin => {
            const buttonCart = document.getElementById(`skin-${Skin.id}`)
            buttonCart.addEventListener("click", () => {

                controladorCarrito.agregar(Skin)
                controladorCarrito.guardarEnStorage()
                controladorCarrito.mostrarEnDom(cartContainer)

                Toastify({
                    text:`Añadiste ${Skin.nombre}`,
                    duration: 2000,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    }).showToast();
               
            })
        })
    }
}

class CarritoController {
    constructor (){
        this.cartList = []
        this.cartContainer = document.getElementById("cartContainer")
    }
    agregar(Skin){
        this.cartList.push(Skin)
    }

    limpiarEnStorage(){
        localStorage.removeItem("cartList")
    }

    guardarEnStorage(){
        let cartListJSON = JSON.stringify(this.cartList)
         localStorage.setItem("cartList", cartListJSON)
    }

    levantarDeStorage(cartContainer){
        this.cartList = JSON.parse(localStorage.getItem("cartList")) || []
        this.cartList.length > 0 && this.mostrarEnDom(cartContainer) 
    }

    limpiarContenedorCarrito(){
        this.cartContainer.innerHTML = ""
    }

    mostrarAlertCompra(){
        this.cartList.length > 0 ? 
        Swal.fire({
            icon: 'success',
            title: 'Gracias por tu compra!',
            showConfirmButton: false,
            timer: 2000,}) : 
        Swal.fire({
            icon: 'error',
            title: 'No ingreso ninguna skin!',
            showConfirmButton: false,
            timer: 2000,})
    }

    mostrarEnDom(){
        this.limpiarContenedorCarrito()
        this.cartList.forEach(Skin => {
            this.cartContainer.innerHTML += `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${Skin.img}" class="img-fluid rounded-start" alt="skin">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${Skin.nombre}${Skin.estado}</h5>
                        <p class="card-text">Precio $${Skin.precio}</p>
                        <p class="card-text">Float ${Skin.float}</p>
                    </div>
                </div>
            </div>
        </div>`
       })
    }
}

const controladorSkins = new SkinController()
controladorSkins.levantarSkins()

const controladorCarrito = new CarritoController()
controladorCarrito.levantarDeStorage()

// Lista de skins en tienda
controladorSkins.mostrarEnDom()

// Damos eventos
controladorSkins.eventoEnComprarSkin(controladorCarrito)

const confirmarCompra = document.getElementById("confirmarCompra")
confirmarCompra.addEventListener("click", () => {


    // mostrar alerta cuando finalizamos la compra
    controladorCarrito.mostrarAlertCompra()
    // borrar datos del dom
    controladorCarrito.limpiarContenedorCarrito()
    // borrar datos del storage
    controladorCarrito.limpiarEnStorage()
    // borrar datos de listacarrito
    controladorCarrito.cartList = []
    
    
    
})



// filtrado de categorias 
function filterSkins(value) {
    let buttons = document.querySelectorAll(".categoryButton")

    buttons.forEach((button) => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active")
        } else {
            button.classList.remove("active")
        }
    })

    let elementos = document.querySelectorAll(".card-body")

    elementos.forEach((elemento) => {
        console.log(elemento)
        if (value == "Todo") {
            elemento.classList.remove("hide")
        } else {
            if (elemento.classList.contains(value)) {
                elemento.classList.remove("hide")
            } else {
                elemento.classList.add("hide")
            }

        }
    })

}



// buscador de articulos
const tocarBotonBuscar = document.getElementById("search")

tocarBotonBuscar.addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value
    const nombreSkins = document.querySelectorAll(".cardName")
    const skinCard = document.querySelectorAll(".skinCard")

    nombreSkins.forEach((nombreSkin, index) => {
        if ((nombreSkin.innerText.toUpperCase()).includes(searchInput.toUpperCase())) {
            skinCard[index].classList.remove("hide")
            
        } else {
            skinCard[index].classList.add("hide")
        }
    })
})


// iniciar la pagina en categoria "todos"
window.onload = () => {
    filterSkins("Todo")
}
