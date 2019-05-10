$(document).ready(function(){

        
    var htmlCode = "";

    htmlCode += '';
    htmlCode += '<img src="ButtCapper_Banner2.gif">';
    htmlCode += '<button class="btn">Carrito</button>';

    $('#cabecera').html(htmlCode);



    $.getJSON('http://localhost:8080/TrabajoFinal/api/productos', function(productos){
        console.log(productos);
       

        var htmlCode = "";

        htmlCode += '';
        

        for (let index = 0; index < productos.length; index++) {
            const producto = productos[index];
            console.log(producto.nombre);
            htmlCode += '<div class="p-2 w-25"  style="border:solid 2px black" align="center">';
            htmlCode += '<img src="'+producto.imagen+'" data-id_producto="'+producto.id_producto+'" style="max-width:100px">';
            htmlCode += '<div id="info">';
            htmlCode += '<p> '+producto.nombre+'</p>';
            htmlCode += '<p> '+producto.precio+'€</p>';
            htmlCode += '<button type="button" class="btn btn-dark">añadir a la cesta</button>';
            htmlCode += '</div>';
            htmlCode += '</div>';

            
        }
     $('#productos').html(htmlCode);

            // /////////////////


            //cuando se click una img se esconda todo y solo aparezcan los datos del producto
            $('#productos img').on("click", function(){
                    
                //Cojer el id
                var id = $(this).data('id_producto'); //data: 

                //Buscar el producto en el array
                var productoSeleccionado = buscarProducto(id);

                //rellenar el card 
                 rellenarElCard(productoSeleccionado);
                 $('#cabecera').hide();
                 $('#categorias').hide();
                 $('#productos').hide();
            });

            function buscarProducto(id){
                for (let index = 0; index < productos.length; index++) {
                    const producto = productos[index];
                    
                    if (id == producto.id_producto) {
                        return producto;
                    }
                }
            }
            function rellenarElCard(productoSeleccionado){
                // function rellenarElCard(productoSeleccionado){
                //     var htmlCode="";
                //     htmlCode += '<h3> '+producto.nombre+'</h3>';
                //     htmlCode += '<p> '+producto.descripcion+'€</p>';
                //     htmlCode += '<img src="'+productoSeleccionado.imagen+' style="width:200px;"/>';
                
                //     $('#producto-card').html(htmlCode);
                $('#producto-card h3').html(productoSeleccionado.nombre);
                $('#producto-card p').html(productoSeleccionado.descripcion);
                $('#producto-card img').attr('src',productoSeleccionado.imagen);
                $('#producto-card img').attr('style','width:200px;');

            }


            ///////////////////

    });



    $.getJSON('http://localhost:8080/TrabajoFinal/api/categorias', function(categorias){
        console.log(categorias);
       

        var htmlCode = "";

        htmlCode += '';
        

        for (let index = 0; index < categorias.length; index++) {
            const categoria = categorias[index];
            console.log(categoria.nombre);
            htmlCode += '<div id="categoria' +categoria.id_categoria+ '" data-idCategoria="'+categoria.id_categoria+'" class="categoria" style="border:solid 2px black" >';
            htmlCode += '<p> '+categoria.nombre+'</p>';
            htmlCode += '</div>';

            
        }
     $('#categorias').html(htmlCode);

        //anadir evento a categoria

        

    });


        


});