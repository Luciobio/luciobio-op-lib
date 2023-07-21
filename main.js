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

//Fetch al JSON (items.json)
export const getData = async () => {
  const API = 'items.json'
  const response = await fetch(API);
  const data = await response.json();
  console.log(data);
  return data;
}

const LoadItems = (catalog) => {
  catalog.forEach((e) => {
    const { name: nombre, img: imagen, description, price, stock, id } = e;
    let card = document.createElement("div");
    card.setAttribute("class", "Item");
    card.innerHTML = `
            <img  alt=${nombre} src='${imagen}'/>
            <h4>${nombre}</h4>
            <h3>$${price}</h3>
            <h3 class= ${stock ? "green" : "red"}> Stock:${
      stock || " No hay Stock"
    }</h3> 
            <button class='addbtn' id='${id}'><a class='whiteLink'>ADD TO CART</a></button>
        `;
    cardContainer.appendChild(card);
  });
};

const addToCart = (id) => {
  const cartItem = catalog.find((i) => i.id == id);
  if (cartItem.stock > 0) {
    const toast = (name) => {
      Toastify({
        text: `${name} agregado con éxito 🍁`,
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    };
    let alreadyInCart = cart.some((item) => item.id == id);
    // chequeo si el item ya está en el carrito
    if (alreadyInCart) {
      // Obtengo el indice del item en el carrito
      const itemIndex = cart.findIndex((e) => e.id === cartItem.id);
      const item4cart = cart[itemIndex];
      // Modifico la cantidad y el total
      item4cart.quantity++;
      item4cart.total = item4cart.price * item4cart.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      toast(item4cart.name);
    } else {
      const item4cart = {
        ...cartItem,
        stock: cartItem.stock - 1,
        quantity: 1,
        total: cartItem.price,
      };
      cart.push(item4cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast(item4cart.name);
    }
  } else {
    Swal.mixin({
      toast: true,
      position: "top-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }).fire({
      icon: "error",
      title: "No hay stock del producto seleccionado",
    });
  }
};

const cartIsEmpty = () => {
  cartContainer.innerHTML = ``;
  let sign = document.createElement("h2");
  sign.innerHTML = `No items in the Cart`;
  cartContainer.appendChild(sign);
};

const itemsInCart = () => {
  cartContainer.innerHTML = ``;
  cart.forEach((e) => {
    const { name, quantity, total } = e;
    let cartItem = document.createElement("div");
    cartItem.innerHTML = `
            <h3>${name}</h3>
            <h4> Cantidad: ${quantity}</h4>
            <h4>$${total}</h4>
            `;
    cartContainer.appendChild(cartItem);
  });
};

const showCart = () => (cart.length ? itemsInCart() : cartIsEmpty());

const order = () => {
  let message = "";
  cart.forEach((e) => {
    const { quantity, name, total } = e;
    message += `<p>(x${quantity}) - ${name} - $${total}</p>`;
  });
  return message;
};

const total = () => cart.reduce((acc, val) => acc + val.total, 0);

const checkOutFunction = () => {
  if (cart.length) {
    const DateTime = luxon.DateTime;
    const fecha = DateTime.now().setLocale("es").toLocaleString();

    Swal.fire({
      icon: "success",
      title: "Exito!",
      html: `Su orden:\n${order()}Ha sido generada con éxito. \n`,
      footer: `Fecha: ${fecha} - Precio total de su orden: $${total()}`,
    });
    localStorage.setItem("cart", JSON.stringify([]));
    cart = JSON.parse(localStorage.getItem("cart"));
    showCart();
  } else {
    Swal.fire({
      icon: "error",
      title: "No hay items en el carrito",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

// EJECUCION DEL CODIGO

// Guardar el Catalogo en el Storage 
// Utilizo la función asyncrónica que hace el fetch: await getData()
localStorage.getItem("catalog")
  ? console.log("Ya esta cargado el catálogo en el storage")
  : localStorage.setItem("catalog", JSON.stringify(await getData()));

// Determino donde se van a mostrar mi catálogo y carrito
const cardContainer = document.getElementById("cardContainer");
const cartContainer = document.getElementById("cartContainer");

// Traigo catálogo del storage
let catalog = JSON.parse(localStorage.getItem("catalog"));

// Cargo mis productos en la página
LoadItems(catalog);

// Genero un array para el carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// EVENTS

// Agrego eventos a los botones "ADD TOO CART"
const buttons = document.getElementsByClassName("addbtn");
for (let btn of buttons) {
  btn.addEventListener("click", () => addToCart(btn.id));
}

// Agrego eventos al boton "SHOW CART"
const showCartBtn = document.getElementById("showCart");
showCartBtn.addEventListener("click", () => showCart());

// Agrego eventos al boton "CHECKOUT"
const checkOut = document.getElementById("checkOut");
checkOut.addEventListener("click", () => checkOutFunction());
