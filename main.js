class Item {
    constructor(id, name, price, description, category, stock, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.stock = stock;
        this.img = img;
    }
}

// FUNCTIONS
const LoadItems = (catalog) => {
    catalog.forEach(e => {
        const {
            name,
            description,
            img,
            stock,
            price,
            id
        } = e;

        let card = document.createElement('div');
        card.setAttribute('class', 'Item');
        card.innerHTML = `
            <img  alt=${name} src='${img}'/>
            <h4>${name}</h4>
            <p>${description}</p>
            <h3>$${price}</h3>
            <h3 class=${stock != 0 ? 'green' : 'red'}> Stock:${stock || 'Out of Stock'} </h3> 
            <button class='addbtn' id='${id}'><a class='whiteLink'>ADD TO CART</a></button>
        `;
        cardContainer.appendChild(card);
    });

}

const addToCart = (id) => {
    cart = JSON.parse(localStorage.getItem('cart'));
    const cartItem = catalog.find(i => i.id == id);
    if (cartItem.stock > 0) {
        const item4cart = { ...cartItem, stock: cartItem.stock - 1, quantity: 1 }
        cart.push(item4cart);

        localStorage.setItem('cart', JSON.stringify(cart));

        // Aquí uso Toastify
        Toastify({
            text: `${item4cart.name} agregado con éxito 🌿`,
            duration: 3000,
            newWindow: false,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    } else {

        //Sweet Alert
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: 'No hay stock del producto seleccionado',
            showConfirmButton: false,
            timer: 3000
        })
    }
};

const emptyCart = () => {
    cartContainer.innerHTML = ``;
    let sign = document.createElement('h2');
    sign.innerHTML = `No items in the Cart`;
    cartContainer.appendChild(sign);
};

const itemsInCart = () => {
    cartContainer.innerHTML = ``;
    cart.forEach(e => {
        const { name, price } = e
        let cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <h4>${name}</h4>
            <h3>$${price}</h3>
            `;
        cartContainer.appendChild(cartItem);
    })
};

const showCart = () => cart.length == 0 ? emptyCart() : itemsInCart();

const order = () => {
    let message = '';
    for (let i = 0; i < cart.length; i++) {
        message += `<h4>${i + 1} - ${cart[i].name} - $${cart[i].price}</h4>`
    }
    return message
};

const total = () => cart.reduce((acc, val) => acc + val.price, 0);

const checkOutFunction = () => {
    if (cart.length) {
        //SWEET ALERT
        Swal.fire({
            icon: 'success',
            title: 'Exito',
            // Utilizo HTML para introducir saltos de linea
            html: `Su orden:${order()}Ha sido generada con éxito</br>
            Fecha: ${DateTime.now().setLocale('es').toLocaleString()}`, // LUXON .setLocale('es') formatea la fecha como se utiliza en Argentina dd/mm/aa
            footer: `Precio total de su orden: $${total()}`
        })

        localStorage.setItem('cart', JSON.stringify([]));
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    } else {
        // Alerta tipo TOAST creada con SWEET ALERT (NO SE CONFUNDAN)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        }).fire({
            icon: 'error',
            title: 'No hay items en el carrito'
        })
    }
};


// EJECUCION DEL CODIGO

// Luxon
const DateTime = luxon.DateTime

// Genero mis productos y los pusheo a un array
const items = [];

items.push(new Item(1, "Cogonauts Flidas", 3500, "Grindr", "Accesories", 5, './img/cogonauts-flidas-grindr.webp'));
items.push(new Item(2, "Substrate Eden", 2500, "Substrate - 25L", "Growing", 0, './img/eden-substrate.jpg'));
items.push(new Item(3, "Sodium Lamp", 3755, "Lamp - 400w", "Lighting", 10, './img/sodium-lamp-400w.jpg'));

// Los Envío al Storage (En caso de que no se haya cargado aún)
localStorage.getItem('catalog') ? console.log('El cátalogo ya está cargado') : localStorage.setItem('catalog', JSON.stringify(items));

// Determino donde se van a mostrar mi catálogo y carrito
const cardContainer = document.getElementById('cardContainer');
const cartContainer = document.getElementById('cartContainer');

//Traigo mi catálogo de items del Storage y cargo mis productos en la página
const catalog = JSON.parse(localStorage.getItem('catalog'));
LoadItems(catalog);

//Genero un array para el carrito y envío al Storage (En caso de que no haya items en el carrito aún)
let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : localStorage.setItem('cart', JSON.stringify([]));

// EVENTS

//Agrego eventos a los botones "ADD TOO CART"
const buttons = document.getElementsByClassName('addbtn');
for (let btn of buttons) {
    btn.addEventListener('click', () => addToCart(btn.id));
};

//Agrego eventos al boton "SHOW CART"
const showCartBtn = document.getElementById('showCart');
showCartBtn.addEventListener('click', () => showCart());

//Agrego eventos al boton "CHECKOUT"
const checkOut = document.getElementById('checkOut');
checkOut.addEventListener('click', () => checkOutFunction());