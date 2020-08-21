///BannerbyId
function BannersporId() {
    var id = $('#IdBannerBusqueda').val().trim();
    if (id != '') {
        $.ajax({
            type: 'POST',
            url: 'api/admin/BannerbyId?id=' + id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
            },
            success: function (data) {
                var idtbl = document.getElementById('BannersporId');
                var tam = idtbl.childElementCount

                if (tam > 0) {
                    idtbl.innerHTML = '';
                    $.each(data, function (key, item) {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", item.Id + "SearcheB");
                        var idtr = document.getElementById('BannersporId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = item.Id;
                        var idtd1 = document.getElementById(item.Id + "SearcheB");
                        idtd1.append(td1);
                        

                        var td2 = document.createElement("td");
                        td2.setAttribute("id", item.Id + "imgSearcheIMG");
                        var idtd2 = document.getElementById(item.Id + "SearcheB");
                        idtd2.append(td2);

                        var img = document.createElement("IMG");
                        img.setAttribute("src", item.URL_Banner);
                        img.setAttribute("width", "400px");
                        img.setAttribute("height", "100px");
                        img.setAttribute("alt",item.Id + "Banner");
                        var idimg = document.getElementById(item.Id + "imgSearcheIMG");
                        idimg.append(img);


                       
                    });
                }
                else {
                    $.each(data, function (key, item) {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", item.Id + "SearcheB");
                        var idtr = document.getElementById('BannersporId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = item.Id;
                        var idtd1 = document.getElementById(item.Id + "SearcheB");
                        idtd1.append(td1);


                        var td2 = document.createElement("td");
                        td2.setAttribute("id", item.Id + "imgSearcheIMG");
                        var idtd2 = document.getElementById(item.Id + "SearcheB");
                        idtd2.append(td2);

                        var img = document.createElement("IMG");
                        img.setAttribute("src", item.URL_Banner);
                        img.setAttribute("width", "400px");
                        img.setAttribute("height", "100px");
                        img.setAttribute("alt", item.Id + "Banner");
                        var idimg = document.getElementById(item.Id + "imgSearcheIMG");
                        idimg.append(img);



                    });
                }
            },
            error: function (jqXHR, textStatus, err) {
                alertify.set('notifier', 'position', 'top-right');
                if (err == "Not Found") {
                    alertify.error('Banners no Encontradas');
                }
                if (err == "Unauthorized") {
                    jwt();
                }
                else if (err == 'Internal Server Error') {
                    alertify.error('Error del Servidor');
                    /// jwt();
                }
                else {
                    var err = "";
                    var idtbl = document.getElementById('BannersporId');
                    var tam = idtbl.childElementCount
                    if (tam > 0) {
                        idtbl.innerHTML = '';
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", 0 + "SearcheB");
                        var idtr = document.getElementById('BannersporId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = err;
                        var idtd1 = document.getElementById(0 + "SearcheB");
                        idtd1.append(td1);


                        var td2 = document.createElement("td");
                        td2.textContent = err;
                        var idtd2 = document.getElementById(0 + "SearcheB");
                        idtd2.append(td2);
                    }
                    else {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", 0 + "SearcheB");
                        var idtr = document.getElementById('BannersporId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = err;
                        var idtd1 = document.getElementById(0 + "SearcheB");
                        idtd1.append(td1);


                        var td2 = document.createElement("td");
                        td2.textContent = err;
                        var idtd2 = document.getElementById(0 + "SearcheB");
                        idtd2.append(td2);
                    }
                }

            }
        });
    }
    else {
        var err = "";
        var idtbl = document.getElementById('BannersporId');
        var tam = idtbl.childElementCount
        if (tam > 0) {
            idtbl.innerHTML = '';
            var tr = document.createElement("tr");
            tr.setAttribute("id", 0 + "SearcheB");
            var idtr = document.getElementById('BannersporId');
            idtr.append(tr);

            var td1 = document.createElement("td");
            td1.textContent = err;
            var idtd1 = document.getElementById(0 + "SearcheB");
            idtd1.append(td1);


            var td2 = document.createElement("td");
            td2.textContent = err;
            var idtd2 = document.getElementById(0 + "SearcheB");
            idtd2.append(td2);

        }
        else {
            var tr = document.createElement("tr");
            tr.setAttribute("id", 0 + "SearcheB");
            var idtr = document.getElementById('BannersporId');
            idtr.append(tr);

            var td1 = document.createElement("td");
            td1.textContent = err;
            var idtd1 = document.getElementById(0 + "SearcheB");
            idtd1.append(td1);


            var td2 = document.createElement("td");
            td2.textContent = err;
            var idtd2 = document.getElementById(0 + "SearcheB");
            idtd2.append(td2);
        }
    }
}
///BannerbyIdEncuesta
function BannersporIdEncuesta() {
    var id = $('#IdBannerBusquedaEncuesta').val().trim();
    if (id != '') {
        $.ajax({
            type: 'POST',
            url: 'api/admin/BannerbyIdEncuesta?id=' + id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
            },
            success: function (data) {
                var idtbl = document.getElementById('BannersporIdEncuesta');
                var tam = idtbl.childElementCount

                if (tam > 0) {
                    idtbl.innerHTML = '';
                    $.each(data, function (key, item) {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", item.Id + "SearcheBEncuesta");
                        var idtr = document.getElementById('BannersporIdEncuesta');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = item.Id;
                        var idtd1 = document.getElementById(item.Id + "SearcheBEncuesta");
                        idtd1.append(td1);


                        var td2 = document.createElement("td");
                        td2.setAttribute("id", item.Id + "imgSearcheIMGEncuesta");
                        var idtd2 = document.getElementById(item.Id + "SearcheBEncuesta");
                        idtd2.append(td2);

                        var img = document.createElement("IMG");
                        img.setAttribute("src", item.URL_Banner);
                        img.setAttribute("width", "400px");
                        img.setAttribute("height", "100px");
                        img.setAttribute("alt", item.Id + "BannerEncuesta");
                        var idimg = document.getElementById(item.Id + "imgSearcheIMGEncuesta");
                        idimg.append(img);



                    });
                }
                else {
                    $.each(data, function (key, item) {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", item.Id + "SearcheBEncuesta");
                        var idtr = document.getElementById('BannersporIdEncuesta');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = item.Id;
                        var idtd1 = document.getElementById(item.Id + "SearcheBEncuesta");
                        idtd1.append(td1);


                        var td2 = document.createElement("td");
                        td2.setAttribute("id", item.Id + "imgSearcheIMGEncuesta");
                        var idtd2 = document.getElementById(item.Id + "SearcheBEncuesta");
                        idtd2.append(td2);

                        var img = document.createElement("IMG");
                        img.setAttribute("src", item.URL_Banner);
                        img.setAttribute("width", "400px");
                        img.setAttribute("height", "100px");
                        img.setAttribute("alt", item.Id + "BannerEncuesta");
                        var idimg = document.getElementById(item.Id + "imgSearcheIMGEncuesta");
                        idimg.append(img);



                    });
                }
            },
            error: function (jqXHR, textStatus, err) {
                alertify.set('notifier', 'position', 'top-right');
                if (err == "Not Found") {
                    alertify.error('Banners no Encontradas');
                }
                if (err == "Unauthorized") {
                    jwt();
                }
                else if (err == 'Internal Server Error') {
                    alertify.error('Error del Servidor');
                    /// jwt();
                }
                else {
                    var err = "";
                    var idtbl = document.getElementById('BannersporIdEncuesta');
                    var tam = idtbl.childElementCount
                    if (tam > 0) {
                        idtbl.innerHTML = '';
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", 0 + "SearcheBEncuesta");
                        var idtr = document.getElementById('BannersporIdEncuesta');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = err;
                        var idtd1 = document.getElementById(0 + "SearcheBEncuesta");
                        idtd1.append(td1);


                        var td2 = document.createElement("td");
                        td2.textContent = err;
                        var idtd2 = document.getElementById(0 + "SearcheBEncuesta");
                        idtd2.append(td2);
                    }
                    else {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", 0 + "SearcheBEncuesta");
                        var idtr = document.getElementById('BannersporIdEncuesta');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = err;
                        var idtd1 = document.getElementById(0 + "SearcheBEncuesta");
                        idtd1.append(td1);


                        var td2 = document.createElement("td");
                        td2.textContent = err;
                        var idtd2 = document.getElementById(0 + "SearcheBEncuesta");
                        idtd2.append(td2);
                    }
                }

            }
        });
    }
    else {
        var err = "";
        var idtbl = document.getElementById('BannersporIdEncuesta');
        var tam = idtbl.childElementCount
        if (tam > 0) {
            idtbl.innerHTML = '';
            var tr = document.createElement("tr");
            tr.setAttribute("id", 0 + "SearcheBEncuesta");
            var idtr = document.getElementById('BannersporIdEncuesta');
            idtr.append(tr);

            var td1 = document.createElement("td");
            td1.textContent = err;
            var idtd1 = document.getElementById(0 + "SearcheBEncuesta");
            idtd1.append(td1);


            var td2 = document.createElement("td");
            td2.textContent = err;
            var idtd2 = document.getElementById(0 + "SearcheBEncuesta");
            idtd2.append(td2);

        }
        else {
            var tr = document.createElement("tr");
            tr.setAttribute("id", 0 + "SearcheBEncuesta");
            var idtr = document.getElementById('BannersporIdEncuesta');
            idtr.append(tr);

            var td1 = document.createElement("td");
            td1.textContent = err;
            var idtd1 = document.getElementById(0 + "SearcheBEncuesta");
            idtd1.append(td1);


            var td2 = document.createElement("td");
            td2.textContent = err;
            var idtd2 = document.getElementById(0 + "SearcheBEncuesta");
            idtd2.append(td2);
        }
    }
}
///NuevosBanners
$('#btnNuevosBanners').click(function () {
    var id = $('#txtIdNuevoBanners').val().trim();
    var str1 = $('#txtURLBannerConsulta1').val().trim();
    var res1 = str1.replace("https://drive.google.com/file/d/", "");
    var idimg1= res1.replace("/view?usp=sharing", "");
    var url1 = "https://drive.google.com/uc?export=download&confirm=no_antivirus&id=" + idimg1;
    

    if (id != '' && url1 != '' ) {

        NuevosBanners(id, url1);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para agregar los banners');
    }
});
function NuevosBanners(id, url1) {
    ////var b = [{ Id: id,URL_Banner: url1 }, { Id: id,URL_Banner: url2 }, {Id: id,URL_Banner: url3 }];
    var st = {};
    st.Id = id;
    st.URL_Banner = url1;
    $.ajax({
        type: 'POST',
        url: 'api/admin/NuevosBanners',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('URL del Documento de Encuesta Actualizada');
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == 'Internal Server Error') {
                alertify.error('Error del servidor');
            }
            if (err == "Not Found") {
                alertify.error('Metodo no Encontrado');
            }
        }
    });
}
///ActualizarURLBanner
$('#btnActualizarURLBanner').click(function () {
    var id = $('#txtIdActualizarBanner').val().trim();
    var str1 = $('#txtURLBannerActualizar').val().trim();
    var res1 = str1.replace("https://drive.google.com/file/d/", "");
    var idimg1 = res1.replace("/view?usp=sharing", "");
    var url = "https://drive.google.com/uc?export=download&confirm=no_antivirus&id=" + idimg1;
    if (id != '' && url != '') {
        ActualizarURLBanner(id, url);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para editar la URL del Baner de la Encuesta');
    }
});
function ActualizarURLBanner(id, url) {
    var st = {};
    st.Id = id;
    st.URL_Banner = url;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/ActualizarURLBanner',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('URL del Banner de Encuesta Actualizada');
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == 'Internal Server Error') {
                alertify.error('Error del servidor');
            }
            if (err == "Not Found") {
                alertify.error('Metodo no Encontrado');
            }
        }
    });
}
//BorrarBanner
$('#btnBorrarBanner').click(function () {
    var id = $('#txtIdBorrarBanner').val().trim();
    if (id != '') {

        BorrarBanner(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Id para Borrar el Banner');
    }
});
function BorrarBanner(id) {
    var user = {};
    user.Id = id;
    $.ajax({
        type: 'Delete',
        url: 'api/admin/BorrarBanner',
        data: user,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Banner eliminada');
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == 'Internal Server Error') {
                alertify.error('Error del servidor');
            }
            if (err == "Not Found") {
                alertify.error('Metodo no Encontrado');
            }
        }
    });

}