var idleTime = 0;
$(document).ready(function () {
    //Increment the idle time counter every minute.
    idleTime = setInterval(timerIncrement, 60000); // 1min
    $(document).mousemove(function () {
        //alert("mouse moved" + idleTime);
        idleTime = 0;
    });

    $(document).keypress(function () {
        //alert("keypressed"  + idleTime);
        idleTime = 0;
    });



    $(document).click(function () {
        //alert("mouse moved" + idleTime);
        idleTime = 0;
    });

});

function timerIncrement() {
    
    if (idleTime > 10) { // 10 minutes
        mensaje(idleTime);
        idleTime = 0;
    }
    idleTime++;
}
function mensaje(time) {
    if (confirm("No hiciste Nada durante un tiempo!!\nDesea Salir? o Permanecer"))
    {
        detener();
        localStorage.clear();
        window.location.href = "Login.html";
    } else {
        idleTime = 0;
    }
}

function jwt() {
    if (confirm("Tu Sesión Termino!\n¿Deseas Reiniciar tu Sesion?")) {
        newSession();
    } else {
        detener();
        localStorage.clear();
        window.location.href = "Login.html";
    }
}
function detener() {
    clearInterval(idleTime);
}
var urii = 'api/login/authenticate';
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
    user.Nick = dataJWT.unique_name;
    user.Password = dataJWT.email;
    $.ajax(
        {
            url: urii,
            data: user,
            type: "POST",
            success: function (data) {
                localStorage.clear();
                localStorage.setItem("Token", data);

            },
            error: function (result) {
                alert("Login Failed");
            }
        });

}


    

