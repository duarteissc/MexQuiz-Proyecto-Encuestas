
var myApp = angular.module('EncuestaApp', []);
var config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
};
myApp.controller('ControllerEncuesta', function ($scope, $http,$interval) {
    var idEncuesta = sessionStorage.getItem("IdEncuesta");
    
    Banners = function () {
        $http.get('api/load/Banners?id=' + idEncuesta)
            .then(function (response) {
                $.each(response.data, function (key, item) {

                    var li = document.createElement("li");
                    li.setAttribute("data-target", "#carouselExampleIndicators");
                    li.setAttribute("data-slide-to",key);
                    if (key == 0) {
                        li.setAttribute("class", "active");
                    }
                    var idli = document.getElementById('Menuli');
                    idli.append(li);


                    var div1 = document.createElement("div");
                    if (key == 0) {
                        div1.setAttribute("class", "carousel-item active");
                    }
                    else
                    {
                        div1.setAttribute("class", "carousel-item");
                    }
                    
                    div1.setAttribute("id", item.Id + "carousel-item active");
                    var iddiv1 = document.getElementById('MenuIMG');
                    iddiv1.append(div1);
                    var img = document.createElement("IMG");
                    img.setAttribute("class", "d-block w-100");
                    img.setAttribute("src", item.URL_Banner);
                    img.setAttribute("alt", item.Id +"Slide");
                    var idimg = document.getElementById(item.Id + "carousel-item active");
                    idimg.append(img);

                });
            })
            .catch(function (response) {
                alertify.set('notifier', 'position', 'top-right');
                if (response.status == "404") {
                    alertify.error('Banners no Encontrados');

                }
                else if (response.status == '500') {
                    alertify.error('Error del Servidor');
                }
                else if (response.status == '401') {
                    jwt();
                }
                else {
                    alertify.error(response.status);
                }
            });
    }
    Banners();
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
    Encuesta = function () {
        $http.get('api/load/EncuestabyId?id=' + idEncuesta)
            .then(function (response) {
                $.each(response.data, function (key, item) {

                    var h1 = document.createElement("h1");
                    h1.setAttribute("class", "card-title");
                    h1.textContent = item.Nombre;
                    var idh1 = document.getElementById("Encuestatitulo");
                    idh1.append(h1);
                    var p1 = document.createElement("p");
                    p1.setAttribute("class", "text-justify");
                    p1.textContent = item.Descripcion;
                    var idp1 = document.getElementById("EncuestaDescripcion");
                    idp1.append(p1);
                    var a1 = document.createElement("a");
                    a1.setAttribute("class", "btn btn-primary");
                    a1.textContent = "Consulta la Iniciativa  ";
                    a1.setAttribute("href", item.URL_Documento);
                    a1.setAttribute("id", item.Id + "dow");
                    var ida1 = document.getElementById("EncuestaDescripcion");
                    ida1.append(a1);
                    var span1 = document.createElement("span");
                    span1.setAttribute("class", "icon-file-pdf");
                    span1.setAttribute("style", "font-size:20px;padding: 10px;");
                    var idspan1 = document.getElementById(item.Id + "dow");
                    idspan1.append(span1);
                   //////////////////////////////////////AFAVOR
                    var a2 = document.createElement("button");
                    a2.setAttribute("class", "button");
                    a2.setAttribute("style", "vertical-align: middle");
                    ///a2.setAttribute("data-toggle", "modal");
                    ///a2.setAttribute("data-target", "#myModal");
                    a2.setAttribute("OnClick", "voto(1)");
                    
                    //a1.setAttribute("href","#");
                    a2.setAttribute("id", item.Id + "Afavor");
                    var ida2 = document.getElementById("EncuestaButtones");
                    ida2.append(a2);
                    var span2 = document.createElement("span");
                    span2.textContent = "A favor";
                    var idspan2 = document.getElementById(item.Id + "Afavor");
                    idspan2.append(span2);
                    
                    //////////////////////////////////////Encontra
                    var a3 = document.createElement("button");
                    a3.setAttribute("class", "button2");
                    a3.setAttribute("style", "vertical-align: middle");
                    //a3.setAttribute("data-toggle", "modal");
                    ///a3.setAttribute("data-target", "#myModal");
                    a3.setAttribute("OnClick", "voto(2)");
                    //a1.setAttribute("href","#");
                    a3.setAttribute("id", item.Id + "Encontra");
                    var ida3 = document.getElementById("EncuestaButtones");
                    ida3.append(a3);
                    var span3 = document.createElement("span");
                    span3.textContent = "En Contra";
                    var idspan3 = document.getElementById(item.Id + "Encontra");
                    idspan3.append(span3);
                    //////////////////////////////////////Nulo
                    var a4 = document.createElement("button");
                    a4.setAttribute("class", "button3");
                    a4.setAttribute("style", "vertical-align: middle");
                    //a4.setAttribute("data-toggle", "modal");
                    ///a4.setAttribute("data-target", "#myModal");
                    a4.setAttribute("OnClick", "voto(3)");
                    //a1.setAttribute("href","#");
                    a4.setAttribute("id", item.Id + "SinOpinion");
                    var ida4 = document.getElementById("EncuestaButtones");
                    ida4.append(a4);
                    var span4 = document.createElement("span");
                    span4.textContent = "Sin Opinion";
                    var idspan4 = document.getElementById(item.Id + "SinOpinion");
                    idspan4.append(span4);
                });
            })
            .catch(function (response) {
                alertify.set('notifier', 'position', 'top-right');
                if (response.status == "404") {
                    alertify.error('Encuesta no Encontrada');

                }
                else if (response.status == '500') {
                    alertify.error('Error del Servidor');
                }
                else if (response.status == '401') {
                    jwt();
                }
                else {
                    alertify.error(response.status);
                }
            });
    }
    Encuesta();
    $interval(function () {
        $http.get('api/load/rGraficasbyidEncuestas?id=' + idEncuesta)
            .then(function (response) {
                var Total = response.data[0].Total;
                var Afavor = response.data[0].Afavor;
                var Encontra = response.data[0].Encontra;
                var Nulo = response.data[0].Nulo;
                google.charts.load("current", { packages: ["corechart"] });
                google.charts.setOnLoadCallback(drawChart);
                function drawChart() {
                    var data = google.visualization.arrayToDataTable([
                        ['Opinion', 'Resultados'],
                        ['A Favor',((Afavor*100)/Total)],
                        ['En Contra',((Encontra*100) /Total)],
                        ['Sin Opinion',((Nulo*100 )/Total)]
                    ]);

                    var options = {
                        title: 'Resultados de Esta Encuesta',
                        pieHole: 0.4,
                    };

                    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                    chart.draw(data, options);
                }



            })
            .catch(function (response) {
                alertify.set('notifier', 'position', 'top-right');
                if (response.status == "404") {
                    alertify.error('Chats error');

                }
                else if (response.status == '500') {
                    alertify.error('Error del Servidor');
                }
                else if (response.status == '401') {
                    jwt();
                }
                else {
                    alertify.error(response.status);
                }
            });
    }, 1500);
    $interval(function () {
        $http.get('api/load/S_AEN_H_M_XC?id=' + idEncuesta)
            .then(function (response) {
                var TotalH = response.data[0].Total;
                var TotalM = response.data[1].Total;
                var AfavorH = response.data[0].Afavor;
                var AfavorM = response.data[1].Afavor;
                var EncontraH = response.data[0].Encontra;
                var EncontraM = response.data[1].Encontra;
                var NuloH = response.data[0].Nulo;
                var NuloM = response.data[1].Nulo;

                google.charts.load('current', { 'packages': ['bar'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable([
                        ['Opiniones', 'H', 'M'],
                        ['A favor', AfavorH, AfavorM],
                        ['En Contra', EncontraH, EncontraM],
                        ['Sin Opinion',NuloH,NuloM]
                    ]);

                    var options = {
                        chart: {
                            title: 'Cantidad de Opiniones por Hombres y Mujeres',
                            subtitle: 'México,2018',
                        }
                    };

                    var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

                    chart.draw(data, google.charts.Bar.convertOptions(options));
                }



            })
            .catch(function (response) {
                alertify.set('notifier', 'position', 'top-right');
                if (response.status == "404") {
                    alertify.error('Chats error');

                }
                else if (response.status == '500') {
                    alertify.error('Error del Servidor');
                }
                else if (response.status == '401') {
                    jwt();
                }
                else {
                    alertify.error(response.status);
                }
            });
    }, 30000);

    /*
    Noticias = function () {
        $http.get('api/load/Noticias?tipo=' + idTipo)
            .then(function (response) {
                $.each(response.data, function (key, item) {
                    var div1 = document.createElement("div");
                    div1.setAttribute("class", "mt-4 card");
                    div1.setAttribute("id", item.Id + "cardnew");
                    var iddiv1 = document.getElementById('Noticias');
                    iddiv1.append(div1);
                    ////header
                    var div2 = document.createElement("div");
                    div2.setAttribute("class", "card-header");
                    div2.setAttribute("id", item.Id + "card-headernew");
                    var iddiv2 = document.getElementById(item.Id + "cardnew");
                    iddiv2.append(div2);

                    var p1 = document.createElement("p");
                    p1.setAttribute("class", "w-100 float-left text-left");
                    //p1.setAttribute("style", "color: #cccccc;");
                    p1.setAttribute("id", item.Id + "headnew");
                    var idp1 = document.getElementById(item.Id + "card-headernew");
                    idp1.append(p1);

                    var span2 = document.createElement("span");
                    span2.setAttribute("class", "icon-newspaper");
                    span2.setAttribute("style", "font-size:20px;padding: 10px;");
                    var idspan2 = document.getElementById(item.Id + "headnew");
                    idspan2.append(span2);
                    var strong1 = document.createElement("strong");
                    strong1.textContent = "Header";
                    var idstrong1 = document.getElementById(item.Id + "headnew");
                    idstrong1.append(strong1);
                    ////Body
                    var div3 = document.createElement("div");
                    div3.setAttribute("class", "card-body");
                    div3.setAttribute("id", item.Id + "card-bodynew");
                    var iddiv3 = document.getElementById(item.Id + "cardnew");
                    iddiv3.append(div3);

                    var h4 = document.createElement("h4");
                    h4.setAttribute("class", "card-title col-lg-12");
                    h4.textContent = item.Nombre;
                    var idh4 = document.getElementById(item.Id + "card-bodynew");
                    idh4.append(h4);

                    var img = document.createElement("IMG");
                    img.setAttribute("class", "img-responsive col-lg-4 col-md-4 col-sm-12 ");
                    img.setAttribute("src", item.URL_Imagen);
                    img.setAttribute("style", "float:right; margin:10px;");
                    img.setAttribute("width", "200");
                    img.setAttribute("height", "200");
                    img.setAttribute("alt", "Noticia " + item.Id + " " + item.Nombre);
                    img.setAttribute("id", "imagen");
                    var idimg = document.getElementById(item.Id + "card-bodynew");
                    idimg.append(img);

                    var p2 = document.createElement("p");
                    p2.setAttribute("class", "mt-4 col-lg-8 col-md-8 col-sm-12 card-text");
                    p2.textContent = item.Descripcion;
                    var idp2 = document.getElementById(item.Id + "card-bodynew");
                    idp2.append(p2);



                    var a1 = document.createElement("a");
                    a1.setAttribute("class", "btn btn-primary ");
                    a1.textContent = "Consulta la Noticia  ";
                    a1.setAttribute("href", item.URL_Documento);
                    a1.setAttribute("id", item.Id + "docnew");
                    var ida1 = document.getElementById(item.Id + "card-bodynew");
                    ida1.append(a1);
                    var span1 = document.createElement("span");
                    span1.setAttribute("class", "icon-file-text");
                    span1.setAttribute("style", "font-size:20px;padding:10px;");
                    var idspan1 = document.getElementById(item.Id + "docnew");
                    idspan1.append(span1);

                    //////////////foooter
                    var div4 = document.createElement("div");
                    div4.setAttribute("class", "card-footer");
                    div4.setAttribute("id", item.Id + "card-footernew");
                    var iddiv4 = document.getElementById(item.Id + "cardnew");
                    iddiv4.append(div4);


                    var p1 = document.createElement("p");
                    p1.setAttribute("class", "p-1 mt-3 w-100 float-left text-left");
                    p1.setAttribute("style", "color: #cccccc;");
                    p1.setAttribute("id", item.Id + "foooternew");
                    var idp1 = document.getElementById(item.Id + "card-footernew");
                    idp1.append(p1);
                    var strong1 = document.createElement("strong");
                    strong1.textContent = "footer";
                    var idstrong1 = document.getElementById(item.Id + "foooternew");
                    idstrong1.append(strong1);

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
    Noticias();*/
}); 


function Categoria(id, Nombre) {
    ///alertify.error(id + 'Encuestas: ' + Nombre);
    sessionStorage.removeItem("IdCategoria");
    sessionStorage.setItem("IdCategoria", id);
    sessionStorage.removeItem("NombreEncuesta");
    sessionStorage.setItem("NombreEncuesta", Nombre);

}
function CerrarSesion() {

    window.location.href = "index.html";
    localStorage.removeItem("key");
};
function voto(voto) {
    var st = {};
    st.Voto = voto;
    st.Id = sessionStorage.getItem("IdEncuesta");
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
    
    st.UserName = dataJWT.unique_name;
    st.Contraseña =dataJWT.gender;
    
    $.ajax({
        type: 'POST',
        url: 'api/user/voto',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
           // alertify.set('notifier', 'position', 'top-right');
            //alertify.success('votogenereado');
            $("#myModal").modal("show");
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == "Not Found") {
                alertify.error('Encuesta no Encontrada');

            }
            else if (err == 'Internal Server Error') {
                alertify.error('Error del Servidor');
            }
            else if (err == 'Unauthorized') {
                jwt();
            }
            else {
                alertify.error("no tienes sesion:"+err);
            }
        }
    });

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
});