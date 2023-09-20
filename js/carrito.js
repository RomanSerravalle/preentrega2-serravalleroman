//Llamados HTML

const elCartera = document.querySelector("#cartera span");
const elCarrito = document.querySelector("#carrito");
const elTotal = document.querySelector("#total span");
const elBienvenida = document.querySelector("h1");

//Objetos productos
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

const gpuNvidia = new Producto("Nvidia GeForce RTX 2070 Super", 180000);
const gpuAmd = new Producto("AMD Radeon RX 6600 XT", 300000);
const cpuIntel = new Producto("Intel i7 7700", 100000);
const cpuAmd = new Producto("AMD Ryzen 5 7600", 150000);
const ramCorsair = new Producto("Memoria RAM Corsair DDR4 8GB", 25000);
const ramViper = new Producto("Memoria RAM Patriot Viper DDR4 8GB", 30000);

//Variables de usuario y dinero en cartera
const nombreUsuario = prompt("Nombre de usuario: ");
let cartera = 800000;

elCartera.innerText = "$" + cartera;
elTotal.innerText = "$" + 0;

elBienvenida.innerText =
  "Bienvenido a Velen Computación, " + nombreUsuario + "!";

//Array del carrito
const carrito = [];

//Función de compra
function comprar(producto) {
  if (cartera - producto.precio >= 0) {
    carrito.push(producto);
    cartera -= producto.precio;
    actualizar();
  } else {
    alert(
      `No le quedan fondos suficientes para efectuar la compra de ${producto.nombre}.`
    );
  }
}

//Función de venta
function vender(nombreProducto) {
  const productoCarrito = carrito.find(
    (producto) => producto.nombre == nombreProducto
  );

  if (productoCarrito) {
    cartera += productoCarrito.precio;
    carrito.splice(carrito.indexOf(productoCarrito), 1);
    actualizar();
  }
}

//Función para actualizar el HTML
function actualizar() {
  console.clear();
  console.log("Productos en carrito: ", carrito);
  console.log("Dinero en la cartera: ", cartera);

  //Función para calcular el valor total del carrito
  const totalCarrito = carrito.reduce((acc, el) => acc + el.precio, 0);
  console.log("Valor total del carrito: $" + totalCarrito);

  //Agregar productos al carrito
  elCarrito.innerHTML = "";
  for (const producto of carrito) {
    const li = `<li onclick="vender('${producto.nombre}')">${producto.nombre} - <b> $${producto.precio}</b></li>`;
    elCarrito.innerHTML += li;
  }
  elCartera.innerText = "$" + cartera;
  elTotal.innerText = "$" + totalCarrito;
}
