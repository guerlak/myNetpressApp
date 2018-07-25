var runBlogs = function() {

    if(!checkAuth()){
        console.log("CheckAuth: Not allowed")
       return;
    };

  page = "blogs.html"

  modal.show();

    var date = new Date();
    var dataInicio = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var dataFim = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1);
    var url = 'https://services.manchete.pt:8002/Clientes.asmx/getNewsPress?user=' + login + '&password=' + pass + '&callback=""&datainicio=' + dataInicio + '&datafim=' + dataFim + '&referencia3=bg';

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
}