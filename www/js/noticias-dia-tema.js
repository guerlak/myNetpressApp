
var runNoticiasTemaDia = function(){

    if(!checkAuth()){
        console.log("checkAuth false")
        return;
    };

    modal.show();

    var url2 = 'https://services.manchete.pt:8002/Clientes.asmx/getTemasbyUser?user=' + login + '&password=' + pass + '&callback=';

    $.ajax({
        url: url2,
        dataType: "text",
        async: true,
        success: function (result) {
            ajax2.parseJSON(result);
            modal.hide();
        },
        error: function (request, error) {
            alert('Erro ao buscar dados no servidor, tente mais tarde.');
            modal.hide();
        }
    });
    
    var ajax2 = {

        parseJSON: function (result) {

            result = result.substring(1, result.length - 1);

            var parsed = JSON.parse(result);

            var selectTemas = document.querySelector('#select_temas');
            var selectHTML = '<ons-select class="select" name="select-choice-a" id="select-choice-a"><select class="select-input">';
                selectHTML += '<option value="" disabled selected>Escolha o tema</option>';

                for (i = 0; i < parsed.length; i++) {
                    selectHTML += "<option value='" + parsed[i].referencia4 + "'>" + parsed[i].tema + "</option>";
                }

            selectHTML += "</select></ons-select>";
            selectTemas.innerHTML = selectHTML;

        }
    }
}


var resultadoNoticiasTemas = function() {
    modal.show();

var refTema = document.getElementById("select-choice-a").value;

var url = 'https://services.manchete.pt:8002/Clientes.asmx/getNewsByTema?user=' + login + '&password=' + pass + '&callback=""&datainicio=' + dataInicio + '&datafim=' + dataFim + '&reftema='+refTema;

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
            modal.hide();
        }
    });

}


    





    



