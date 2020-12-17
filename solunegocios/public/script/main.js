$(document).ready(function () {
    $('.modal').modal();

    // BUSCA CREDITOS DEL USUARIO
    $('#btnBusca').click(() => {
        if ($("#txtCorreo").val()) {
            let values = {
                correo: $("#txtCorreo").val()
            }
            axios({
                method: 'post',
                url: '/getCreditosUsuario',
                data: values
            }).then((res) => {
                if (res.status == 200 && res.data != "ERROR" && res.data.length > 0) {
                    $('#tbUsuarios > tbody').empty();
                    $('#h5Titulo').html(`Creditos usuario ` + values.correo);
                    res.data.forEach(element => {
                        $("#tbUsuarios > tbody").append(`<tr>
                                                <td>` + element.correo + `</td>
                                                <td>` + element.nombre_tienda + `</td>
                                                <td>` + element.credito + `</td>
                                                <td> 
                                                    <i class="material-icons tooltipped" data-position="bottom" data-tooltip="Agregar creditos" 
                                                        onclick="loadModalCreditos('` + element.correo + `', '` +
                            element.nombre_tienda + `', '` + element.id_tienda + `', 'suma');">add_circle
                                                    </i> 
                                                    <i class="material-icons tooltipped" data-position="bottom" data-tooltip="Descontar creditos" 
                                                        onclick="loadModalCreditos('` + element.correo + `', '` +
                            element.nombre_tienda + `', '` + element.id_tienda + `', 'resta');">remove_circle
                                                    </i>
                                                </td>
                                             </tr>`);
                    });
                    $('.tooltipped').tooltip();
                } else {
                    $('#tbUsuarios > tbody').empty();
                    $("#tbUsuarios").append(
                        `<tr><td colspan = 4 >No hay información para mostrar</td></tr>`
                    );
                }
            }).catch((err) => {
                console.log("catch", err);
                $('#tbUsuarios > tbody').empty();
                $("#tbUsuarios").append(
                    `<tr><td colspan = 4 >No hay información para mostrar</td></tr>`
                );
            });
        } else {
            Swal.fire({
                title: 'Por favor valide el correo ingresado',
                icon: 'error'
            })
        }
    });


    $('#btnBuscaTienda').click(() => {
        if ($("#selTiendas option:selected").val() != "0") {
            let valuesTienda = {
                id_tienda: $("#selTiendas option:selected").val()
            };
            console.log("Values", valuesTienda);
            axios({
                method: 'post',
                url: '/getCreditosTienda',
                data: valuesTienda
            }).then((res) => {
                if (res.status == 200 && res.data != "ERROR" && res.data.length > 0) {
                    console.log(res);
                    $("#h5Titulo").html(`Creditos de la tienda: <b>`  + res.data[0].total_credito + `</b>`);
                } else {
                    Swal.fire({
                        title: 'Problema al buscar los creditos',
                        icon: 'error'
                    })
                }
            }).catch((err) => {
                console.log("catch", err);
                $('#tbUsuarios > tbody').empty();
                $("#tbUsuarios").append(
                    `<tr><td colspan = 4 >No hay información para mostrar</td></tr>`
                );
            });
        } else {
            Swal.fire({
                title: 'Por favor valide el correo ingresado',
                icon: 'error'
            })
        }
    });
})

const urlActual = window.location.href;
if (urlActual.indexOf("creditos_tienda") != -1) {
    getTiendas();
}

function loadModalCreditos(correo, tienda, id_tienda, tipoActualizacion) {
    tipoActualizacion == 'suma' ? $("#accionCreditos").html("Agregar credito") : $("#accionCreditos").html("Descontar credito");
    tipoActualizacion == 'suma' ? $("#btnModificaCredito").attr("onclick", "setCreditos('suma')") : $("#btnModificaCredito").attr("onclick", "setCreditos('resta')");
    $('#modalModificarCreditos').modal('open');
    $('#txtCreditos').val(0);
    $('#txtCorreoMod').val(correo);
    $('#txtTienda').val(tienda);
    $('#txtIdTienda').val(id_tienda)
    M.updateTextFields();
}

function setCreditos(tipoActualizacion) {
    let values = {
        correo: $('#txtCorreo').val(),
        creditos: tipoActualizacion == 'suma' ? $('#txtCreditos').val() : $('#txtCreditos').val() * -1,
        id_tienda: $('#txtIdTienda').val()
    };

    console.log("Values : ", values);
    axios({
        method: 'post',
        url: '/setCreditos',
        data: values
    }).then(() => {
        Swal.fire({
            title: 'Creditos actualizados',
            icon: 'success'
        })
    }).catch(() => {
        Swal.fire({
            title: 'Problema actualizando creditos',
            icon: 'error'
        })
    });
}

function getTiendas() {
    axios({
        method: 'post',
        url: '/getTiendas'
    }).then((res) => {
        if (res.status == 200 && res.data != "ERROR" && res.data.length > 0) {
            res.data.forEach(element => {
                $("#selTiendas").append(new Option(element.nombre, element.id_tienda));
            });
            $('select').formSelect();
        } else {
            $("#selTiendas").append(new Option("No se encontraron tiendas", "0"));
            $('#selTiendas').prop("disabled", false);
        }
    }).catch(() => {
        $("#selTiendas").append(new Option("No se encontraron tiendas", "0"));
        $('#selTiendas').prop("disabled", false);
    });
}