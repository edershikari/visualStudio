$(document).ready(function () {
    var vCarrito=JSON.parse(localStorage.getItem('carrito'));

   
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
        htmlCode += '<td>'+vCarrito[i].quantity+'</td>';
        htmlCode += '<td>'+vCarrito[i].precio+'</td>';
        htmlCode += '</tr>';
      
        
    }
    htmlCode += '</tbody>';
    htmlCode += '</table>';
    $('#carrito').html(htmlCode);   

});