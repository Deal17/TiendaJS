const arrcamisetas = [
  {
      titulo: "Blanca",
      imagenSrc: "./img/blanca.jpg",
      precio: "$50.000"
  },
  {
    titulo: "azul",
    imagenSrc: "./img/azul.jpg",
    precio: "$60.000"
  },
  {
    titulo: "quicksilver",
    imagenSrc: "./img/quicksilver.jpg",
    precio: "$55.000"
  },
  {
    titulo: "dnb",
    imagenSrc: "./img/dnb.jpg",
    precio: "$65.000"
  },
  {
    titulo: "markit",
    imagenSrc: "./img/markit.jpg",
    precio: "$55.000"
  },
    {
      titulo: "calavera",
      imagenSrc: "./img/calavera.jpg",
      precio: "$55.000"
    },

  
];


// Función para mostrar las camisetas en el contenedor
function mostrarCamisetas() {
  const contenedorItems = document.querySelector('.contenedor-items');

  arrcamisetas.forEach(camiseta => {
      const item = document.createElement('div');
      item.classList.add('item');

      const itemContenido = `
          <span class="titulo-item">${camiseta.titulo}</span>
          <img src="${camiseta.imagenSrc}" alt="" class="img-item">
          <span class="precio-item">${camiseta.precio}</span>
          <button class="boton-item">Agregar al Carrito</button>
      `;

      item.innerHTML = itemContenido;
      contenedorItems.appendChild(item);

      // Agregar evento click al botón "Agregar al Carrito"
      const botonAgregar = item.querySelector('.boton-item');
      botonAgregar.addEventListener('click', () => agregarAlCarritoClicked(camiseta));
  });
}
//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
}else{
  ready();
}

