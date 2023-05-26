const navToggle = document.getElementById('nav-toggle');
const shopp = document.getElementById('shopp');
const shoppContent = document.getElementById('shopp-content');
const shoppClose = document.getElementById('shopp-close');
const añadirCarrito = document.getElementById('products');
const unidades = document.querySelector('.nav__amount')
console.log(unidades.textContent);

let listaCarrito = [];
let unidadesCarrito = 0;
let cantidadEliminado = 0;

if(navToggle){
    navToggle.addEventListener('click', () =>{
        shopp.classList.add('show-shopp');
        // console.log('hola');
    })
}
if(shoppClose){
    shoppClose.addEventListener('click', () =>{
        shopp.classList.remove('show-shopp')
        // console.log('hola');
    })

}

const cargarEventos =()=>{
    //Cuando hagamos click en agregar a carrito
    añadirCarrito.addEventListener('click',Selection);
    //SUMAMOS LA CANTIDAD DE ARTICULOS QUE HAY ENE L CARRITO
    añadirCarrito.addEventListener('click',()=>{
        limpiarUnidades()
        if('click'){
            unidadesCarrito++
        }
        unidades.append(unidadesCarrito);
    });
    //Cuando hagamos click en eliminar el articulo
    shopp.addEventListener('click', eliminarArticulo);
}

//FUCIONES
/*Seleccionamos el ariticulo y lo cuardamos */
const Selection =(e)=>{//PASO 1 
    if(e.target.classList.contains('card__buttom')){
        const articuloSeleted = e.target.parentElement.parentElement;
        // console.log(articuloSeleccionado);
        leerDatosArticulo(articuloSeleted);
    }
}
/*extraemos los datos para luego mandarlo al carrito */
const leerDatosArticulo =(articuloSeleted)=>{//PASO 2 y 3
    // console.log(articuloSeleted);

    const infoArticulo = {
        image: articuloSeleted.querySelector('img').src,
        description:articuloSeleted.querySelector('h2').textContent,
        price: articuloSeleted.querySelector('p').textContent,
        id:  articuloSeleted.querySelector('.card__buttom').getAttribute('data-id'),
        amount: 1,
    }
    // console.log(infoArticulo);
    /*PASO 5 comprobamos si se repite el articulo y solo imrpimimos uno con la cantidad +1 */

    const existe = listaCarrito.some(arituculo => arituculo.id === infoArticulo.id);

    if(existe){
        const ariticulos = listaCarrito.map(articulo =>{
            if(articulo.id === infoArticulo.id){
                articulo.amount++;
                return articulo;
                
            }else{ 
                return articulo;
            }
        })

        listaCarrito=[...ariticulos];
    }else{
        listaCarrito=[...listaCarrito, infoArticulo];
    }
    // listaCarrito=[...listaCarrito, infoArticulo]; //PASO 3 antes del paso 5
    
    // console.log(existe);
    // console.log(listaCarrito);
 
    insetarACarrito();
}

//INSETAMOS LOS ARTICULOS SELECCIONADOS AL CARRITO
const insetarACarrito =()=>{//PASO 4
    limpiarCarrito();//PASO 7
    const fragment = document.createDocumentFragment();
    listaCarrito.forEach(arituculo =>{
        const{image, description, price, id, amount} = arituculo;
        const row = document.createElement('article');
        row.classList.add('shopp-card');

        row.innerHTML =`<img src="${image}" class="shoop-card__img">
            <div class="shopp-card__info">
                <p class="shopp-card__title">${description}</p>
                <p class="shopp-card__mount">${amount}</p>
                <p class="shopp-card__prince">${price}</p>
                <button class="shopp-card__delete" data-amount="${amount}" data-id="${id}">X</button>
            </div>`
        fragment.append(row);
    })
    shoppContent.append(fragment);
    // unidades.append(unidadesCarrito+=amount);
}

const limpiarCarrito =()=>{//PASO 6
    while(shoppContent.firstElementChild){
        shoppContent.removeChild(shoppContent.firstElementChild);
    }
}
//Eliminar articulo del carrito
const eliminarArticulo =(e)=>{
    //cojemos la cantidad que hay en cada articulo para luego restarlo

    if(e.target.classList.contains('shopp-card__delete')){
        const artiuculoID = e.target.getAttribute('data-id');
        listaCarrito = listaCarrito.filter(arituculo => arituculo.id !== artiuculoID);
        console.log(cantidadEliminado);
        
    }
    //Cuando eliminamos un articulo restamos al total que tenemos el carrito
    if(e.target.classList.contains('shopp-card__delete')){
        limpiarUnidades()
        cantidadEliminado= e.target.getAttribute('data-amount');
        unidadesCarrito = unidadesCarrito - cantidadEliminado;
        unidades.append(unidadesCarrito);
    }
    insetarACarrito();



}

const limpiarUnidades =()=>{
    while(unidades.firstChild){
        unidades.removeChild(unidades.firstChild);
    }
}
cargarEventos();