var vCarrito;
var total;
$(document).ready(function () {
    vCarrito=JSON.parse(localStorage.getItem('carrito'));
    
    total=0;
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