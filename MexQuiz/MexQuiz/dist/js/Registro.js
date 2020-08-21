
var uri = 'api/login/register';
$('#btnRegistro').click(function () {
    var name = $('#txtName').val().trim();
    var paterno = $('#txtApellidoP').val().trim();
    var materno = $('#txtApellidoM').val().trim();
    var nac = document.getElementById("txtFecha").value;
    var genero = document.getElementById("Genero").value;
    var Estado = document.getElementById("estado").value;
    var Municipio = document.getElementById("municipio").value;
    var email = $('#txtEmail').val().trim();
    var nick = $('#txtNick').val().trim();
    var password = $('#txtPassword').val().trim();
    if (nick != '' && password != '' && name!= '' && paterno != '' && materno != '' && email != '' && nac != '' &&  genero != '' && Estado != '' &&  Municipio != '') {
        if (checkPassword(password)) {
            if (validateEmail(email)) {
                Registrar(nick, password, name, paterno, materno, email, nac, genero, Estado, Municipio);
            } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Indroduce una direccion de Correo Valida mail@example.com");
            }
        }
        else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Contraseña Poco Segura");
        }

    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Proporcione todos los datos");
    }
});
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function checkPassword(str) {
    var re = /(?=.*?\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
}

function Registrar(nick, password, name, paterno, materno, email, nac, genero, Estado, Municipio) {
    var user = {};
    user.Nombre = name;
    user.Paterno = paterno;
    user.Materno = materno;
    user.FechadeNacimiento = nac;
    user.Sexo = genero;
    user.Correo = email;
    user.Estado = Estado;
    user.Municipio = Municipio;
    user.UserName = nick;
    user.Contraseña = sha256(password);
    $.ajax({
        url: uri,
        data: user,
        type: "POST",
        success: function (data) {
            localStorage.clear();
            localStorage.setItem("key", data);
            window.location.href = " index.html";
        },
        error: function (result) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Eliga Otro Nombre de Usuario");
        }
    });
}


