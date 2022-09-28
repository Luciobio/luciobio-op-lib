const items = [
    {
        id: 1,
        name: "Cogonauts Flidas - Grindr",
        price: 3500,
        description: "FLIDAS está determinado a derrumbar el sistema desde adentro. Fanátrico de la tecnología y las teorías conspirativas, Flidas mantiene una apariencia adorable e inocente; nadie sabe que dentro de su tachito esconde una base equipada y lista para hackear a quien se cruce en su camino.",
        category: "Accesories",
        stock: 5,
        img: './img/cogonauts-flidas-grindr.webp'
    },
    {
        id: 2,
        name: "Substrate Eden - 25L",
        price: 3500,
        description: "• EDEN - Queens paradise es un sustrato de uso profesional, que ofrece óptimas condiciones de siembra y/o trasplante, por su excelente aireación, retención de agua, reacción (pH) y Ce.",
        category: "Growing",
        stock: 0,
        img: './img/eden-substrate.jpg'
    },
    {
        id: 3,
        name: "Sodium Lamp - 400w",
        price: 3755,
        description: "Lámpara de alta presión 400w Sodio, tubular transparente con rosca E40. Ideal para cultivo indoor, y floración en general.",
        category: "Lighting",
        stock: 10,
        img: './img/sodium-lamp-400w.jpg'
    }
];

const iva = 0.2

const cart = [];

const cardContainer = document.getElementById('cardContainer');

const cartContainer = document.getElementById('cartContainer');

items.forEach(e => {
    const {
        name,
        img,
        price,
        stock,
        id
    } = e;
    let card = document.createElement('div');
    card.setAttribute('class', 'Item');
    card.innerHTML = `
        <img  alt=${name} src='${img}'/>
        <h4>${name}</h4>
        <h3>$ ${price}</h3>
        <h3 class=${stock != 0 ? 'green' : 'red'}> Stock:${stock || 'Out of Stock'}</h3>
        <button class='addbtn' id='${id}'><a class='whiteLink'>ADD TO CART</a></button>
    `;
    cardContainer.appendChild(card);
});

// EVENTS
const buttons = document.getElementsByClassName('addbtn');

for (let btn of buttons) {
    btn.addEventListener("click", () => addToCart(btn.id));
};

const showCartBtn = document.getElementById('showCart');
showCartBtn.addEventListener('click', () => showCart());

const checkOut = document.getElementById('checkOut');
checkOut.addEventListener('click', () => checkOutfn());

// FUNCTIONS
const addToCart = id => {
    const cartItem = items.find(i => i.id == id);
    const item4cart = { ...cartItem, stock: cartItem.stock - 1, quantity: 1 }
    cart.push(item4cart);
    console.log(cart);

    Toastify({
        text: `${item4cart.name} agregado con éxito`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
};

const showCart = () => {
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
}

const checkOutfn = () => {
    Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Su orden ha sido generada con éxito',
        footer: '<a href="/">Continuar comprando</a>'
      })
};
