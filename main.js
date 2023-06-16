
class Camiseta { // clase//      
    constructor (marca, precio, cantidad,urlimage) { //constructor es funcion que va a definir el valor de los atributos de la clase se establece parametros/
        this.marca = marca;   
        this.precio = precio; // this se crea como varible del atributo 
        this.cantidad = cantidad; 
        this.vendido = false;
        this.numventas = 0;
        this.TotalVenta = 0;
        this.urlimage = urlimage;
    }
    vender (cantidad){ // funcion  de la clase//
        this.vendido = true;
        this.numventas += 1; // operaciones, modificaciones de los valores de los atributos de la clase//
        this.cantidad = this.cantidad-cantidad;
        this.TotalVenta = cantidad*this.precio ;  
    }
     
}
const nike = new Camiseta ("nike", 50000, 9,"./img/azul.jpg");
const markit  = new Camiseta ("markit", 55000, 9,"./img/markit.jpg");
const quicksilver = new Camiseta ("quicksilver", 48000, 9,"./img/quicksilver.jpg");
const dnb = new Camiseta ("dnb", 50000, 9,"./img/dnb.jpg");
const calavera = new Camiseta ("calavera", 46000, 9,"./img/calavera.jpg");
const LV = new Camiseta ("LV", 46000, 9,"./img/blanca.jpg"); // const nombreobjeto = new nombreclase (argumentos de los parametros de constructor de la clase);


