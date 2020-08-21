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
                alertify.error( + err);
            }
        }
    });
});
/// Categoria x id
function Categoriabyid() {
    var id = $('#IdCategoriaSearch').val().trim();
    if (id != '') {
        $.ajax({
            type: 'POST',
            url: 'api/admin/Categoriasbyid?id=' + id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("key"));
            },
            success: function (data) {
                var idtbl = document.getElementById('CategoriasEncuestasbyId');
                var tam = idtbl.childElementCount

                if (tam > 0) {
                    idtbl.innerHTML ='';
                    $.each(data, function (key, item) {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", item.Id+"Search");
                        var idtr = document.getElementById('CategoriasEncuestasbyId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = item.Id;
                        var idtd1 = document.getElementById(item.Id + "Search");
                        idtd1.append(td1);

                        var td2 = document.createElement("td");
                        td2.textContent = item.Nombre;
                        var idtd2 = document.getElementById(item.Id + "Search");
                        idtd2.append(td2);
                    });
                }
                else {
                     $.each(data, function (key, item) {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", item.Id+"Search");
                        var idtr = document.getElementById('CategoriasEncuestasbyId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = item.Id;
                        var idtd1 = document.getElementById(item.Id + "Search");
                        idtd1.append(td1);

                        var td2 = document.createElement("td");
                        td2.textContent = item.Nombre;
                        var idtd2 = document.getElementById(item.Id + "Search");
                        idtd2.append(td2);
                    });
                }
            },
            error: function (jqXHR, textStatus, err) {
                alertify.set('notifier', 'position', 'top-right');
                if (err == "Not Found") {
                    alertify.error('Categoria no Encontrada');
                }
                if (err == 'Unauthorized') {
                    jwt();
                }
                else if (err == 'Internal Server Error') {
                    alertify.error('Error del Servidor');
                    /// jwt();
                }
                else {
                    var err = "";
                    var idtbl = document.getElementById('CategoriasEncuestasbyId');
                    var tam = idtbl.childElementCount
                    if (tam > 0) {
                        idtbl.innerHTML = '';
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", 0 + "Search");
                        var idtr = document.getElementById('CategoriasEncuestasbyId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = err;
                        var idtd1 = document.getElementById(0 + "Search");
                        idtd1.append(td1);

                        var td2 = document.createElement("td");
                        td2.textContent = err;
                        var idtd2 = document.getElementById(0 + "Search");
                        idtd2.append(td2);

                    }
                    else {
                        var tr = document.createElement("tr");
                        tr.setAttribute("id", 0 + "Search");
                        var idtr = document.getElementById('CategoriasEncuestasbyId');
                        idtr.append(tr);

                        var td1 = document.createElement("td");
                        td1.textContent = err;
                        var idtd1 = document.getElementById(0 + "Search");
                        idtd1.append(td1);

                        var td2 = document.createElement("td");
                        td2.textContent = err;
                        var idtd2 = document.getElementById(0 + "Search");
                        idtd2.append(td2);
                    }
                }

            }
        });
    }
    else {
        var err = "";
        var idtbl = document.getElementById('CategoriasEncuestasbyId');
        var tam = idtbl.childElementCount
        if (tam > 0) {
            idtbl.innerHTML = '';
                var tr = document.createElement("tr");
                tr.setAttribute("id", 0 + "Search");
                var idtr = document.getElementById('CategoriasEncuestasbyId');
                idtr.append(tr);

                var td1 = document.createElement("td");
                td1.textContent = err;
                var idtd1 = document.getElementById(0 + "Search");
                idtd1.append(td1);

                var td2 = document.createElement("td");
                td2.textContent = err;
                var idtd2 = document.getElementById(0 + "Search");
                idtd2.append(td2);
            
        }
        else {
            var tr = document.createElement("tr");
            tr.setAttribute("id", 0 + "Search");
            var idtr = document.getElementById('CategoriasEncuestasbyId');
            idtr.append(tr);

            var td1 = document.createElement("td");
            td1.textContent = err;
            var idtd1 = document.getElementById(0 + "Search");
            idtd1.append(td1);

            var td2 = document.createElement("td");
            td2.textContent = err;
            var idtd2 = document.getElementById(0 + "Search");
            idtd2.append(td2);
        }
    }
}
///Nueva Categoria
$('#btnNuevaCategoria').click(function () {
    var name = $('#txtNombreNuevaCategoria').val().trim();
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
        url: 'api/admin/NuevaCategoria',
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
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });
}
//ActualizarCategoria
$('#btnActualizarCategoria').click(function () {
    var id = $('#txtIdCategoriaActualizar').val().trim();
    var name = $('#txtNombreActualizarCategoria').val().trim();
    if (id != '' && name != '') {
        ActualizarCategoria(id, name);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione el Id y el Nombre de La Categoria ha Actualizar');
    }
});
function ActualizarCategoria(id, name) {
    var st = {};
    st.Id = id;
    st.Nombre = name;
    $.ajax({
        type: 'PUT',
        url: 'api/admin/ActualizarCategoria',
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
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });

}
//BorrarCategoria
$('#btnEliminarCategoria').click(function () {
    var id = $('#txtIdCategoriaEliminar').val().trim();
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
            if (err == 'Unauthorized') {
                jwt();
            }
        }
    });

}
