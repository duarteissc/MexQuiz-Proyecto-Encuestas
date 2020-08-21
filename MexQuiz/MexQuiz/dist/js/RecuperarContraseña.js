$('#btnPut').click(function () {
    var nick = $('#txtNick').val().trim();
    var correo = $('#txtEmail').val().trim();
    var password = $('#txtPassword').val().trim();
    if (nick != '' && correo != '' && password != '') {
        if (checkPassword(password)) {
            if (validateEmail(correo)) {
                Put(correo, nick, password);
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
    else
    {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Proporcione todos los datos"); }
        
});
function Put(correo, nick, password) {

    var st = {};
    st.Correo = correo;
    st.UserName = nick;
    st.Contraseña = sha256(password);
    st.Nombre = password;
    $.ajax({
        type: 'PUT',
        url: 'api/login/UpdatePassword',
        data: st,
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success("Su Contraseña Fue Actualizada");
            window.location.href = "login.html";
        },
        error: function (jqXHR, textStatus, err) {
            if (err == 'Internal Server Error') {
                //jwt();
            }
            if (err == "Not Found") {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Los Datos Son Erroneos");
                alertify.error("Verifique el Usario o el Correo");
            }
            if (err == "Unauthorized") {
            }
        }
    });

}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function checkPassword(str) {
    var re = /(?=.*?\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
}