const arrcamisetas = [nike,markit,quicksilver,dnb,calavera,LV];

  // Obtener el contenedor donde se crearán las etiquetas figure
  const container = document.getElementById('container-items');

  // Generar las etiquetas product cards de camisetas
    arrcamisetas.forEach(camiseta => {

    // Crear un nuevo elemento figure
    const divietem = document.createElement('div');
    divietem.classList.add("item");

        // Crear un nuevo elemento figure
        const figure = document.createElement('figure');
        // Crear un elemento img
        const img = document.createElement('img');
        img.src = camiseta.urlimage;
        // Agregar la imagen a la etiqueta figure
        figure.appendChild(img);

        //div product card
        const productcard = document.createElement('div');
        productcard.classList.add("info-product");

        //Nombre
         const Nombre = document.createElement('h2');
         Nombre.innerHTML=camiseta.marca;

        //precio
        const precio = document.createElement('p');
        precio.innerHTML=camiseta.precio;

        //cotizar
        const buttonCotizar = document.createElement('button');
        buttonCotizar.textContent="Cotizar Camiseta";
        buttonCotizar.setAttribute('onClick','BienvenidoaBaambaam()');

        
        //carrito
        const buttoncarrito = document.createElement('button');
        buttoncarrito.textContent="Agregar a carrito";
        buttoncarrito.setAttribute('onClick','BienvenidoaBaambaam("'+camiseta.cantidad+'")');

        productcard.appendChild(Nombre);
        productcard.appendChild(precio);
        productcard.appendChild(buttonCotizar);

    // Agregar la etiqueta figure al contenedor
    divietem.appendChild(figure);
    divietem.appendChild(productcard);

    container.appendChild(divietem);
  });

   async function BienvenidoaBaambaam() {
    let nombre = prompt ("Hola,¿Cómo te llamas?");
    let mensaje = `Bienvenido/a ${nombre} a BaamBaam, estampados con la mejor durabilidad`;
    alert(mensaje);
    let respuesta = prompt("Escribe el logo o marca de tu camiseta que deseas comprar: Markit, Quicksilver, Calavera, Nike, Lv y dnb");

   const precioMarkit = 55000;
   const precioQuicksilver = 48000;
   const precioCalavera = 46000;
   const precioNike = 50000;
   const precioLv = 46000;
   const preciodnb = 50000;

   const descuento4 = x=> x * 0.96;
   const descuento8 = x=> x * 0.92;

   respuesta.toLowerCase();

   while ( respuesta != "fin") {
     switch (respuesta.toLowerCase()){
        case "markit": 
            alert(`El ${respuesta} tiene un valor de ${markit.precio} Pesos`);
            let cantidadMarkit = parseInt(prompt(`¿Cuántas camisetas Markit quieres? Desde 4 unidades, 4% dcto. Desde 7 unidades 8% dcto`));
            if(cantidadMarkit <=3){
                alert(`el valor de camiseta/s ${cantidadMarkit} Markit es de $ ${(cantidadMarkit*markit.precio)} Pesos`);
            }else if(cantidadMarkit >= 4 && cantidadMarkit <= 8){
                alert(`El valor de camiseta/s ${cantidadMarkit} Markit es de $ ${cantidadMarkit*(descuento4(markit.precio))} Pesos`);
            }else if(cantidadMarkit >= 7){
                alert(`el valor de camiseta/s ${cantidadMarkit} Markit es de $ ${cantidadMarkit*(descuento8(markit.precio))} Pesos`);
            }
            let confirmarcompramarkit = prompt("Escribe 'si' , si quieres realizar la compra");

            if(confirmarcompramarkit ="si"){
                markit.vender(cantidadMarkit);
            }
            await Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Compra realizada con éxito, haz comprado ' + cantidadMarkit + ' camisetas de la marca ' + markit.marca + ' por un total de ' + markit.TotalVenta + '.',
              });
              
              Swal.close();
              respuesta = prompt("Cotiza el valor unitario de cada camiseta: Markit, Quicksilver, calavera. Ingresa FIN para salir");

        break;
        case "quicksilver": 
            alert(`El ${respuesta} tiene un valor de ${quicksilver.precio} Pesos`);
            let cantidadQuicksilver = parseInt(prompt(`¿Cuántas camisetas Quicksilver quieres? Desde 4 unidades, 4% dcto. Desde 7 unidades 8% dcto`));
            if(cantidadQuicksilver <=3){
                alert(`el valor de camiseta/s ${cantidadQuicksilver} Quicksilver es de $ ${(cantidadQuicksilver*quicksilver.precio)} Pesos`);
            }else if(cantidadQuicksilver >= 4 && cantidadQuicksilver <= 8){
                alert(`El valor de camiseta/s ${cantidadQuicksilver} Quicksilveres de $ ${cantidadQuicksilver*(descuento4(quicksilver.precio))} Pesos`);
            }else if(cantidadQuicksilver >= 7){
                alert(`el valor de camiseta/s ${cantidadQuicksilver} Quicksilver es de $ ${cantidadQuicksilver*(descuento8(quicksilver.precio))} Pesos`);
            }
            let confirmarcompraquicksilver= prompt("Escribe 'si' , si quieres realizar la compra");

            if(confirmarcompraquicksilver="si"){
                quicksilver.vender(cantidadQuicksilver);
            }
            await Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Compra realizada con éxito, haz comprado ' + cantidadQuicksilver + ' camisetas de la marca ' + quicksilver.marca + ' por un total de ' + quicksilver.TotalVenta + '.',
              });
              
              Swal.close();
              respuesta = prompt("Cotiza el valor unitario de cada camiseta: Markit, Quicksilver, calavera. Ingresa FIN para salir");


        break;
        case "calavera": 
            alert(`El ${respuesta} tiene un valor de ${calavera.precio} Pesos`);
            let cantidadCalavera = parseInt(prompt(`¿Cuántas camisetas Calavera quieres? Desde 4 unidades, 4% dcto. Desde 7 unidades 8% dcto`));
            if(cantidadCalavera <=3){
                alert(`el valor de camiseta/s ${cantidadCalavera} Calavera es de $ ${(cantidadCalavera*calavera.precio)} Pesos`);
            }else if(cantidadCalavera >= 4 && cantidadCalavera <= 8){
                alert(`El valor de camiseta/s ${cantidadCalavera} Calavera es de $ ${cantidadCalavera*(descuento4(calavera.precio))} Pesos`);
            }else if(cantidadCalavera >= 7){
                alert(`el valor de camiseta/s ${cantidadCalavera} Calavera es de $ ${cantidadCalavera*(descuento8(calavera.precio))} Pesos`);
            }
            let confirmarcompracalavera = prompt("Escribe 'si' , si quieres realizar la compra");

            if(confirmarcompracalavera="si"){
                calavera.vender(cantidadCalavera);
            }
            await Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Compra realizada con éxito, haz comprado ' + cantidadCalavera + ' camisetas de la marca ' + calavera.marca + ' por un total de ' + calavera.TotalVenta + '.',
              });
              
              Swal.close();
              respuesta = prompt("Cotiza el valor unitario de cada camiseta: Markit, Quicksilver, calavera. Ingresa FIN para salir");
        break;
        case "nike": 
            alert(`El ${respuesta} tiene un valor de ${nike.precio} Pesos`);
            let cantidadNike = parseInt(prompt(`¿Cuántas camisetas Nike quieres? Desde 4 unidades, 4% dcto. Desde 7 unidades 8% dcto`));
            if(cantidadNike <=3){
                alert(`el valor de camiseta/s ${cantidadNike} Nike es de $ ${(cantidadNike*nike.precio)} Pesos`);
            }else if(cantidadNike >= 4 && cantidadNike <= 8){
                alert(`El valor de camiseta/s ${cantidadNike} Nike es de $ ${cantidadNike*(descuento4(nike.precio))} Pesos`);
            }else if(cantidadNike >= 7){
                alert(`el valor de camiseta/s ${cantidadNike} Nike es de $ ${cantidadNike*(descuento8(nike.precio))} Pesos`);
            }
            let confirmarcompranike = prompt("Escribe 'si' , si quieres realizar la compra");

            if(confirmarcompranike="si"){
                nike.vender(cantidadNike);
            }
            await Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Compra realizada con éxito, haz comprado ' + cantidadNike + ' camisetas de la marca ' + nike.marca + ' por un total de ' + nike.TotalVenta + '.',
              });
              
              Swal.close();
              respuesta = prompt("Cotiza el valor unitario de cada camiseta: Markit, Quicksilver, calavera. Ingresa FIN para salir");

        break;
        case "lv": 
            alert(`El ${respuesta} tiene un valor de ${LV.precio} Pesos`);
            let cantidadLv = parseInt(prompt(`¿Cuántas camisetas Lv quieres? Desde 4 unidades, 4% dcto. Desde 7 unidades 8% dcto`));
            if(cantidadLv <=3){
                alert(`el valor de camiseta/s ${cantidadLv} Lv es de $ ${(cantidadLv*LV.precio)} Pesos`);
            }else if(cantidadLv >= 4 && cantidadLv <= 8){
                alert(`El valor de camiseta/s ${cantidadLv} Lv es de $ ${cantidadLv*(descuento4(LV.precio))} Pesos`);
            }else if(cantidadLv >= 7){
                alert(`el valor de camiseta/s ${cantidadLv} Lv es de $ ${cantidadLv*(descuento8(LV.precio))} Pesos`);
            }
            let confirmarcompralv = prompt("Escribe 'si' , si quieres realizar la compra");

            if(confirmarcompralv="si"){
                LV.vender(cantidadLv);
            }
            await Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Compra realizada con éxito, haz comprado ' + cantidadLv + ' camisetas de la marca ' + LV.marca + ' por un total de ' + LV.TotalVenta + '.',
              });
              
              Swal.close();
              respuesta = prompt("Cotiza el valor unitario de cada camiseta: Markit, Quicksilver, calavera. Ingresa FIN para salir");
        break;
        case "dnb": 
            alert(`El ${respuesta} tiene un valor de ${dnb.precio} Pesos`);
            let cantidaddnb = parseInt(prompt(`¿Cuántas camisetas dnb quieres? Desde 4 unidades, 4% dcto. Desde 7 unidades 8% dcto`));
            if(cantidaddnb <=3){
                alert(`el valor de camiseta/s ${cantidaddnb} dnb es de $ ${(cantidaddnb*dnb.precio)} Pesos`);
            }else if(cantidaddnb >= 4 && cantidaddnb <= 8){
                alert(`El valor de camiseta/s ${cantidaddnb} dnb es de $ ${cantidaddnb*(descuento4(dnb.precio))} Pesos`);
            }else if(cantidaddnb >= 7){
                alert(`el valor de camiseta/s ${cantidaddnb} dnb es de $ ${cantidaddnb*(descuento8(dnb.precio))} Pesos`);
            }
            let confirmarcompradnb = prompt("Escribe 'si' , si quieres realizar la compra");

            if(confirmarcompradnb="si"){
                dnb.vender(cantidaddnb);
            }
            await Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Compra realizada con éxito, haz comprado ' + cantidaddnb + ' camisetas de la marca ' + dnb.marca + ' por un total de ' + dnb.TotalVenta + '.',
              });
              
              Swal.close();
              respuesta = prompt("Cotiza el valor unitario de cada camiseta: Markit, Quicksilver, calavera. Ingresa FIN para salir");
              
        break;

        default:
            alert (`El ${respuesta} no esta disponible`);
            respuesta = prompt("Cotiza el valor unitario de cada camiseta: Markit, Quicksilver, calavera. Ingresa FIN para salir");
            break;
        }
  }
  async function final() {
    let despedida = await Swal.fire({
      title: "Por último, ¿Quieres recibir información?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });
  
    if (despedida.isConfirmed) {
      await Swal.fire("Éxito", "Ya que tu respuesta es sí, te llegará un correo. Vuelve pronto, gracias.", "success");
    } else if (despedida.isDismissed) {
      await Swal.fire("Éxito", "Ya que tu respuesta es no, no llegará un correo. Vuelve pronto, gracias.", "success");
    }
  }
  
  final();
 
   }

   const searchInput = document.getElementById('searchInput');
   const searchButton = document.getElementById('searchButton');
   const resultsContainer = document.getElementById('resultsContainer');
   
   // Agregar un evento de clic al botón de búsqueda
   searchButton.addEventListener('click', function () {
     // Obtener el valor de búsqueda ingresado
     const searchTerm = searchInput.value.toLowerCase();
   
     // Limpiar el contenedor de resultados
     resultsContainer.innerHTML = '';
   
     // Realizar la búsqueda en el arreglo de objetos
     const results = arrcamisetas.filter(function (objeto) {
       // Comparar el término de búsqueda con los atributos "nombre" y "descripcion"
       return (
         objeto.marca.toLowerCase().includes(searchTerm));
     });
   
     // Mostrar los resultados en el contenedor
     results.forEach(function (resultado) {
       const resultElement = document.createElement('div');
       resultElement.classList.add("carrito");
       resultElement.textContent = `Nombre: ${resultado.marca}, precio: ${resultado.precio}`;
       resultsContainer.appendChild(resultElement);
     });
   });

   // Función para guardar el carrito de compras en el local storage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  
  // Función para obtener el carrito de compras desde el local storage
  function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      return JSON.parse(carritoGuardado);
    }
    return [];
  }
  // Función para agregar una camiseta al carrito de compras
  function agregarAlCarrito(camiseta) {
    const carrito = obtenerCarrito();
    carrito.push(camiseta);
    guardarCarrito(carrito);
  }
  
  // Función para obtener todas las camisetas del carrito de compras
  function obtenerCamisetasDelCarrito() {
    return obtenerCarrito();
  }
  
  // Función para vaciar el carrito de compras
  function vaciarCarrito() {
    guardarCarrito([]);
  }
  
  function carrito(){
    var resp = prompt("Ingrese proceso de carrito, Agregar, Consultar, Vaciar");
    resp.toLowerCase();
    while ( resp != "fin") {
      switch (resp.toLowerCase()){
         case "agregar": 
         var respmarca = prompt("Escribe la marca de tu camiseta que deseas adicionar al carrito: Markit, Quicksilver, Calavera, Nike, Lv y dnb");
         var camiseta = arrcamisetas.find(el => el.marca =respmarca);
         agregarAlCarrito(camiseta);
         break;
         case "consultar": 
            var listacamisetas = JSON.stringify(obtenerCamisetasDelCarrito());        
            alert(listacamisetas);
         break;
         case "vaciar": 
            vaciarCarrito();
         break;
         default:
             alert (`El ${resp} no esta disponible`);
             break;
         }
         resp = prompt("Ingrese proceso de carrito, Agregar, Consultar, Vaciar o FIN para salir");  
   }
  }

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

  document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const brandName = document.getElementById('brand-name').value;
    fetchLogo(brandName);
  });