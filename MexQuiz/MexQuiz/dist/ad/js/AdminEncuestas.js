$(document).ready(function () {
    /// Todas las Categorias
    $.ajax({
        type: 'GET',
        url: 'api/admin/Categorias',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            $.each(data, function (key, item) {
                var tr = document.createElement("tr");
                tr.setAttribute("id", item.Id);
                var idtr = document.getElementById('CategoriasEncuestas');
                idtr.append(tr);
            });
            $.each(data, function (key, item) {
                var td1 = document.createElement("td");
                td1.textContent = item.Id;
                var idtd1 = document.getElementById(item.Id);
                idtd1.append(td1);

                var td2 = document.createElement("td");
                td2.textContent = item.Nombre;
                var idtd2 = document.getElementById(item.Id);
                idtd2.append(td2);
            });
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == "Not Found") {
                alertify.error('Categorias no Encontrada');

            }
            else if (err == 'Internal Server Error') {
                alertify.error('Error del Servidor');
            }
            else if (err == 'Unauthorized') {
                jwt();
            }
            else {
                alertify.error( err);
            }
        }
    });
    //////////LLenar Opciones de Categorias Nueva Encuesta
    $.ajax({
        type: 'GET',
        url: 'api/admin/Categorias',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            $.each(data, function (key, item) {
                var x = document.createElement("option");
                x.setAttribute("Value", key);
                $(x).html(item.Nombre);
                $(x).appendTo('#MenuNuevaEncuesta');
            });
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == "Not Found") {
                alertify.error('Categorias no Encontrada');

            }
            else if (err == 'Internal Server Error') {
                alertify.error('Error del Servidor');
            }
            else if (err == 'Unauthorized') {
                jwt();
            }
            else {
                alertify.error( err);
            }
        }
    });
});
/// Encuestas x id
function EncuestasPrioridadbyTipo() {
    var tipo = $('#IdEncuestaPrioridadSearch').val().trim();
    if (tipo != '') {
        $.ajax({
            type: 'POST',
            url: 'api/admin/EncuestasPrioridadbyTipo?tipo=' + tipo,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
            },
            success: function (data) {
                var idtbl = document.getElementById('EncuestasPrioridadbyId');
                var tam = idtbl.childElementCount

                if (tam > 0) {
                    idtbl.innerHTML = '';
                    $.each(data, function (key, item) {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id",item.Id + "SearcheP");
                        var idtr = document.getElementById('EncuestasPrioridadbyId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = item.Id;
                        var idtd1 = document.getElementById(item.Id + "SearcheP");
                        idtd1.append(td1);

                        var td2 = document.createElement("td");
                        td2.textContent = item.Nombre;
                        var idtd2 = document.getElementById(item.Id + "SearcheP");
                        idtd2.append(td2);

                        var td3 = document.createElement("td");
                        td3.setAttribute("id",item.Id + "imgSearcheP");
                        var idtd3 = document.getElementById(item.Id + "SearcheP");
                        idtd3.append(td3);

                        var img = document.createElement("IMG");
                        img.setAttribute("src", item.URL_Imagen);
                        img.setAttribute("width", "50px");
                        img.setAttribute("height", "50px");
                        img.setAttribute("alt", "Encuesta " + item.Id + " " + item.Nombre);
                        var idimg = document.getElementById(item.Id + "imgSearcheP");
                        idimg.append(img);


                        var td4 = document.createElement("td");
                        td4.setAttribute("id", item.Id + "buttonSearcheP");
                        var idtd4 = document.getElementById(item.Id + "SearcheP");
                        idtd4.append(td4);

                        var a1 = document.createElement("a");
                        a1.setAttribute("class", "btn btn-primary col-lg-12 col-md-12 col-sm-12");
                        a1.textContent = "Iniciativa  ";
                        a1.setAttribute("href", item.URL_Documento);
                        a1.setAttribute("id", item.Id + "dow");
                        var ida1 = document.getElementById(item.Id + "buttonSearcheP");
                        ida1.append(a1);

                        var span1 = document.createElement("span");
                        span1.setAttribute("class", "icon-file-pdf");
                        span1.setAttribute("style", "font-size:20px;padding: 10px;");
                        var idspan1 = document.getElementById(item.Id + "dow");
                        idspan1.append(span1);

                        var a2 = document.createElement("button");
                        a2.setAttribute("class", "btn btn-primary col-md-12 col-sm-12 mt-1");
                        a2.textContent = "Descripcion  ";
                        a2.setAttribute("type", "button");
                        a2.setAttribute("OnClick", "CrearModal(" + JSON.stringify(item.Descripcion) + ")");
                        a2.setAttribute("data-toggle", "modal");
                        a2.setAttribute("data-target", "#exampleModalCenter");
                        a2.setAttribute("id", item.Id + "des");
                        var ida2 = document.getElementById(item.Id + "buttonSearcheP");
                        ida2.append(a2);
                        var span2 = document.createElement("span");
                        span2.setAttribute("class", "icon-file-text");
                        span2.setAttribute("style", "font-size:20px;padding: 10px;");
                        var idspan2 = document.getElementById(item.Id + "des");
                        idspan2.append(span2);
                    });
                }
                else {
                    $.each(data, function (key, item) {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", item.Id + "SearcheP");
                        var idtr = document.getElementById('EncuestasPrioridadbyId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = item.Id;
                        var idtd1 = document.getElementById(item.Id + "SearcheP");
                        idtd1.append(td1);

                        var td2 = document.createElement("td");
                        td2.textContent = item.Nombre;
                        var idtd2 = document.getElementById(item.Id + "SearcheP");
                        idtd2.append(td2);

                        var td3 = document.createElement("td");
                        td3.setAttribute("id", item.Id + "imgSearcheP");
                        var idtd3 = document.getElementById(item.Id + "SearcheP");
                        idtd3.append(td3);

                        var img = document.createElement("IMG");
                        img.setAttribute("src", item.URL_Imagen);
                        img.setAttribute("width","100px");
                        img.setAttribute("height", "100px");
                        img.setAttribute("alt", "Encuesta " + item.Id + " " + item.Nombre);
                        var idimg = document.getElementById(item.Id + "imgSearcheP");
                        idimg.append(img);


                        var td4 = document.createElement("td");
                        td4.setAttribute("id", item.Id + "buttonSearcheP");
                        var idtd4 = document.getElementById(item.Id + "SearcheP");
                        idtd4.append(td4);

                        var a1 = document.createElement("a");
                        a1.setAttribute("class", "btn btn-primary col-lg-12 col-md-12 col-sm-12");
                        a1.textContent = "Iniciativa  ";
                        a1.setAttribute("href", item.URL_Documento);
                        a1.setAttribute("id", item.Id + "dow");
                        var ida1 = document.getElementById(item.Id + "buttonSearcheP");
                        ida1.append(a1);

                        var span1 = document.createElement("span");
                        span1.setAttribute("class", "icon-file-pdf");
                        span1.setAttribute("style", "font-size:20px;padding: 10px;");
                        var idspan1 = document.getElementById(item.Id + "dow");
                        idspan1.append(span1);


                        var a2 = document.createElement("button");
                        a2.setAttribute("class", "btn btn-primary col-md-12 col-sm-12 mt-1");
                        a2.textContent = "Descripcion  ";
                        a2.setAttribute("type", "button");
                        a2.setAttribute("OnClick", "CrearModal(" + JSON.stringify(item.Descripcion) + ")");
                        a2.setAttribute("data-toggle", "modal");
                        a2.setAttribute("data-target", "#exampleModalCenter");
                        a2.setAttribute("id", item.Id + "des");
                        var ida2 = document.getElementById(item.Id + "buttonSearcheP");
                        ida2.append(a2);
                        var span2 = document.createElement("span");
                        span2.setAttribute("class", "icon-file-text");
                        span2.setAttribute("style", "font-size:20px;padding: 10px;");
                        var idspan2 = document.getElementById(item.Id + "des");
                        idspan2.append(span2);
                    });
                }
            },
            error: function (jqXHR, textStatus, err) {
                alertify.set('notifier', 'position', 'top-right');
                if (err == "Not Found") {
                    alertify.error('Encuestas no Encontradas');
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
                    var idtbl = document.getElementById('EncuestasPrioridadbyId');
                    var tam = idtbl.childElementCount
                    if (tam > 0) {
                        idtbl.innerHTML = '';
                            var tr = document.createElement("tr");
                            tr.setAttribute("id", 0 + "SearcheP");
                        var idtr = document.getElementById('EncuestasPrioridadbyId');
                            idtr.append(tr);

                            var td1 = document.createElement("td");
                            td1.textContent = err;
                            var idtd1 = document.getElementById(0 + "SearcheP");
                            idtd1.append(td1);

                            var td2 = document.createElement("td");
                            td2.textContent =err;
                            var idtd2 = document.getElementById(0 + "SearcheP");
                            idtd2.append(td2);

                            var td3 = document.createElement("td");
                            td3.textContent = err;
                            var idtd3 = document.getElementById(0+ "SearcheP");
                            idtd3.append(td3);


                            var td4 = document.createElement("td");
                            td4.textContent = err;
                            var idtd4 = document.getElementById(0+ "SearcheP");
                            idtd4.append(td4);
                           

                    }
                    else {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", 0 + "SearcheP");
                        var idtr = document.getElementById('EncuestasPrioridadbyId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = err;
                        var idtd1 = document.getElementById(0 + "SearcheP");
                        idtd1.append(td1);

                        var td2 = document.createElement("td");
                        td2.textContent = err;
                        var idtd2 = document.getElementById(0 + "SearcheP");
                        idtd2.append(td2);

                        var td3 = document.createElement("td");
                        td3.textContent = err;
                        var idtd3 = document.getElementById(0 + "SearcheP");
                        idtd3.append(td3);


                        var td4 = document.createElement("td");
                        td4.textContent = err;
                        var idtd4 = document.getElementById(0 + "SearcheP");
                        idtd4.append(td4);
                    }
                }

            }
        });
    }
    else {
        var err = "";
        var idtbl = document.getElementById('EncuestasPrioridadbyId');
        var tam = idtbl.childElementCount
        if (tam > 0) {
            idtbl.innerHTML = '';
            var tr = document.createElement("tr");
            tr.setAttribute("id", 0 + "SearcheP");
            var idtr = document.getElementById('EncuestasPrioridadbyId');
            idtr.append(tr);

            var td1 = document.createElement("td");
            td1.textContent = err;
            var idtd1 = document.getElementById(0 + "SearcheP");
            idtd1.append(td1);

            var td2 = document.createElement("td");
            td2.textContent = err;
            var idtd2 = document.getElementById(0 + "SearcheP");
            idtd2.append(td2);

            var td3 = document.createElement("td");
            td3.textContent = err;
            var idtd3 = document.getElementById(0 + "SearcheP");
            idtd3.append(td3);


            var td4 = document.createElement("td");
            td4.textContent = err;
            var idtd4 = document.getElementById(0 + "SearcheP");
            idtd4.append(td4);

        }
        else {
            var tr = document.createElement("tr");
            tr.setAttribute("id", 0 + "SearcheP");
            var idtr = document.getElementById('EncuestasPrioridadbyId');
            idtr.append(tr);

            var td1 = document.createElement("td");
            td1.textContent = err;
            var idtd1 = document.getElementById(0 + "SearcheP");
            idtd1.append(td1);

            var td2 = document.createElement("td");
            td2.textContent = err;
            var idtd2 = document.getElementById(0 + "SearcheP");
            idtd2.append(td2);

            var td3 = document.createElement("td");
            td3.textContent = err;
            var idtd3 = document.getElementById(0 + "SearcheP");
            idtd3.append(td3);


            var td4 = document.createElement("td");
            td4.textContent = err;
            var idtd4 = document.getElementById(0 + "SearcheP");
            idtd4.append(td4);
        }
    }
}
///////MODAL DESCRIPCION
function CrearModal(Descripcion) {
    var idtbl = document.getElementById('BodyModal');
    var tam = idtbl.childElementCount
    if (tam > 0) {
        idtbl.innerHTML = '';
        var p = document.createElement("p");
        p.textContent = Descripcion;
        var idp = document.getElementById('BodyModal');
        idp.append(p);

    }
    else {
        var p = document.createElement("p");
        p.textContent = Descripcion;
        var idp = document.getElementById('BodyModal');
        idp.append(p);
    }

}
///Nueva Encuesta
$('#btnNuevaEncuesta').click(function () {
    var name = $('#txtNameNuevaEncuesta').val().trim();
    var des = $('#txtDescripcionNuevaEncuesta').val().trim();
    var urldoc = $('#txtNuevaEncuestaUrlDoc').val().trim();
    var str = $('#txtNuevaEncuestaUrlImg').val().trim();
    var combo = document.getElementById("MenuNuevaEncuesta");
    var tipo = combo.options[combo.selectedIndex].text;
    var res = str.replace("https://drive.google.com/file/d/", "");
    var id = res.replace("/view?usp=sharing", "");
    var urlimg = "https://drive.google.com/uc?export=download&confirm=no_antivirus&id=" +id;
    if (name != '' && des != '' && urldoc != '' && urlimg != '' && tipo != '') {

        NuevaEncuesta(name, des, urldoc, urlimg, tipo);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione Todos los datos para registrar una nueva Encuesta');
    }
});
function NuevaEncuesta(name, des, urldoc, urlimg, tipo) {
    var st = {};
    st.Nombre = name;
    st.Descripcion = des;
    st.URL_Documento = urldoc;
    st.URL_Imagen = urlimg;
    st.NombreTipo = tipo;
    $.ajax({
        type: 'POST',
        url: 'api/admin/NuevaEncuesta',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Encuesta Agregada');
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == 'Internal Server Error') {
                alertify.error('Error del servidor');
            }
            if (err == "Not Found") {
                alertify.error('Metodo no Encontrado');
            }
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });
}
///QuitarPrioridadEncuesta
$('#btnQuitarPrioridadEncuesta').click(function () {
    var id = $('#txtidQuitarPEncuesta').val().trim();
    if (id != '') {

        QuitarPrioridadEncuesta(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Id para Quitar Prioridad a la Encuesta');
    }
});
function QuitarPrioridadEncuesta(id) {
    var st = {};
    st.Id = id;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/QuitarPrioridadEncuesta',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Hecho');
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == 'Internal Server Error') {
                alertify.error('Error del servidor');
            }
            if (err == "Not Found") {
                alertify.error('Metodo no Encontrado');
            }
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });
}
///DarPrioridadEncuesta
$('#btnDarPrioridadEncuesta').click(function () {
    var id = $('#txtidDarPEncuesta').val().trim();
    if (id != '') {

        DarPrioridadEncuesta(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Id para Dar Prioridad a la Encuesta');
    }
});
function DarPrioridadEncuesta(id) {
    var st = {};
    st.Id = id;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/DarPrioridadEncuesta',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Hecho');
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == 'Internal Server Error') {
                alertify.error('Error del servidor');
            }
            if (err == "Not Found") {
                alertify.error('Metodo no Encontrado');
            }
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });
}


