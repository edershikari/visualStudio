
$(document).ready(function () {

    var vCarrito = [];
    // var data = JSON.parse(localStorage.getItem('datos'));
    // console.log(data);

    // var array = localStorage.getItem('datos');
    // // Se parsea para poder ser usado en js con JSON.parse :)
    // array = JSON.parse(array);


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
        



        $('.aniadir').click(function () {

            var producto = choosenProduct(productos, $(this));

            /*Captura de datos escrito en los inputs*/
            var id = producto.id_producto;
            var vCarrito=JSON.parse(localStorage.getItem('carrito'));

            if (vCarrito==null) {
                vCarrito=[];
                vCarrito.push(id);

            } else {
                vCarrito.push(id);
            }

            /*Guardando los datos en el LocalStorage*/
            //Almacenar en local storage el array de id-s
            localStorage.setItem('carrito', JSON.stringify(vCarrito));

            // /*Limpiando los campos o inputs*/
            // document.getElementById("apellidotxt").value = "";
        });


       
        //anadir evento al boton ver carrito
        /*Funcion Cargar y Mostrar datos*/
        $('#verCarrito').click(function () {
            var htmlCode = "";
            htmlCode += '';
            // for (let index = 0; index < vCarrito.length; index++) {
            //     vCarrito.id;

//             var vCarrito=JSON.parse(localStorage.getItem('carrito'));

//             var vCarrito = JSON.parse(localStorage.getItem('carrito'));
//              for (let index = 0; index > array.length; index--) {
//                 const producto = productos[index];

//             var idEncontrado = vCarrito.includes(producto.id);
//             document.getElementById("#carrito").innerHTML = idEncontrado;
// }

// for (let index = 0; index < productos.length; index++) {
//     const producto = productos[index];
    

// var carrito = JSON.parse(localStorage.getItem('carrito'));
// document.getElementById("#carrito").innerHTML = vCarrito.some(c => c.id == productos.id_producto) ? "yay" : 'nay';

// localStorage.setItem('carrito', JSON.stringify({
// 	producto.id_producto: 1;
// }}));


            // for (let index = 0; index > array.length; index--) {
            //     const producto = productos[index];

            //     if(producto.id) {
                    
            //     }
                
            // }

            // for (let index = 0; index < vCarrito.length; index++) {
            //     htmlCode += '<table class="table table-hover">';
            //     htmlCode += '<thead>';
            //     htmlCode += '<tr>';
            //     htmlCode += '<th scope="col">Imagen</th>';
            //     htmlCode += '<th scope="col">Nombre</th>';
            //     htmlCode += '<th scope="col">Cantidad</th>';
            //     htmlCode += '<th scope="col">Precio/Unidad</th>';
            //     htmlCode += '</tr>';
            //     htmlCode += '</thead>';
            //     htmlCode += '<tbody>';
            //     htmlCode += '<tr>';
            //     htmlCode += '<th scope="row">'+producto.imagen+'</th>';
            //     htmlCode += '<td>'+producto.nombre+'</td>';
            //     htmlCode += '<td>'+producto.quantity+'</td>';
            //     htmlCode += '<td>@'+producto.price+'</td>';
            //     htmlCode += '</tr>';
            //     htmlCode += '</tbody>';
            //     htmlCode += '</table>';
                
            // }
            // $('#carrito').html(htmlCode);
                
            // }

            // /*Obtener datos almacenados*/
             var id = localStorage.getItem("carrito");

            // /*Mostrar datos almacenados*/

             document.getElementById("carrito").innerHTML = id;


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
        htmlCode += '<a href="Carrito.html" id="verCarrito" data-producto="'+vCarrito+'"class="btn btn-primary btn-lg " type="button" aria-pressed="true">Carrito</a>';
        htmlCode += '<a href="" class="btn btn-secondary btn-lg admin" type="button" aria-pressed="true">Admnin</a>';

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

            });
        });


    });


    function anadirIdAlCarrito(productos) {

        $('.aniadir').click(function () {

            var productoACarrito = choosenProduct(productos, $(this));

            /*Captura de datos escrito en los inputs*/
            var id = productoACarrito.id_producto;

            /*Guardando los datos en el LocalStorage*/
            localStorage.setItem("Id_producto", id);


            // /*Limpiando los campos o inputs*/
            // document.getElementById("nombretxt").value = "";
            // document.getElementById("apellidotxt").value = "";
        });

        localStorage.setItem('datos', JSON.stringify(idArray));

        /*Funcion Cargar y Mostrar datos*/
        $('#verCarrito').click(function () {
            /*Obtener datos almacenados*/
            var id = localStorage.getItem("Id_producto");

            /*Mostrar datos almacenados*/

            document.getElementById("Id_producto").innerHTML = id;


        });


    }


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


