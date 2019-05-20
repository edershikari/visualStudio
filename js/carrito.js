var vCarrito;
var total;
$(document).ready(function () {
    vCarrito=JSON.parse(localStorage.getItem('carrito'));
    
    total=0;
    var htmlCode;
    htmlCode += '<table class="table table-hover">';
    htmlCode += '<thead>';
    htmlCode += '<tr>';
    htmlCode += '<th scope="col">Imagen</th>';
    htmlCode += '<th scope="col">Nombre</th>';
    htmlCode += '<th scope="col">Cantidad</th>';
    htmlCode += '<th scope="col">Precio/Unidad</th>';
    htmlCode += '</tr>';
    htmlCode += '</thead>';
    htmlCode += '<tbody>';

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

    $('#carrito').html(htmlCode);   

    function Totales(){
    $.getJSON('http://localhost:8080/proyectoV1/api/productos', function (productos) {
        var total=encontrarTotal(productos);
        $('#TotalCarrito').html(total+"€");  

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
    $('.mascantidad').click(function () {
        var id = $(this).data('id');
        console.log($(this).data());
        for(i in vCarrito){
            
           if (id ==  vCarrito[i].id_producto){
            vCarrito[i].cantidad =  vCarrito[i].cantidad + 1; 
            
            $(this).siblings('.cantidad').html(vCarrito[i].cantidad);
            localStorage.setItem('carrito', JSON.stringify(vCarrito));
            Totales();
           
           }
        }
       // console.log($(this).data());
    });

    
    $('.menoscantidad').click(function () {
        var id = $(this).data('id');
        console.log($(this).data());
        for(i in vCarrito){
           if (id ==  vCarrito[i].id_producto){
               if(vCarrito[i].cantidad>1){
                    vCarrito[i].cantidad =  vCarrito[i].cantidad - 1; 
                    $(this).siblings('.cantidad').html(vCarrito[i].cantidad);
                    localStorage.setItem('carrito', JSON.stringify(vCarrito));
                    Totales();
               }
               else{
                   alert("No se puede reducir la cantidad de este producto a comprar...");
               }
        }
        } 
    });

});