///ActualizarNombreEncuesta
$('#btnActualizarNombreEncuesta').click(function () {
    var id = $('#txtidActualizarIdEncuestaNombre').val().trim();
    var name = $('#txtidActualizarNombreEncuestaNombre').val().trim();
    if (id != '' && name != '') {

        ActualizarNombreEncuesta(id, name);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione  todos los datos para editar el Nombre de la Encuesta');
    }
});
function ActualizarNombreEncuesta(id, name) {
    var st = {};
    st.Id = id;
    st.Nombre = name;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/ActualizarNombreEncuesta',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Encuesta Renombrada');
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == 'Internal Server Error') {
                alertify.error('Error del servidor');
            }
            if (err == "Not Found") {
                alertify.error('Metodo no Encontrado');
            }
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });
}
///ActualizarDescripcionEncuesta
$('#btnActualizarDescripcionEncuesta').click(function () {
    var id = $('#txtidActualizarIdDescripcion').val().trim();
    var des = $('#txtdesActualizarDescripcionDescripcion').val().trim();
    if (id != '' && des != '') {

        ActualizarDescripcionEncuesta(id, des);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para editar la Descripcion de la Encuesta');
    }
});
function ActualizarDescripcionEncuesta(id, des) {
    var st = {};
    st.Id = id;
    st.Descripcion = des;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/ActualizarDescripcionEncuesta',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Descrpcion de Encuesta Renombrada');
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == 'Internal Server Error') {
                alertify.error('Error del servidor');
            }
            if (err == "Not Found") {
                alertify.error('Metodo no Encontrado');
            }
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });
}


