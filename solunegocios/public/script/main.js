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
                        if (!element.nombre_tienda) {
                            $('#tbUsuarios > tbody').empty();
                            $("#tbUsuarios").append(
                                `<tr><td colspan = 4 >El usuario no posee creditos</td></tr>`
                            );
                        } else {
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
                        }
                    });
                    $('.tooltipped').tooltip();
                    $("#btnAgregaCreditos").attr("onclick", `loadModalCreditos('` + values.correo + `', '0',  '0', 'suma');`)
                    $("#btnAgregaCreditos").css("display", "inline-block");
                } else {
                    $("#btnAgregaCreditos").css("display", "none");
                    $('#tbUsuarios > tbody').empty();
                    $("#tbUsuarios").append(
                        `<tr><td colspan = 4 >No hay información para mostrar</td></tr>`
                    );
                }
            }).catch((err) => {
                $("#btnAgregaCreditos").css("display", "none");
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

    // BUSCA CREDITOS DE LA TIENDA
    $('#btnBuscaTienda').click(() => {
        if ($("#contSelTiendasModal option:selected").val() != "0") {
            let valuesTienda = {
                id_tienda: $("#selTiendas option:selected").val()
            };
            console.log("Values", valuesTienda);
            axios({
                method: 'post',
                url: '/getCreditosTienda',
                data: valuesTienda
            }).then((res) => {
                if (res.status == 200 && res.data != "ERROR") {
                    if (res.data.length > 0) {
                        let totalCredito = res.data.map(creditos => creditos.credito).reduce((acc, creditos) => creditos + acc);
                        $("#h5Titulo").html(`Total creditos de la tienda: <b>` + totalCredito + `</b>`);
                        $('#tbUsuarios > tbody').empty();
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
                        // $("#btnAgregaCreditos").css("display", "inline-block");
                        $('.tooltipped').tooltip();
                    } else {
                        // $("#btnAgregaCreditos").css("display", "inline-block");
                        // $("#btnAgregaCreditos").attr("onclick", "")
                        $('#tbUsuarios > tbody').empty();
                        $("#tbUsuarios").append(`<tr><td colspan = 4 class="waves-effect waves-light btn"> + Agregar creditos </td></tr>`);
                    }
                } else {
                    // $("#btnAgregaCreditos").css("display", "inline-block");
                    Swal.fire({
                        title: 'Problema al buscar los creditos',
                        icon: 'error'
                    })
                }
            }).catch((err) => {
                // $("#btnAgregaCreditos").css("display", "inline-block");
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
    getTiendas("selTiendas");
} else if (urlActual.indexOf("creditos_usuario") != -1) {
    $("#selTiendasModal").on('change', function () {
        $('#txtIdTienda').val($("#selTiendasModal option:selected").val())
    });
}

function loadModalCreditos(correo, tienda, id_tienda, tipoActualizacion) {
    tipoActualizacion == 'suma' ? $("#accionCreditos").html("Agregar credito") : $("#accionCreditos").html("Descontar credito");
    tipoActualizacion == 'suma' ? $("#btnModificaCredito").attr("onclick", "setCreditos('suma')") : $("#btnModificaCredito").attr("onclick", "setCreditos('resta')");
    $('#txtCreditos').val(0);
    $('#txtCorreoMod').val(correo);
    if (id_tienda == '0') {
        // no hay modifica para una tienda en particular, carga las tiendas disponibles
        $('#contSelTiendasModal').css("display", "block");
        getTiendas("selTiendasModal");
        $('#modalModificarCreditos').modal('open');
        $('#txtTienda').css("display", "none");
        $('#txtTienda').val(tienda);
        $('#txtIdTienda').val("0");
        M.updateTextFields();
    } else {
        $('#contSelTiendasModal').css("display", "none");
        $('#modalModificarCreditos').modal('open');
        $('#txtTienda').css("display", "block");
        $('#txtTienda').val(tienda);
        $('#txtIdTienda').val(id_tienda);
        M.updateTextFields();
    }

}

function setCreditos(tipoActualizacion) {

    if (parseInt($('#txtCreditos').val()) != NaN && $('#txtCreditos').val() > 0) {
        let values = {
            correo: $('#txtCorreoMod').val(),
            creditos: tipoActualizacion == 'suma' ? $('#txtCreditos').val() : $('#txtCreditos').val() * -1,
            id_tienda: $('#txtIdTienda').val()
        };

        axios({
            method: 'post',
            url: '/setCreditos',
            data: values
        }).then(() => {
            Swal.fire({
                title: 'Creditos actualizados',
                icon: 'success'
            });

            const urlActual = window.location.href;
            if (urlActual.indexOf("creditos_tienda") != -1) {
                $("#btnBuscaTienda").click();
            } else if (urlActual.indexOf("creditos_usuario") != -1) {
                $("#btnBusca").click();
            }
        }).catch(() => {
            Swal.fire({
                title: 'Problema actualizando creditos',
                icon: 'error'
            })
        });
    } else {
        Swal.fire({
            title: 'Valide el monto ingresado',
            icon: 'error'
        })
    }

}

function getTiendas(selActualizar) {
    axios({
        method: 'post',
        url: '/getTiendas'
    }).then((res) => {
        if (res.status == 200 && res.data != "ERROR" && res.data.length > 0) {
            $("#" + selActualizar).empty().append('whatever');
            res.data.forEach(element => {
                $("#" + selActualizar).append(new Option(element.nombre, element.id_tienda));
            });
            $('select').formSelect();
            $("#txtIdTienda").val($("#selTiendasModal option:selected").val());
        } else {
            $("#" + selActualizar).append(new Option("No se encontraron tiendas", "0"));
            $("#" + selActualizar).prop("disabled", false);
        }
    }).catch(() => {
        $("#" + selActualizar).append(new Option("No se encontraron tiendas", "0"));
        $("#" + selActualizar).prop("disabled", false);
    });
}