function ready(){
  cargarCarritoDesdeLocalStorage();
  mostrarCamisetas();
  //Agregremos funcionalidad a los botones eliminar del carrito
  var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
  for(var i=0;i<botonesEliminarItem.length; i++){
      var button = botonesEliminarItem[i];
      button.addEventListener('click',eliminarItemCarrito);
  }

  //Agrego funcionalidad al boton sumar cantidad
  var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
  for(var i=0;i<botonesSumarCantidad.length; i++){
      var button = botonesSumarCantidad[i];
      button.addEventListener('click',sumarCantidad);
  }

   //Agrego funcionalidad al buton restar cantidad
  var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
  for(var i=0;i<botonesRestarCantidad.length; i++){
      var button = botonesRestarCantidad[i];
      button.addEventListener('click',restarCantidad);
  }

  //Agregamos funcionalidad al boton Agregar al carrito
  var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
  for(var i=0; i<botonesAgregarAlCarrito.length;i++){
      var button = botonesAgregarAlCarrito[i];
      button.addEventListener('click', agregarAlCarritoClicked);
  }

  //Agregamos funcionalidad al botón comprar
  document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
function cargarCarritoDesdeLocalStorage() {
  var carritoItems = localStorage.getItem('carritoItems');
  if (carritoItems) {
      // Si hay elementos en el Local Storage, los cargamos en el carrito
      carritoItems = JSON.parse(carritoItems);
      carritoItems.forEach(item => {
          agregarItemAlCarrito(item.titulo, item.precio, item.imagenSrc);
      });
  }
}

// Función para guardar los datos del carrito en el Local Storage
function guardarCarritoEnLocalStorage() {
  var carritoItems = document.getElementsByClassName('carrito-items')[0].children;
  var carritoData = [];

  for (var i = 0; i < carritoItems.length; i++) {
      var item = carritoItems[i];
      var titulo = item.getElementsByClassName('carrito-item-titulo')[0].innerText;
      var precio = item.getElementsByClassName('carrito-item-precio')[0].innerText;
      var imagenSrc = item.getElementsByTagName('img')[0].src;

      carritoData.push({ titulo, precio, imagenSrc });
  }

  localStorage.setItem('carritoItems', JSON.stringify(carritoData));
}

//Eliminamos todos los elementos del carrito y lo ocultamos
async function pagarClicked(){
  var carritoItems = document.getElementsByClassName('carrito-items')[0];
  if (carritoItems.childElementCount == 0) {
      await Swal.fire({
          icon: 'warning',
          title: 'Fallido!',
          text: 'El carrito está vacío. No hay artículos para pagar.',
      });
      return;
  }
  await Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Compra realizada con éxito.',
  });
  await final();
  while (carritoItems.hasChildNodes()){
      carritoItems.removeChild(carritoItems.firstChild)
  }
  actualizarTotalCarrito();
  ocultarCarrito();
  guardarCarritoEnLocalStorage();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
  var button = event.target;
  var item = button.parentElement;
  var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
  var precio = item.getElementsByClassName('precio-item')[0].innerText;
  var imagenSrc = item.getElementsByClassName('img-item')[0].src;
  console.log(imagenSrc);

  agregarItemAlCarrito(titulo, precio, imagenSrc);

  hacerVisibleCarrito();
}
async function final() {
  let despedida = await Swal.fire({
    title: "Por último, ¿Quieres recibir información de nuevas promociones a tu correo    ?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });

  if (despedida.isConfirmed) {
    await Swal.fire("Éxito", "Ya que tu respuesta es sí, te llegará un correo. Vuelve pronto, gracias.", "success");
  } else if (despedida.isDismissed) {
    await Swal.fire("Éxito", "Ya que tu respuesta es no, no llegará ningún correo. Vuelve pronto, gracias.", "success");
  }
}
//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
  carritoVisible = true;
  var carrito = document.getElementsByClassName('carrito')[0];
  carrito.style.marginRight = '0';
  carrito.style.opacity = '1';

  var items =document.getElementsByClassName('contenedor-items')[0];
  items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
async function agregarItemAlCarrito(titulo, precio, imagenSrc){
  var item = document.createElement('div');
  item.classList.add = ('item');
  var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

  //controlamos que el item que intenta ingresar no se encuentre en el carrito
  var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
  for(var i=0;i < nombresItemsCarrito.length;i++){
      if(nombresItemsCarrito[i].innerText==titulo){
          await Swal.fire("Fallido", "El item ya se encuentra en el carrito", "warning");
          return;
      }
  }

  var itemCarritoContenido = `
      <div class="carrito-item">
          <img src="${imagenSrc}" width="80px" alt="">
          <div class="carrito-item-detalles">
              <span class="carrito-item-titulo total">${titulo}</span>
              <div class="selector-cantidad">
                  <i class="fa-solid fa-minus restar-cantidad"></i>
                  <input type="text" value="1" class="carrito-item-cantidad" disabled>
                  <i class="fa-solid fa-plus sumar-cantidad"></i>
              </div>
              <span class="carrito-item-precio total">${precio}</span>
          </div>
          <button class="btn-eliminar">
              <i class="fa-solid fa-trash"></i>
          </button>
      </div>
  `
  item.innerHTML = itemCarritoContenido;
  itemsCarrito.append(item);

  //Agregamos la funcionalidad eliminar al nuevo item
   item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

  //Agregmos al funcionalidad restar cantidad del nuevo item
  var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
  botonRestarCantidad.addEventListener('click',restarCantidad);

  //Agregamos la funcionalidad sumar cantidad del nuevo item
  var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
  botonSumarCantidad.addEventListener('click',sumarCantidad);

  //Actualizamos total
  actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
  var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
  cantidadActual++;
  selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
  actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
  var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
  cantidadActual--;
  if(cantidadActual>=1){
      selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
      actualizarTotalCarrito();
  }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  //Actualizamos el total del carrito
  actualizarTotalCarrito();

  //la siguiente funciòn controla si hay elementos en el carrito
  //Si no hay elimino el carrito
  ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
  var carritoItems = document.getElementsByClassName('carrito-items')[0];
  if(carritoItems.childElementCount==0){
      var carrito = document.getElementsByClassName('carrito')[0];
      carrito.style.marginRight = '-100%';
      carrito.style.opacity = '0';
      carritoVisible = false;
  
      var items =document.getElementsByClassName('contenedor-items')[0];
      items.style.width = '100%';
  }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
  //seleccionamos el contenedor carrito
  var carritoContenedor = document.getElementsByClassName('carrito')[0];
  var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
  var total = 0;
  //recorremos cada elemento del carrito para actualizar el total
  for(var i=0; i< carritoItems.length;i++){
      var item = carritoItems[i];
      var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
      //quitamos el simobolo peso y el punto de milesimos.
      var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
      var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
      console.log(precio);
      var cantidad = cantidadItem.value;
      total = total + (precio * cantidad);
  }
  total = Math.round(total * 100)/100;

  document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const brandName = document.getElementById('brand-name').value;
  fetchLogo(brandName);
});

async function fetchLogo(brandName) {
  try {
    const response = await fetch(`https://logo.clearbit.com/${brandName.toLowerCase()}.com`);
    if (response.ok) {
      const logoUrl = response.url;
      const logoImg = document.createElement('img');
      logoImg.src = logoUrl;
      logoImg.alt = `${brandName} Logo`;
      logoImg.classList.add("iamgenlogoapi");
      document.getElementById('logo-container').appendChild(logoImg);
    } else {
      console.log(`No se encontró el logo de ${brandName}`);
    }
  } catch (error) {
    console.log('Error al obtener el logo:', error);
  }
}


var carritoItemsprueba = localStorage.getItem('carritoItems');



