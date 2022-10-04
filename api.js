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

export const getItems = () =>{
    return new Promise((resolve,reject)=> {
        if(items.length > 0) {
            setTimeout(() => {
                resolve(items);
            }, 1500);
        } else {
            reject(new Error('No hay items para mostrar'));
        }
    })
};

//const API = 'items.json';
const API = 'https://rickandmortyapi.com/api/character';


export const getData = async (res) =>{
    const response = await fetch(API);
    const data = await response.json();
    console.log(data.results)
    return data.results;
}