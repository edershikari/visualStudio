
var vCarrito;
$(document).ready(function () {

    vCarrito = [];
    //localStorage.removeItem("carrito");

    var htmlCode = "";
    $('#producto-card').hide();

    htmlCode += '';
    htmlCode += '<img src="ButtCapper_Banner2.gif">';

    $('#cabecera').html(htmlCode);

    $.getJSON('http://localhost:8080/proyectoV1/api/productos', function (productos) {
        console.log(productos);
        mostrarTodos(productos);
        mostrarProducto(productos);

        //anadirIdAlCarrito(productos);

        //anadirEventosABotonCarrito
        

/*         var CarritoArray = [
           1:{
                id_producto : 1,
                nombre : producto.nombre,
                imagen  : producto.imagen,
                cantidad : 1,
                precio : producto.precio
            },
            {
                id_producto : 2,
                nombre : producto.nombre,
                imagen  : producto.imagen,
                cantidad : 1,
                precio : producto.precio
            }
        ]
 */


        $('.aniadir').click(function () {

            var producto = choosenProduct(productos, $(this));
            /*Captura de datos escrito en los inputs*/
            var compra ={
                cantidad : 1,
                id_producto : producto.id_producto,
                nombre : producto.nombre,
                imagen  : producto.imagen,
                precio : producto.precio
            }
            var vCarrito=JSON.parse(localStorage.getItem('carrito'));
            var repetido=false;

            // console.log(compra.id);
            if (vCarrito==null) {
                vCarrito=[];           
            } else {

                for (let i=0;i< vCarrito.length;i++){

                    if (vCarrito[i].id_producto== compra.id_producto){
                        alert("Este elemento está ya en el carrito."); 
                        repetido=true;
                    }
                }
            }
            if(repetido==false){
                vCarrito.push(compra);
               // vCarrito[compra.id_producto] = compra;
            }
            /*Guardando los datos en el LocalStorage*/
            //Almacenar en local storage el array de id-s
            localStorage.setItem('carrito', JSON.stringify(vCarrito));

        });      
    });

    function mostrarProducto(productos) {
        //cuando se click una img se esconda todo y solo aparezcan los datos del producto
        $('#productos img').on("click", function () {

            //Cojer el id
            var id = $(this).data('id_producto'); //data: 

            //Buscar el producto en el array
            var productoSeleccionado = buscarProducto(id);

            //rellenar el card 
            rellenarElCard(productoSeleccionado);
            $('#cabecera').hide();
            $('#categorias').hide();
            $('#productos').children().hide();
            $('#producto-card').show();

        });

        function buscarProducto(id) {
            for (let index = 0; index < productos.length; index++) {
                const producto = productos[index];

                if (id == producto.id_producto) {
                    return producto;
                }
            }
        }
        var htmlCode = "";
        htmlCode += '';

        function rellenarElCard(productoSeleccionado) {

            htmlCode += '<div class="card" style="width: 20rem;">';
            htmlCode += '<img src="' + productoSeleccionado.imagen + '" class="card-img-top" style="width:200px">';
            htmlCode += '<div class="card-body">';
            htmlCode += '<h5 class="card-title">' + productoSeleccionado.nombre + '</h5>';
            htmlCode += '<p class="card-text">' + productoSeleccionado.descripcion + '</p>';
            htmlCode += '<a href="index.html" class="btn btn-primary">Atrás</a>';
            htmlCode += '</div>';
            htmlCode += '</div>';

            // $('#producto-card h3').html(productoSeleccionado.nombre);
            // $('#descripcion').html(productoSeleccionado.descripcion);
            // $('#producto-card img').attr('src',productoSeleccionado.imagen);
            // $('#producto-card img').attr('style','width:200px;');
            // $('#precio').html(productoSeleccionado.precio+"€");
            $('#producto-card').html(htmlCode);

        }
    }


    function mostrarTodos(productos) {
        var htmlCode = "";

        htmlCode += '';


        for (let index = 0; index < productos.length; index++) {
            const producto = productos[index];
            //console.log(producto.nombre);
            htmlCode += '<div class="p-2 w-25"  style="border:solid 2px black" align="center">';
            htmlCode += '<img src="' + producto.imagen + '"  data-id_producto="' + producto.id_producto + '" style="max-width:100px">';
            htmlCode += '<div id="info">';
            htmlCode += '<p> ' + producto.nombre + '</p>';
            htmlCode += '<p> ' + producto.precio + '€</p>';
            htmlCode += '<button type="button"  data-id_producto="' + producto.id_producto + '" class="btn btn-dark aniadir">añadir  al carrito</button>';
            htmlCode += '</div>';
            htmlCode += '</div>';


        }
        $('#productos').html(htmlCode); //Rellena todos los productos
        $(".todosProductos").click(function () { //boton con evento para mostrar todos los productos
            $.getJSON('http://localhost:8080/proyectoV1/api/productos', function (productos) {
                console.log(productos);
                mostrarTodos(productos);

            });
        });
    }


    $.getJSON('http://localhost:8080/proyectoV1/api/categorias', function (categorias) { //lamada Json para rellenar categorias
        //console.log(categorias);
{/* <a href="http://localhost:8080/proyectoV1/Carrito" */}
        var htmlCode = "";

        htmlCode += '';
        htmlCode += '<a href="carrito.html" id="verCarrito" class="btn btn-primary btn-lg " style="width:50%" type="button" aria-pressed="true">Carrito</a>';
        htmlCode += '<a href="admin.html" class="btn btn-secondary btn-lg admin" style="width:50%" type="button" aria-pressed="true">Admin.</a>';
        
        for (let index = 0; index < categorias.length; index++) {
            const categoria = categorias[index];
            //console.log(categoria.nombre);
            htmlCode += '<div id="categoria' + categoria.id_categoria + '" class="categoria" style="border:solid 2px black" >';
            htmlCode += '<button  data-idCategoria="' + categoria.id_categoria + '"   style="width:100%" type="button" class="btn btn-dark class_cat"> ' + categoria.nombre + '</button>'

            htmlCode += '</div>';
        }

        htmlCode += '<div   style="border:solid 2px black" >';
        htmlCode += '<button  style="width:100%" type="button" class="btn btn-dark todosProductos">Todos los productos</button>'
        htmlCode += '</div>';

        $('#categorias').html(htmlCode); // Rellena todas las categorias

        $(".class_cat").click(function () {
            //alert( "Handler for .click() called." );
            var id_categoria = $(this).data("idcategoria");

            var data = {
                id_categoria: id_categoria
            };

            $.getJSON('http://localhost:8080/proyectoV1/api/categoriasFiltrado', data, function (productos) {
                console.log("FILTRADOS : " + productos);
                mostrarTodos(productos);
                mostrarProducto(productos);

            });
        });


    });




    function choosenProduct(productos, boton) {
        //cuando se click una img se esconda todo y solo aparezcan los datos del producto
        //console.log(productos.length);
        var i = 0;
        //Cojer el id
        var id = boton.data('id_producto'); //data: 

        //Buscar el producto en el array
        var productoACarrito = idProducto(id, productos);

        i++;
        //console.log(idArray);
        function idProducto(id, productos) {
            for (let index = 0; index < productos.length; index++) {
                const producto = productos[index];
                if (id == producto.id_producto) {
                    return producto;
                }
            }
        }
        return productoACarrito;
    }

}); //document.ready


