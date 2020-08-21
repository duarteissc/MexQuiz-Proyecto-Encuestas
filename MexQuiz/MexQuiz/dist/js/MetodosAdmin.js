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

                 var x = document.createElement("a");
                 x.setAttribute("class", "dropdown-item");
                 x.setAttribute("href", "#");
                /// x.setAttribute("OnClick", "Categoria(" + item.Id + "," + JSON.stringify(item.Nombre) + ")");
                 x.textContent = item.Nombre;
                 x.setAttribute("id", item.Id);

                 var id = document.getElementById('Menu');
                 id.append(x);
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
             else {
                 alertify.error("no tienes sesion:" + err);
             }
         }
    });
    /// Todos los Banners
    $.ajax({
        type: 'GET',
        url: 'api/admin/Banners',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            $.each(data, function (key, item) {

                var x = document.createElement("a");
                x.setAttribute("class", "dropdown-item");
                x.setAttribute("href", "#");
                /// x.setAttribute("OnClick", "Categoria(" + item.Id + "," + JSON.stringify(item.Nombre) + ")");
                x.textContent = item.Nombre;
                x.setAttribute("id", item.Id);

                var id = document.getElementById('Menu');
                id.append(x);
            });
        },
        error: function (jqXHR, textStatus, err) {
            alertify.set('notifier', 'position', 'top-right');
            if (err == "Not Found") {
                alertify.error('Banner no Encontradas');

            }
            else if (err == 'Internal Server Error') {
                alertify.error('Error del Servidor');
            }
            else {
                alertify.error("no tienes sesion:" + err);
            }
        }
    });
    /// Categoria x id
    $(document).keyup(function () {

        Categoriabyid();
    });
    var Categoriabyid = function () {
        var id = $('#txtid').val();
        if (id != '') {
            $.ajax({
                type: 'POST',
                url: 'api/admin/Categoriasbyid?id=' + id,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
                },
                success: function (data) {
                    var id = document.getElementById('tbl-User');
                    var tam = id.childElementCount

                    if (tam > 1) {
                        var d = document.getElementById("tbl-User");
                        var d_nested = document.getElementById("Dato");
                        var throwawayNode = d.removeChild(d_nested);


                        var x = document.createElement("tr");
                        x.setAttribute("id", "Dato");
                        $.each(data, function (key, item) {
                            $(x).html('<td>' + item.id + "</td>" +
                                "<td>" + item.Nombre + "</td>" +
                                "<td>" + item.Paterno + "</td>" +
                                "<td>" + item.Materno + "</td>" +
                                "<td>" + item.Correo + "</td>").appendTo('#tbl-User');
                        });
                    }
                    else {
                        var x = document.createElement("tr");
                        x.setAttribute("id", "Dato");
                        $.each(data, function (key, item) {
                            $(x).html('<td>' + item.id + "</td>" +
                                "<td>" + item.Nombre + "</td>" +
                                "<td>" + item.Paterno + "</td>" +
                                "<td>" + item.Materno + "</td>" +
                                "<td>" + item.Correo + "</td>").appendTo('#tbl-User');
                        });
                    }
                },
                error: function (jqXHR, textStatus, err) {
                    if (err == "Unauthorized") {
                        ///jwt();
                    }
                    else if (err == 'Internal Server Error') {
                        /// jwt();
                    }
                    else {
                        var id = document.getElementById('tbl-User');
                        var tam = id.childElementCount
                        if (tam > 1) {
                            var d = document.getElementById("tbl-User");
                            var d_nested = document.getElementById("Dato");
                            var throwawayNode = d.removeChild(d_nested);

                            var x = document.createElement("tr");
                            x.setAttribute("id", "Dato");
                            $(x).html('<td>' + err + "</td>" +
                                "<td>" + err + "</td>" +
                                "<td>" + err + "</td>" +
                                "<td>" + err + "</td>" +
                                "<td>" + err + "</td>").appendTo('#tbl-User');
                        }
                        else {
                            var x = document.createElement("tr");
                            x.setAttribute("id", "Dato");
                            var x = document.createElement("tr");
                            x.setAttribute("id", "Dato");
                            $(x).html('<td>' + err + "</td>" +
                                "<td>" + err + "</td>" +
                                "<td>" + err + "</td>" +
                                "<td>" + err + "</td>" +
                                "<td>" + err + "</td>").appendTo('#tbl-User');
                        }
                    }

                }
            });
        }
        else {
            var err = "";
            var id = document.getElementById('tbl-User');
            var tam = id.childElementCount
            if (tam > 1) {

                var d = document.getElementById("tbl-User");
                var d_nested = document.getElementById("Dato");
                var throwawayNode = d.removeChild(d_nested);

                var x = document.createElement("tr");
                x.setAttribute("id", "Dato");
                $(x).html('<td>' + err + "</td>" +
                    "<td>" + err + "</td>" +
                    "<td>" + err + "</td>" +
                    "<td>" + err + "</td>" +
                    "<td>" + err + "</td>").appendTo('#tbl-User');
            }
            else {
                var x = document.createElement("tr");
                x.setAttribute("id", "Dato");
                var x = document.createElement("tr");
                x.setAttribute("id", "Dato");
                $(x).html('<td>' + err + "</td>" +
                    "<td>" + err + "</td>" +
                    "<td>" + err + "</td>" +
                    "<td>" + err + "</td>" +
                    "<td>" + err + "</td>").appendTo('#tbl-User');
            }
        }
    }
});

