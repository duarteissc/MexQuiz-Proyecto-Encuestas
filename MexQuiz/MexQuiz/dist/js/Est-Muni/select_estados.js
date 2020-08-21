$(document).ready(function(){
    
    $.each(municipios, function (key, item) {
        var x = document.createElement("option");
        x.setAttribute("Value", key);
        $(x).html(key);
        $(x).appendTo('#estado');
    });
    var x = document.createElement("option");
    x.setAttribute("Value", "H");
    $(x).html("H");
    $(x).appendTo('#Genero');
    var m = document.createElement("option");
    m.setAttribute("Value", "M");
    $(m).html("M");
    $(m).appendTo('#Genero'); 

    $( "#estado" ).change(function() {
        var html = "<option value='' disabled selected>Selecciona el municipio</option>";
        $( "#estado option:selected" ).each(function() {
            var estado = document.getElementById("estado").value;
            if(estado != ""){
                var municipio = municipios[estado];
                for (var i = 0; i < municipio.length; i++)
                    html += "<option value='" + municipio[i] + "'>" + municipio[i] + "</option>";
            }
        });
        $('#municipio').html(html);
    })
    .trigger( "change" );
});