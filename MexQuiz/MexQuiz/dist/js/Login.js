var uri = 'api/login/authenticate';
$('#btnLogin').click(function () {
    var username = $('#txtNick').val().trim();
    var pass = $('#txtPassword').val().trim();
    if (username != '' && pass != '') {

        login(username, pass);
    }
    else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Proporcione todos los datos');
    }
});
function login(username, pass) {
    var user = {};
    user.UserName = username;
    user.Contraseña = sha256(pass);
    $.ajax({
            url: uri,
            data: user,
            type: "POST",
        success: function (data) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success("Bienvenido");
            
                    localStorage.clear("key");
                    localStorage.setItem("key", data);
                    window.location.href = " index.html";                   
            },
            error: function (result) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error("Datos Erroneos");
            }
        });
}
