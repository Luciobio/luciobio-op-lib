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
        price: 1075,
        description: "• EDEN - Queens paradise es un sustrato de uso profesional, que ofrece óptimas condiciones de siembra y/o trasplante, por su excelente aireación, retención de agua, reacción (pH) y Ce.",
        category: "Growing",
        stock: 20,
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

const cart = [];

const cardContainer = document.getElementById('cardContainer');

const cartContainer = document.getElementById('cartContainer');

items.forEach(e => {
    let card = document.createElement('div');
    card.setAttribute('class', 'Item');
    card.innerHTML = `
        <img  alt=${e.name} src='${e.img}'/>
        <h4>${e.name}</h4>
        <h3>$ ${e.price}</h3>
        <button class='addbtn' id='${e.id}'><a class='whiteLink'>ADD TO CART</a></button>
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

// FUNCTIONS
const addToCart = id => {
    cart.push(items.find(i => i.id == id));
    console.log(cart);
};

const showCart = () => {
    if (cart.length === 0) {
        cartContainer.innerHTML=``;
        let sign = document.createElement('h2');
        sign.innerHTML = `No items in the Cart`;
        cartContainer.appendChild(sign);
    } else {
        cartContainer.innerHTML=``;
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
