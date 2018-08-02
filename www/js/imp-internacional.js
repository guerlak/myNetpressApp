
var runImpInternacional = function() {

    modal.show();

    var url = 'https://services.manchete.pt:8002/Clientes.asmx/getNewsPress?user=' + login + '&password=' + pass + '&callback=""&datainicio=' + dataInicio + '&datafim=' + dataFim + '&referencia3=je';

    $.ajax({
        url: url,
        dataType: "jsonp",
        async: true,
        success: function (result) {
            ajaxNoticias.parseJSONP(result);
            modal.hide();
        },
        error: function (request, error) {
            alert('Erro ao buscar os dados no servidor, tente de novo.');
        }
    });
    
};






