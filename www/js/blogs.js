var runBlogs = function() {

    if(!checkAuth()){
        console.log("CheckAuth: Not allowed")
       return;
    };

  page = "blogs.html"

  modal.show();

    var date = new Date();
    var dataInicio = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var d = new Date();
    d.setDate(d.getDate() + 1);
    console.log(d.getDate());

    var dataFim = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate());



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