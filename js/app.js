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
            //console.log(producto.nombre);
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
        $( ".todosProductos" ).click(function(productos) { //boton con evento para mostrar todos los productos
            $.getJSON('http://localhost:8080/proyectoV1/api/productos', function(productos){
                console.log(productos);
                mostrarTodos(productos);
            });     
        });
    }
        

    $.getJSON('http://localhost:8080/proyectoV1/api/categorias', function(categorias){
        //console.log(categorias);

        var htmlCode = "";

        htmlCode += '';
        

        for (let index = 0; index < categorias.length; index++) {
            const categoria = categorias[index];
            //console.log(categoria.nombre);
            htmlCode += '<div id="categoria' +categoria.id_categoria+ '" class="categoria" style="border:solid 2px black" >';
            htmlCode += '<button  data-idCategoria="'+categoria.id_categoria+'"   style="width:100%" type="button" class="btn btn-dark class_cat"> '+categoria.nombre+'</button>'
            
            htmlCode += '</div>';
        }

        htmlCode += '<div   style="border:solid 2px black" >';
        htmlCode += '<button  style="width:100%" type="button" class="btn btn-dark todosProductos">Todos los productos</button>'
        htmlCode += '</div>';
        
        $('#categorias').html(htmlCode); // Rellena todas las categorias

        $( ".class_cat" ).click(function() {
            //alert( "Handler for .click() called." );
            var id_categoria=$(this).data("idcategoria");
            
            var data= {
                id_categoria: id_categoria
                };
    
            $.getJSON('http://localhost:8080/proyectoV1/api/categoriasFiltrado',data, function(productos){
                console.log("FILTRADOS : "+productos);
                mostrarTodos(productos);
            
            });
        });


    });

   


}); //document.ready

    
