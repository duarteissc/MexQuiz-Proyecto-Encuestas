

var myApp = angular.module('myApp', []);
var config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
};
myApp.controller('myController', function ($scope, $http) {
    var idTipo = sessionStorage.getItem("IdCategoria");
    if (JSON.stringify(idTipo) == "null") {
        idTipo = 1;   
    }
    Categorias = function () {
        $http.get('localhost:8081/api/categorias')
            .then(function (response) {
                $.each(response.data, function (key, item) {

                    var x = document.createElement("a");
                    x.setAttribute("class", "dropdown-item");
                    x.setAttribute("href", "index.html");
                    x.setAttribute("OnClick", "Categoria(" + item.Id + "," + JSON.stringify(item.Nombre) + ")");
                    x.textContent = item.Nombre;
                    x.setAttribute("id", item.Id);

                    var id = document.getElementById('Menu');
                    id.append(x);
                });
            })
            .catch(function (response) {
                alertify.set('notifier', 'position', 'top-right');
                if (response.status == "404") {
                    alertify.error('Categorias no Encontradas');
                }
                else if (response.status == '500') {
                    alertify.error('Error del Servidor');
                }
                else {
                    alertify.error(response.status);
                }
            });
    }
    Categorias();
    Encuestas = function () {
        $http.get('api/load/Encuestas?tipo='+idTipo)
            .then(function (response) {
                $.each(response.data, function (key, item) {
                    /*
                    if(key>1){
                        var div1 = document.createElement("div");
                        div1.setAttribute("class", "col-12 col-md-6 col-lg-6 mt-3 mb-3");
                        div1.setAttribute("id", item.Id + "col-12 col-md-6 col-lg-6 mt-3 mb-3");
                        var iddiv1 = document.getElementById('Encuestas1');
                        iddiv1.append(div1);

                        var div2 = document.createElement("div");
                        div2.setAttribute("class", "media mt-3 border border-dark mb-3 rounded");
                        div2.setAttribute("id", item.Id + "media mt-3 border border-dark mb-3 rounded");
                        var iddiv2 = document.getElementById(item.Id + "col-12 col-md-6 col-lg-6 mt-3 mb-3");
                        iddiv2.append(div2);

                        var img = document.createElement("IMG");
                        img.setAttribute("class", "ml-3 align-self-center mr-2 desvanecer ");
                        img.setAttribute("src", item.URL_Imagen);
                        img.setAttribute("height", "200");
                        img.setAttribute("width", "200");
                        img.setAttribute("alt", "Encuesta " + item.Id + " " + item.Nombre);
                        var idimg = document.getElementById(item.Id + "media mt-3 border border-dark mb-3 rounded");
                        idimg.append(img);

                        var div3 = document.createElement("div");
                        div3.setAttribute("class", "media-body ml-2");
                        div3.setAttribute("id", item.Id + "media-body ml-2");
                        var iddiv3 = document.getElementById(item.Id + "media mt-3 border border-dark mb-3 rounded");
                        iddiv3.append(div3);
                        var h5 = document.createElement("h5");
                        h5.setAttribute("class", "mt-0 mb-1 text-justify");
                        h5.setAttribute("style", "font-family:verdana;");
                        h5.textContent = item.Nombre;
                        var idh5 = document.getElementById(item.Id + "media-body ml-2");
                        idh5.append(h5);

                        var p2 = document.createElement("p");
                        p2.setAttribute("class", "text-justify p-2 ");
                        p2.textContent = item.Descripcion;
                        var idp2 = document.getElementById(item.Id + "media-body ml-2");
                        idp2.append(p2);

                        var a1 = document.createElement("a");
                        a1.setAttribute("class", "btn btn-primary");
                        a1.textContent = "Consulta la Iniciativa  ";
                        a1.setAttribute("href", item.URL_Documento);
                        a1.setAttribute("id", item.Id + "dow");
                        var ida1 = document.getElementById(item.Id + "media-body ml-2");
                        ida1.append(a1);
                        var span1 = document.createElement("span");
                        span1.setAttribute("class", "icon-file-pdf");
                        span1.setAttribute("style", "font-size:20px;padding: 10px;");
                        var idspan1 = document.getElementById(item.Id + "dow");
                        idspan1.append(span1);
                        ///icon-file-text
                        var a2 = document.createElement("a");
                        a2.setAttribute("class", "m-1 btn btn-primary");
                        a2.setAttribute("OnClick", "Contestar(" + item.Id + ")");
                        a2.textContent = "Responder Encuesta  ";
                        ///a2.setAttribute("href","");
                        a2.setAttribute("id", item.Id + "vot");
                        var ida2 = document.getElementById(item.Id + "media-body ml-2");
                        ida2.append(a2);
                        var span2 = document.createElement("span");
                        span2.setAttribute("class", "icon-pencil2");
                        span2.setAttribute("style", "font-size:20px;padding: 10px;");
                        var idspan2 = document.getElementById(item.Id + "vot");
                        idspan2.append(span2);

                    } else
                    {
                     }
                        */
                        var div1 = document.createElement("div");
                        div1.setAttribute("class", "media mt-3 border border-dark rounded");
                        div1.setAttribute("id", item.Id + "media mt-3 border border-dark rounded");
                        var iddiv1 = document.getElementById('Encuestas');
                        iddiv1.append(div1);

                        var div2 = document.createElement("div");
                        div2.setAttribute("class", "media-body ml-2");
                        div2.setAttribute("id", item.Id + "media-body ml-2");
                        var iddiv2 = document.getElementById(item.Id + "media mt-3 border border-dark rounded");
                        iddiv2.append(div2);
                        var h5 = document.createElement("h5");
                        h5.setAttribute("class", "mt-0 mb-1 text-justify");
                        h5.setAttribute("style", "font-family:verdana;");
                        h5.textContent = item.Nombre;
                        var idh5 = document.getElementById(item.Id + "media-body ml-2");
                        idh5.append(h5);

                        var p2 = document.createElement("p");
                        p2.setAttribute("class", "text-justify ");
                        p2.textContent = item.Descripcion;
                        var idp2 = document.getElementById(item.Id + "media-body ml-2");
                        idp2.append(p2);

                        var a1 = document.createElement("a");
                        a1.setAttribute("class", "btn btn-primary");
                        a1.textContent = "Consulta la Iniciativa  ";
                        a1.setAttribute("href", item.URL_Documento);
                        a1.setAttribute("id", item.Id + "dow");
                        var ida1 = document.getElementById(item.Id + "media-body ml-2");
                        ida1.append(a1);
                        var span1 = document.createElement("span");
                        span1.setAttribute("class", "icon-file-pdf");
                        span1.setAttribute("style", "font-size:20px;padding: 10px;");
                        var idspan1 = document.getElementById(item.Id + "dow");
                        idspan1.append(span1);
                        ///icon-file-text
                        var a2 = document.createElement("a");
                    a2.setAttribute("class", "m-1 btn btn-primary  mb-3");
                        a2.setAttribute("OnClick", "Contestar(" + item.Id + ")");
                        a2.textContent = "Responder Consulta  ";
                        ///a2.setAttribute("href","");
                        a2.setAttribute("id", item.Id + "vot");
                        var ida2 = document.getElementById(item.Id + "media-body ml-2");
                        ida2.append(a2);
                        var span2 = document.createElement("span");
                        span2.setAttribute("class", "icon-pencil2");
                        span2.setAttribute("style", "font-size:20px;padding: 10px;");
                        var idspan2 = document.getElementById(item.Id + "vot");
                        idspan2.append(span2);
                  

                        var img = document.createElement("IMG");
                        img.setAttribute("class", "ml-3 align-self-center mr-2 desvanecer");
                        img.setAttribute("src", item.URL_Imagen);
                        img.setAttribute("height", "100");
                        img.setAttribute("width", "100");
                        img.setAttribute("alt", "Encuesta " + item.Id + " " + item.Nombre);
                        var idimg = document.getElementById(item.Id + "media mt-3 border border-dark rounded");
                        idimg.append(img);

                   
                    
                    
                });
            })
            .catch(function (response) {
                alertify.set('notifier', 'position', 'top-right');
                if (response.status == "404") {
                    sessionStorage.removeItem("IdCategoria");
                    sessionStorage.removeItem("NombreEncuesta");
                    window.location.href = " 404.html";

                    //no va//alertify.error('Encuestas no Encontradas');

                }
                else if (response.status == '500') {
                    alertify.error('Error del Servidor' );
                }
                else {
                    alertify.error(response.status);
                }
            });
    }
    Encuestas();
    /*
    Noticias = function () {
        $http.get('api/load/Noticias?tipo=' + idTipo)
            .then(function (response) {
                $.each(response.data, function (key, item) {
                    var div1 = document.createElement("div");
                    div1.setAttribute("class", "col 12 col-md-4 col-lg-2 mt-3");
                    div1.setAttribute("id", item.Id + "cardnew");
                    var iddiv1 = document.getElementById('Noticias');
                    iddiv1.append(div1);

                    var img = document.createElement("IMG");
                    img.setAttribute("class", "center desvanecer ");
                    img.setAttribute("src", item.URL_Imagen);
                    img.setAttribute("width", "100");
                    img.setAttribute("height", "100");
                    img.setAttribute("alt", "Noticia " + item.Id + " " + item.Nombre);
                    var idimg = document.getElementById(item.Id + "cardnew");
                    idimg.append(img);
                    var h4 = document.createElement("h5");
                    h4.setAttribute("class", "mt-0 mb-1 ");
                    h4.setAttribute("style", "font-family:verdana;");
                    h4.textContent = item.Nombre;
                    var idh4 = document.getElementById(item.Id + "cardnew");
                    idh4.append(h4);
                    
                    var p1 = document.createElement("p");
                    p1.setAttribute("class", "text-left mt-1");
                    p1.setAttribute("id", item.Id+"text-left mt-1 descripcion");
                    var idp1 = document.getElementById(item.Id + "cardnew");
                    idp1.append(p1);

                    ////header
                    var small = document.createElement("small");
                    small.textContent = item.Descripcion;
                    var idsmall = document.getElementById(item.Id + "text-left mt-1 descripcion");
                    idsmall.append(small);
                    
                    var a1 = document.createElement("a");
                    a1.setAttribute("class", "btn btn-primary ");
                    a1.textContent = "Consulta la Noticia  ";
                    a1.setAttribute("href", item.URL_Documento);
                    a1.setAttribute("id", item.Id + "docnew");
                    var ida1 = document.getElementById(item.Id + "cardnew");
                    ida1.append(a1);
                    var span1 = document.createElement("span");
                    span1.setAttribute("class", "icon-file-text");
                   // span1.setAttribute("style", "font-size:20px;padding:10px;");
                    var idspan1 = document.getElementById(item.Id + "docnew");
                    idspan1.append(span1);
                    

                });

                //$scope.jsondata = response.data;
            })
            .catch(function (response) {
                alertify.set('notifier', 'position', 'top-right');
                if (response.status == "404") {
                    //nova//alertify.error('Noticias no Encontradas' );
                    sessionStorage.removeItem("IdCategoria");
                    sessionStorage.removeItem("NombreEncuesta");
                    window.location.href = " 404.html";
                }
                else if (response.status == '500') {
                    alertify.error('Error del Servidor');
                }
                else {
                    alertify.error(response.status);
                }
            });
    }
    Noticias();
    */
}); 