///ActualizarURLDocumentoEncuesta
$('#btnActualizarURLDocumentoEncuesta').click(function () {
    var id = $('#txtidActualizarURLDocumentoEncuesta').val().trim();
    var url = $('#txturlActualizarURLDocumentoEncuesta').val().trim();
    if (id != '' && url != '') {

        ActualizarURLDocumentoEncuesta(id, url);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para editar la URL del Documento de la Encuesta');
    }
});
function ActualizarURLDocumentoEncuesta(id, url) {
    var st = {};
    st.Id = id;
    st.URL_Documento = url;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/ActualizarURLDocumentoEncuesta',
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
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });
}
///ActualizarURLImagenEncuesta
$('#btnActualizarURLImagenEncuesta').click(function () {
    var id = $('#txtidActualizarURLImagenEncuesta').val().trim();
    var str = $('#txturlActualizarURLImagenEncuesta').val().trim();
    var res = str.replace("https://drive.google.com/file/d/", "");
    var idimg = res.replace("/view?usp=sharing", "");
    var url = "https://drive.google.com/uc?export=download&confirm=no_antivirus&id=" + idimg;

    if (id != '' && url != '') {
        ActualizarURLImagenEncuesta(id, url);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para editar la URL dela Imagen de la Encuesta');
    }
});
function ActualizarURLImagenEncuesta(id, url) {
    var st = {};
    st.Id = id;
    st.URL_Imagen = url;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/ActualizarURLImagenEncuesta',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('URL de la Imagen de Encuesta Actualizada');
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == 'Internal Server Error') {
                alertify.error('Error del servidor');
            }
            if (err == "Not Found") {
                alertify.error('Metodo no Encontrado');
            }
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });
}


//EliminarEncuesta
$('#btnEliminarEncuesta').click(function () {
    var id = $('#txtIdEliminarEncuesta').val().trim();
    if (id != '') {

        EliminarEncuesta(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Id para Borrar la Encuesta');
    }
});
function EliminarEncuesta(id) {
    var user = {};
    user.id = id;
    $.ajax({
        type: 'Delete',
        url: 'api/admin/EliminarEncuesta',
        data: user,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Encuesta eliminada');
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == 'Internal Server Error') {
                alertify.error('Error del servidor');
            }
            if (err == "Not Found") {
                alertify.error('Metodo no Encontrado');
            }
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });

}