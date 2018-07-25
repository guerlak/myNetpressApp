
var noticiaIndex,
    hora,
    noticias;


var runNoticiasTemaDia = function(){

    if(!checkAuth()){
        console.log("checkAuth false")
        return;
    };

    modal.show();

        page = "noticias-dia-tema.html";

            var url2 = 'https://services.manchete.pt:8002/Clientes.asmx/getTemasbyUser?user=' + login + '&password=' + pass + '&callback=';

            console.log("URL: " + url2);

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
                }
            });
            

            var ajax2 = {

                parseJSON: function (result) {

                    result = result.substring(1, result.length - 1);

                    var parsed = JSON.parse(result);

                        console.log("Console parsed: " + parsed[0]);

                    var selectTemas = document.querySelector('#select_temas');
                    var selectHTML = '<ons-select class="select" name="select-choice-a" id="select-choice-a"><select class="select-input">';
                        selectHTML += '<option value="" disabled selected>Escolha o tema</option>'
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

var date = new Date();
var dataInicio = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
var dataFim = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1);
var refTema = document.getElementById("select-choice-a").value;

console.log(refTema);

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
        }
        
    });
}

    





    



