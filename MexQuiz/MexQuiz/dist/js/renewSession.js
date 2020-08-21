
function jwt() {
    var pre = document.createElement('pre');
    //custom style.
    pre.style.maxHeight = "400px";
    pre.style.margin = "0";
    pre.style.padding = "24px";
    pre.style.whiteSpace = "pre-wrap";
    pre.style.textAlign = "justify";
    pre.appendChild(document.createTextNode("¿Desea Renovar su Sesión?"));
    //show as confirm
    alertify.confirm(pre, function () {
        newSession();
        alertify.success('Su Sesion Fue Renovada');
    }, function () {
        localStorage.removeItem("key");
        alertify.error('Sesión Terminada');
        window.location.href = "Index.html";
    }).set({ labels: { ok: 'Renovar Sesión', cancel: 'Salir' }, padding: false });
}

function newSession() {
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

    var user = {};
    user.UserName = dataJWT.unique_name;
    user.Contraseña = dataJWT.gender;
    $.ajax(
        {
            url:'api/login/authenticate',
            data: user,
            type: "POST",
            success: function (data) {
                localStorage.removeItem("key");
                localStorage.setItem("key", data);

            },
            error: function (result) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('Error del Servidor');
            }
        });

}