function Contestar(id) {
    ///alertify.success('Encuesta '+id);
    alertify.set('notifier', 'position', 'top-right');
    var key = localStorage.getItem("key");
    if (JSON.stringify(key) == "null")
    {
        key = 0;
        window.location.href = "login.html";
    }
    if (key != 0) {

        sessionStorage.removeItem("IdEncuesta");
        sessionStorage.setItem("IdEncuesta", id);
        window.location.href = "consulta.html";

    }
    
}
function Categoria(id, Nombre) {
    ///alertify.error(id + 'Encuestas: ' + Nombre);
    sessionStorage.removeItem("IdCategoria");
    sessionStorage.setItem("IdCategoria", id);
    sessionStorage.removeItem("NombreEncuesta");
    sessionStorage.setItem("NombreEncuesta", Nombre);
    
}



$(document).ready(function () {
    var clave = localStorage.getItem("key");;
    if (JSON.stringify(clave) != "null") {
        ///////////////////////////////////////////////////////// La clave existe.
        document.getElementById("login").style.display = "none";
        //document.getElementById("Registrar").style.display = "none";
        document.getElementById("btnLoginOut").style.visibility = "visible";
        
        var token = localStorage.getItem("key");
        // Get Token Header
        const base64HeaderUrl = token.split('.')[0];
        const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
        const headerData = JSON.parse(window.atob(base64Header));
        // Get Token payload and date's
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const dataJWT = JSON.parse(window.atob(base64));
        dataJWT.header = headerData;

        var role = dataJWT.role;
        if (role != 0) {
            document.getElementById("Administrador").style.visibility = "visible";
        }
        else {
            document.getElementById("Administrador").style.display = "none";
        }

    }
    else {
        // La clave no existe.

        document.getElementById("btnLoginOut").style.display = "none";
        document.getElementById("login").style.visibility = "visible";
        document.getElementById("Administrador").style.display = "none";
        ///document.getElementById("Registrar").style.visibility = "visible";

    }
    var nametitle = sessionStorage.getItem("NombreEncuesta");
    if (JSON.stringify(nametitle) == "null") {

        window.document.title = "MexQuiz | Politica";
    }
    if (JSON.stringify(nametitle) != "null") {
        window.document.title = "MexQuiz | " + nametitle;

    }
});