///Nueva Categoria
$('#btnNuevaCategoria').click(function () {
    var name = $('#txtNameCategoria').val();
    if (name != '') {

        NuevaCategoria(name);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Nombre de La Nueva Categoria');
    }
});
function NuevaCategoria(name) {
    var st = {};
    st.Nombre = name;
    $.ajax({
        type: 'POST',
        url:'api/admin/NuevaCategoria' ,
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Categoria Agregada');
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
//ActualizarCategoria
$('#btnActualizarCategoria').click(function () {
    var id = $('#txtIdCategoriaActualizar').val();
    var name = $('#txtNombreActualizarCategoria').val();
    if (id != '' && name != '') {
        ActualizarCategoria(id, name);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Nombre y el Id de La Categoria ha Actualizar');
    }
});
function ActualizarCategoria(id, name) {
    var st = {};
    st.Id = id;
    st.Nombre = name;
    $.ajax({
        type: 'PUT',
        url: 'api/users/ActualizarCategoria',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Categoria Actualizada');
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
//BorrarCategoria
$('#btnEliminarCategoria').click(function () {
    var id = $('#txtIdCategoriaEliminar').val();
    if (id != '') {

        BorrarCategoria(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Id para Borrar la Categoria');
    }
});
function BorrarCategoria(id) {

    var user = {};
    user.id = id;
    $.ajax({
        type: 'Delete',
        url: 'api/admin/BorrarCategoria',
        data: user,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Categoria eliminada');
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



///EncuestasPrioridadbyTipo
$('#btnEncuestasPrioridadbyTipo').click(function () {
    var tipo = $('#txtEncuestasPrioridadbyTipo').val();
    if (tipo != '') {

        EncuestasPrioridadbyTipo(tipo);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Tipo de Encuesta');
    }
});
function EncuestasPrioridadbyTipo(tipo) {
    $.ajax({
        type: 'GET',
        url: 'api/admin/EncuestasPrioridadbyTipo?tipo=' + tipo,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            /////////////mostrar en tabla
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
///Encuestasbyid
$('#btnEncuestasbyid').click(function () {
    var id = $('#txtEncuestasbyid').val();
    if (id != '') {

        EncuestasbyId(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el id de Encuesta');
    }
});
function EncuestasbyId(id) {
    $.ajax({
        type: 'GET',
        url: 'api/admin/EncuestabyId?id=' + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            /////////////mostrar en tabla
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
///Nueva Encuesta
$('#btnNuevaEncuesta').click(function () {
    var name = $('#txtNameEncuesta').val();
    var des = $('#txtDescripcionEncuesta').val();
    var urldoc = $('#txtUrlDoc').val();
    var urlimg = $('#txtUrlImg').val();
    var tipo = $('#txtNameTipo').val();
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
        }
    });
}
///QuitarPrioridadEncuesta
$('#btnQuitarPrioridadEncuesta').click(function () {
    var id = $('#txtid').val();
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
        }
    });
}
///DarPrioridadEncuesta
$('#btnDarPrioridadEncuesta').click(function () {
    var id = $('#txtid').val();
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
        }
    });
}
///ActualizarNombreEncuesta
$('#btnActualizarNombreEncuesta').click(function () {
    var id = $('#txtid').val();
    var name = $('#txtid').val();
    if (id != '' && name!='') {

        ActualizarNombreEncuesta(id,name);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione  todos los datos para editar el Nombre de la Encuesta');
    }
});
function ActualizarNombreEncuesta(id,name) {
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
        }
    });
}
///ActualizarDescripcionEncuesta
$('#btnActualizarDescripcionEncuesta').click(function () {
    var id = $('#txtid').val();
    var des = $('#txtdes').val();
    if (id != '' && des != '') {

        ActualizarDescripcionEncuesta(id,des);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para editar la Descripcion de la Encuesta');
    }
});
function ActualizarDescripcionEncuesta(id,des) {
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
        }
    });
}
///ActualizarURLDocumentoEncuesta
$('#btnActualizarURLDocumentoEncuesta').click(function () {
    var id = $('#txtid').val();
    var url = $('#txturl').val();
    if (id != '' && url != '') {

        ActualizarURLDocumentoEncuesta(id,url);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para editar la URL del Documento de la Encuesta');
    }
});
function ActualizarURLDocumentoEncuesta(id,url) {
    var st = {};
    st.Id = id;
    st.URL_Documento =url;
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
        }
    });
}
///ActualizarURLImagenEncuesta
$('#btnActualizarURLImagenEncuesta').click(function () {
    var id = $('#txtid').val();
    var url = $('#txturl').val();
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
        }
    });
}
//EliminarEncuesta
$('#btnEliminarEncuesta').click(function () {
    var id = $('#txtId').val();
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
        }
    });

}




