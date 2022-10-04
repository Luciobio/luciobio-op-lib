import { getItems, getData }  from './api.js';

let items = [];

/* getItems()
.then(response =>{
    items = response
    showItems(items);
    addBtnEvents();
})
.catch(error => {
    alert(error.message);
}); */

/* const setItems = async () => {
    try {
        items = await getItems();
        showItems(items);
        addBtnEvents();
    } catch (error) {
        alert('Error: ' + error)
    }
}
setItems(); */

const iva = 0.2

let cart = [];

const cardContainer = document.getElementById('cardContainer');

const cartContainer = document.getElementById('cartContainer');

const showItems = (array) => {
    array.forEach(e => {
        // DESTRUCTURING
        const {
            name,
            image,
            species: price,
            status: stock,
            id
        } = e;
        
        let card = document.createElement('div');
        card.setAttribute('class', 'Item');
        card.innerHTML = `
            <image  alt=${name} src='${image}'/>
            <h4>${name}</h4>
            <h3>$ ${price}</h3>
            ${/* OPERADOR TERNARIO Y OPERADOR OR || */''}
            <h3 class=${stock != 0 ? 'green' : 'red'}> Stock:${stock || 'Out of Stock'}</h3> 
            <button class='addbtn' id='${id}'><a class='whiteLink'>ADD TO CART</a></button>
        `;
        cardContainer.appendChild(card);

    });
}

// EVENTS
const addBtnEvents = () => {
    const buttons = document.getElementsByClassName('addbtn');
    
    for (let btn of buttons) {
        btn.addEventListener("click", () => addToCart(btn.id));
    };
}

items = await getData();
showItems(items);
addBtnEvents();

const showCartBtn = document.getElementById('showCart');
showCartBtn.addEventListener('click', () => showCart());

const checkOut = document.getElementById('checkOut');
checkOut.addEventListener('click', () => checkOutfn());

// FUNCTIONS
const addToCart = id => {
    const cartItem = items.find(i => i.id == id);
    //SPREAD OPERATOR -> Aqui lo utilizo para agregar y modificar propiedades del objeto.
    const item4cart = { ...cartItem, stock: cartItem.stock - 1, quantity: 1 }
    cart.push(item4cart);
    console.log(cart);

    // TOASTIFY
    Toastify({
        text: `${item4cart.name} agregado con éxito`,
        duration: 3000,
        destination: "http://127.0.0.1:5500/luciobio-op-lib/index.html",
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
};

// COMO ESTABA ANTES

/* const showCart = () => {
    if (cart.length === 0) {
        cartContainer.innerHTML = ``;
        let sign = document.createElement('h2');
        sign.innerHTML = `No items in the Cart`;
        cartContainer.appendChild(sign);
    } else {
        cartContainer.innerHTML = ``;
        cart.forEach(e => {
            let cartItem = document.createElement('div');
            cartItem.innerHTML = `
            <h4>${e.name}</h4>
            <h3>$ ${e.price}</h3>
            `;
            cartContainer.appendChild(cartItem);
        })
    }
} */

// FORZANDO EL OPERADOR TERNARIO
/* 
Un operador ternario es una expresión que devuelve un valor que puede ser almacenado 
en una variable.
Intentar utilizarlo en una serie de sentencias que se ejecutan condicionalmente 
como la del ejemplo de arriba no tendría sentido porque para eso existen los 
condicionales if/ else.

El operador ternario se usa para optimizar líneas de código que podrían estar 
en una sola, si están en varias líneas de código, a lo sumo en un par, se puede 
seguir la estructura:
condicion ? linea1 : ( linea2 , linea3 );
Separando las sentencias por coma.

Por eso para poder aplicarlo en este ejemplo tuve que complejizar el código en 
lugar de hacerlo más simple.
*/

const emptyCart = () => {
    cartContainer.innerHTML = ``;
    let sign = document.createElement('h2');
    sign.innerHTML = `No items in the Cart`;
    cartContainer.appendChild(sign);
};

const itemsInCart = () => {
    cartContainer.innerHTML = ``;
        cart.forEach(e => {
            const {name, price} = e
            let cartItem = document.createElement('div');
            cartItem.innerHTML = `
            <h4>${name}</h4>
            <h3>$ ${price}</h3>
            `;
            cartContainer.appendChild(cartItem);
        })
};

// OPERADOR CONDICIONAL (TERNARIO)
const showCart = () => cart.length === 0? emptyCart() : itemsInCart();

const checkOutfn = () => {
    //SWEET ALERT
    Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Su orden ha sido generada con éxito',
        footer: '<a href="/luciobio-op-lib/">Continuar comprando</a>'
      });
    
      cart = [];
      showCart();
};

/*
El acceso condicional a objetos o encadenamiento opcional se utiliza cuando se quiere acceder a 
una de un objeto y no se está segure si existe o no. Sobre todo cuando son objetos con alto grado
de anidación (Objetos dentro de objetos dentro de objetos...)
Utilizando objeto?.propiedad se evita un error por consola, ya que si el objeto no cuenta con esa
propiedad automaticamente devuelve undefined.
Video sobre el tema: https://www.youtube.com/watch?v=sNlY4B6VgZE
*/