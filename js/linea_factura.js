var vCarrito;
var TotalCarrito;
var total;
$(document).ready(function () {
    vCarrito=JSON.parse(localStorage.getItem('carrito'));
    TotalCarrito=JSON.parse(localStorage.getItem('TotalCarrito'));

    var htmlCode;
    
    // for (let i = 0; i < vCarrito.length; i++) {
      
    // }

    total=0;
    var htmlCode;
    
    numeroFactura=JSON.parse(localStorage.getItem('numeroFactura')); 
    $('#numero_factura').html(numeroFactura);  


    for (let i = 0; i < vCarrito.length; i++) {
      
        htmlCode += '<tr>';
        htmlCode += '<th scope="row"><img src="'+vCarrito[i].imagen+'" style="max-width:100px"/></th>';
        htmlCode += '<td>'+vCarrito[i].nombre+'</td>';
        htmlCode += '<td><input type="button" class="mascantidad" data-id="'+vCarrito[i].id_producto+'" data-cantidad="'+vCarrito[i].cantidad+'" data-nombre="'+vCarrito[i].nombre+'" value="+" ><span class="cantidad">'+vCarrito[i].cantidad+'</span>  <input type="button" class="menoscantidad" data-id="'+vCarrito[i].id_producto+'" data-cantidad="'+vCarrito[i].cantidad+'" data-nombre="'+vCarrito[i].nombre+'" value="-"></td>';
        htmlCode += '<td><span class="precio">'+vCarrito[i].precio+'</span>€</td>';
        htmlCode += '</tr>';
    }
    htmlCode += '</tbody>';
    htmlCode += '</table>';

    Totales();


    function Totales(){
        $.getJSON('http://localhost:8080/proyectoV1/api/productos', function (productos) {
            var total=encontrarTotal(productos);
            $('#subtotal').html(TotalCarrito+"€");  
    
        }); 
        // total= encontrarTotal();
        localStorage.setItem('TotalCarrito', JSON.stringify(total));
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



});