
document.addEventListener('init', function (event) {
    
    if (event.target.id === 'radio') {
        modal.show();

    if(!checkAuth()){
        console.log("checkAuth false")
        return;
    };

    var urlRadio = 'https://services.manchete.pt:8002/Clientes.asmx/getNewsPress?user=' + login + '&password=' + pass + '&callback=""&datainicio=' + dataInicio + '&datafim=' + dataFim + '&referencia3=r';

    $.ajax({
        url: urlRadio,
        dataType: "jsonp",
        async: true,
        success: function (result) {
            ajaxNoticias.parseJSONP(result);
            modal.hide();
        },
        error: function (request, error) {
            alert('Erro ao buscar os dados no servidor, tente de novo.');
            modal.hide();
        }
    });

    };

});




















