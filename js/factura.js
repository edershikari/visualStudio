var vCarrito;
var TotalCarrito;
var total;
$(document).ready(function () {
    vCarrito=JSON.parse(localStorage.getItem('carrito'));
    TotalCarrito=JSON.parse(localStorage.getItem('TotalCarrito'));
    var htmlCode;



    for (let i = 0; i < vCarrito.length; i++) {
      
        htmlCode += '<p><img src="'+vCarrito[i].imagen+'" style="width:75px"/><span class="quantity">'+vCarrito[i].cantidad+'</span><span class="price">'+vCarrito[i].precio+'€</span></p>';
    }
    Totales();
    $('.CarritoFactura').html(htmlCode);   
    // var contar= contador();
    $('.contador').html(vCarrito.length);
    // var contador=0;

    // function contador(){
    //     for (let i = 0; i < vCarrito.length; i++) {
            
    //         contador= vCarrito[i].cantidad+contador;
    //     } 
    // }

    function Totales(){
        $.getJSON('http://localhost:8080/proyectoV1/api/productos', function (productos) {
            var total=encontrarTotal(productos);
            $('.precioTotal').html(total+"€");  
            localStorage.setItem('TotalCarrito', JSON.stringify(total));
        }); 
        // total= encontrarTotal();
        function encontrarTotal(productos){
            var total=0;
            for (let i = 0; i < vCarrito.length; i++) {
                var found=false; 
                for (let index = 0; index < productos.length; index++) {
                        const producto = productos[index];
                        
                        if(productos[index].id_producto == vCarrito[i].id_producto && found == false){
                         console.log(producto);
                        var precio= productos[index].precio;
                        total=total+(precio*vCarrito[i].cantidad);
                        found==true;
                    }
                } 
            }
            return total;
        }
    }
    

    
    $("#submit").click(function () {

        //alert( "Handler for .click() called." );
        var nombre = $(this).val("nombre");
        var apellido = $(this).val("apellido");
        var dni = $(this).val("dni");
        var correo = $(this).val("correo");
        var telefono = $(this).val("telefono");
        var num_tarjeta = $(this).val("num_tarjeta");

        var data = {
            carrito : localStorage.getItem("carrito"),
            nombre : nombre,
            apellido : apellido,
            dni : dni,
            correo : correo,
            telefono : telefono,
            num_tarjeta : num_tarjeta,
            total_factura : localStorage.getItem("TotalCarrito")
        };

        $.getJSON('http://localhost:8080/proyectoV1/RellenarFactura', data, function (factura) {
          console.log(factura);

        });
    });

});