function CerrarSesion() {

    localStorage.removeItem("key");
};

/*
$(document).ready(function () {
            $.ajax({
                type: 'GET',
                url: 'api/load/Categorias',
                success: function (data) {
                   $.each(data, function (key, item) {

                var x = document.createElement("a");
                x.setAttribute("class", "dropdown-item");
                x.setAttribute("href", "#");
                x.textContent = item.Nombre;
                x.setAttribute("id", item.Id);

                var id = document.getElementById('Medios');
                id.append(x);
            });
                    
                },
                error: function (jqXHR, textStatus, err) {
                    if (err == "Unauthorized") {
                        
                    }
                    else if (err == 'Internal Server Error') {
                        
                    }
                    else {
                        
                    }

                }
            });

});

*/







/*
var encuesta = angular.module('myApp', []);
encuesta.controller('myController', function ($scope, $http) {
    $http.get('api/load/Categorias')
        .then(function (response) {
            /*var div = document.createElement("div");
            div.setAttribute("class","dropdown");
            div.setAttribute("id","contenido");
            var iddiv = document.getElementById('Medios');
            iddiv.append(div);


            var div1 = document.createElement("button");
            div1.setAttribute("class","btn btn-secondary btn-sm dropdown-toggle"); 
            div1.setAttribute("type", "button");
            div1.textContent = "Menu";
            div1.setAttribute("id", "button");
            div1.setAttribute("data-toggle", "dropdown");
            div1.setAttribute("aria-haspopup", "true");
            div1.setAttribute("aria-expanded", "false");
            var iddiv1 = document.getElementById('contenido');
            iddiv1.append(div1);

            var div2 = document.createElement("div");
            div2.setAttribute("class", "dropdown-menu");
            div2.setAttribute("aria-labelledby", "button");
            div2.setAttribute("id", "Menu");
            var iddiv2 = document.getElementById('contenido');
            iddiv2.append(div2);
           */
/*
$.each(response.data, function (key, item) {

    var x = document.createElement("a");
    x.setAttribute("class", "dropdown-item");
    x.setAttribute("href", "#");
    x.textContent = item.Nombre;
    x.setAttribute("id", item.Id);
   
    var id = document.getElementById('Menu');
    id.append(x);
});

            //$scope.jsondata = response.data;
        }).catch (function (response) {
    if (response.status == "404") {
        alert(response.status);
    }
    else if (response.status == '500') {
        alert(response.status);
    }
    else {
        alert(response.status);
    }
}).finally(function () {
    console.log("Task Finished.");
});
    });
*/






/*$.each(response.data, function (key, item) {
            var x = document.createElement("DIV");
            x.setAttribute("Class", "conteiner");
            x.setAttribute("id", "Multimedia");

            var id = document.getElementById('Medios');
            var tam = id.childElementCount
            if (tam > 0) {
                var d = document.getElementById("Medios");
                var d_nested = document.getElementById("Multimedia");
                var throwawayNode = d.removeChild(d_nested);
                id.append(x);
            }
        });*/