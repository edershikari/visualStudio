$(document).ready(function(){

        
    var htmlCode = "";

    htmlCode += '';
    htmlCode += '<img src="ButtCapper_Banner2.gif">';
    htmlCode += '<button class="btn">Carrito</button>';

    $('#cabecera').html(htmlCode);



    $.getJSON('http://localhost:8080/proyectoV1/api/productos', function(productos){
        console.log(productos);
        mostrarTodos(productos);
    });

    function mostrarTodos(productos){
        var htmlCode = "";

        htmlCode += '';
        

        for (let index = 0; index < productos.length; index++) {
            const producto = productos[index];
            console.log(producto.nombre);
            htmlCode += '<div class="p-2 w-25"  style="border:solid 2px black" align="center">';
            htmlCode += '<img src="'+producto.imagen+'" style="max-width:100px">';
            htmlCode += '<div id="info">';
            htmlCode += '<p> '+producto.nombre+'</p>';
            htmlCode += '<p> '+producto.precio+'€</p>';
            htmlCode += '<button type="button" class="btn btn-dark">añadir  al carrito</button>';
            htmlCode += '</div>';
            htmlCode += '</div>';

            
        }
     $('#productos').html(htmlCode); //Rellena todos los productos
     $( "#todosProductos" ).click(function() {
       mostrarTodos(productos);         
    });
    }
            
     

        
    });

    

    $.getJSON('http://localhost:8080/proyectoV1/api/categorias', function(categorias){
        console.log(categorias);
       

        var htmlCode = "";

        htmlCode += '';
        

        for (let index = 0; index < categorias.length; index++) {
            const categoria = categorias[index];
            console.log(categoria.nombre);
            htmlCode += '<div id="categoria' +categoria.id_categoria+ '" data-idCategoria="'+categoria.id_categoria+'" class="categoria" style="border:solid 2px black" >';
            htmlCode += '<button style="width:100%" type="button" class="btn btn-dark"> '+categoria.nombre+'</button>'
            htmlCode += '</div>';
           

        }

            htmlCode += '<div id="todosProductos"  style="border:solid 2px black" >';
            htmlCode += '<button style="width:100%" type="button" class="btn btn-dark">Todos los productos</button>'
            htmlCode += '</div>';
     $('#categorias').html(htmlCode); // Rellena todas las categorias

            $( "#categorias" ).click(function() {
                alert( "Handler for .click() called." );
        });

        

    });
});