
    var infoProduct = {};
    var coments =[];



function imagenesProducto(array){

    let mostrarProducto = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        mostrarProducto += `
        <div class="carousel-item ${ i===0 ? "active" : ""}">
            <img src="${imageSrc}" class="d-block w-100 " alt="...">
        </div>
        `        
    }
    document.getElementById("imagenesDelProducto").innerHTML = mostrarProducto;
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
       
        if (resultObj.status === "ok")
        {
            infoProduct = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productMonedaHTML = document.getElementById("moneda");
            let productCantidadDeVendidosHTML = document.getElementById("vendidos");

            productNameHTML.innerHTML = infoProduct.name;
            productDescriptionHTML.innerHTML = infoProduct.description;
            productCostHTML.innerHTML = infoProduct.cost;
            productMonedaHTML.innerHTML = infoProduct.currency;
            productCantidadDeVendidosHTML.innerHTML = infoProduct.soldCount;
            
            imagenesProducto(infoProduct.images);

            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok"){
                    let products = resultObj.data;
            
                    let html ='';
                    infoProduct.relatedProducts.forEach(function(listadoDeProductos) {
                        let productRP = products[listadoDeProductos];
                        html += ` 
                        <div class="col-4">
                        <div class="card" style="width: 18rem;">
                        <img href="#" class="card-img-top" src="${productRP.imgSrc}">
                        <div class="card-body">
                            <h5 class="card-title">${productRP.name}</h5>
                            <p class="card-text">${productRP.description}</p>
                            <a href="#" class="btn btn-primary">Ver producto</a>
                        </div>
                        </div>
                        </div>
                        `
                    document.getElementById("relaciona2").innerHTML = html;
                    })
            
                }
            });
            
        }
    });
});

function todosLosComentarios(array) {
    var contenedor = document.getElementById('coments')
    var contenido = ""
        
        for (var i = 0; i < array.length; i++) {
        var comentarios = array[i]; {

        contenido += ` <div class="card">
        <div class="card-header">
        <div class="d-flex w-100 justify-content-between">
        <h4 class="mb-1"><b>${comentarios.user}:</b></h4>
        <small class="text-muted">${comentarios.dateTime}</small>
    </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${comentarios.description}</h5>
          <div class="estrellitas">
          ${mostrarEstrellas(comentarios.score)}
          </div>
        </div>
      </div><br>
        `

    }
  }
  contenedor.innerHTML = contenido
}

function mostrarEstrellas(numero){

    let content = '';

    for(var i = 0; i < 5; i++){
        if(i < numero){
            content += '<i class="fas fa-star"></i>'
        }else{
            content += '<i class="far fa-star"></i>'
        }
    }

    return content;
}

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCT_INFO_COMMENTS_URL)
      .then(respuesta => respuesta.json())
      .then(data => {
        coments = data
        todosLosComentarios(coments)
      }
      )
      });