///BannerbyId
$('#btnBannerbyId').click(function () {
    var id = $('#txtBannerbyId').val();
    if (id != '') {

        BannerbyId(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el id del Banner');
    }
});
function BannerbyId(id) {
    $.ajax({
        type: 'GET',
        url: 'api/admin/BannerbyId?id=' + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            /////////////mostrar en tabla
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
///BannerbyIdEncuesta
$('#btnBannerbyIdEncuesta').click(function () {
    var id = $('#txtBannerbyIdEncuesta').val();
    if (id != '') {

        BannerbyIdEncuesta(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el id de la Encuesta del Banner');
    }
});
function BannerbyIdEncuesta(id) {
    $.ajax({
        type: 'GET',
        url: 'api/admin/BannerbyIdEncuesta?id=' + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            /////////////mostrar en tabla
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
///NuevosBanners
$('#btnNuevosBanners').click(function () {
    var id = $('#txtid').val();
    var url1 = $('#txturl').val();
    var url2 = $('#txturl').val();
    var url3 = $('#txturl').val();
    if (id != '' && url1 != '' && url2 != '' && url3 != '') {

        NuevosBanners(id, url1, url2,url3);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para agregar los banners');
    }
});
function NuevosBanners(id, url1, url2, url3) {
    var b = [{ "Id": id, "URL_Banner": url1}, { "Id": id, "URL_Banner": url2 }, { "Id": id, "URL_Banner":url3 }];

    $.ajax({
        type: 'POST',
        url: 'api/admin/NuevosBanners',
        data: b,
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
    var id = $('#txtid').val();
    var url = $('#txturl').val();
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
    var id = $('#txtId').val();
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









///NoticiasPrioridadbyTipo
$('#btnNoticiasPrioridadbyTipo').click(function () {
    var tipo = $('#txtNoticiasPrioridadbyTipo').val();
    if (tipo != '') {

        NoticiasPrioridadbyTipo(tipo);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Tipo de Noticia');
    }
});
function NoticiasPrioridadbyTipo(tipo) {
    $.ajax({
        type: 'GET',
        url: 'api/admin/NoticiasPrioridadbyTipo?tipo=' + tipo,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            /////////////mostrar en tabla
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
///NoticiabyId
$('#btnNoticiabyId').click(function () {
    var id = $('#txtNoticiabyId').val();
    if (id != '') {

        NoticiabyId(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el id de Noticia');
    }
});
function NoticiabyId(id) {
    $.ajax({
        type: 'GET',
        url: 'api/admin/NoticiabyId?id=' + id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            /////////////mostrar en tabla
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
///NuevaNoticia
$('#btnNuevaNoticia').click(function () {
    var name = $('#txtNameNoticia').val();
    var des = $('#txtDescripcionNotica').val();
    var urldoc = $('#txtUrlDoc').val();
    var urlimg = $('#txtUrlImg').val();
    var tipo = $('#txtNameTipo').val();
    if (name != '' && des != '' && urldoc != '' && urlimg != '' && tipo != '') {

        NuevaNoticia(name, des, urldoc, urlimg, tipo);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione Todos los datos para registrar una nueva Noticia');
    }
});
function NuevaNoticia(name, des, urldoc, urlimg, tipo) {
    var st = {};
    st.Nombre = name;
    st.Descripcion = des;
    st.URL_Documento = urldoc;
    st.URL_Imagen = urlimg;
    st.NombreTipo = tipo;
    $.ajax({
        type: 'POST',
        url: 'api/admin/NuevaNoticia',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Noticia Agregada');
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
///QuitarPrioridadNoticia
$('#btnQuitarPrioridadNoticia').click(function () {
    var id = $('#txtid').val();
    if (id != '') {

        QuitarPrioridadNoticia(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Id para Quitar Prioridad a la Noticia');
    }
});
function QuitarPrioridadNoticia(id) {
    var st = {};
    st.Id = id;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/QuitarPrioridadNoticia',
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
        }
    });
}
///DarPrioridadNoticia
$('#btnDarPrioridadNoticia').click(function () {
    var id = $('#txtid').val();
    if (id != '') {

        DarPrioridadNoticia(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Id para Dar Prioridad a la Noticia');
    }
});
function DarPrioridadNoticia(id) {
    var st = {};
    st.Id = id;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/DarPrioridadNoticia',
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
        }
    });
}
///ActualizarNombreNoticia
$('#btnActualizarNombreNoticia').click(function () {
    var id = $('#txtid').val();
    var name = $('#txtid').val();
    if (id != '' && name != '') {

        ActualizarNombreNoticia(id, name);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione  todos los datos para editar el Nombre de la Noticia');
    }
});
function ActualizarNombreNoticia(id, name) {
    var st = {};
    st.Id = id;
    st.Nombre = name;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/ActualizarNombreNoticia',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Noticia Renombrada');
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
///ActualizarDescripcionNoticia
$('#btnActualizarDescripcionNoticia').click(function () {
    var id = $('#txtid').val();
    var des = $('#txtdes').val();
    if (id != '' && des != '') {
        ActualizarDescripcionNoticia(id, des);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para editar la Descripcion de la Noticia');
    }
});
function ActualizarDescripcionNoticia(id, des) {
    var st = {};
    st.Id = id;
    st.Descripcion = des;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/ActualizarDescripcionNoticia',
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
        }
    });
}
///ActualizarURLDocumentoNoticia
$('#btnActualizarURLDocumentoNoticia').click(function () {
    var id = $('#txtid').val();
    var url = $('#txturl').val();
    if (id != '' && url != '') {
        ActualizarURLDocumentoNoticia(id, url);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para editar la URL del Documento de la Noticia');
    }
});
function ActualizarURLDocumentoNoticia(id, url) {
    var st = {};
    st.Id = id;
    st.URL_Documento = url;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/ActualizarURLDocumentoNoticia',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('URL del Documento de Noticia fue Actualizada');
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
///ActualizarURLImagenNoticia
$('#btnActualizarURLImagenNoticia').click(function () {
    var id = $('#txtid').val();
    var url = $('#txturl').val();
    if (id != '' && url != '') {
        ActualizarURLImagenNoticia(id, url);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos para editar la URL dela Imagen de la Noticia');
    }
});
function ActualizarURLImagenNoticia(id, url) {
    var st = {};
    st.Id = id;
    st.URL_Imagen = url;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/ActualizarURLImagenNoticia',
        data: st,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('URL de la Imagen de Noticia Actualizada');
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
//EliminarEncuesta
$('#btnEliminarNoticia').click(function () {
    var id = $('#txtId').val();
    if (id != '') {

        EliminarNoticia(id);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Id para Borrar la Noticia');
    }
});
function EliminarNoticia(id) {
    var user = {};
    user.id = id;
    $.ajax({
        type: 'Delete',
        url: 'api/admin/EliminarNoticia',
        data: user,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
        },
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Noticia eliminada');
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