
    
var runPesquisa = function (){

    modal.show();

        var urlMeios = 'https://services.manchete.pt:8002/Clientes.asmx/getClippingbyUser?user=' + login + '&password=' + pass + '&callback=';

        $.ajax({
            url: urlMeios,
            dataType: "text",
            async: true,
            success: function (result) {
                ajaxMeios.parseJSON(result);
                modal.hide();
            },
            error: function (request, error) {
                alert('Erro ao buscar dados do servidor, tente mais tarde.');
            }
        });
            
        var ajaxMeios = {

            parseJSON: function (result) {

                result = result.substring(1, result.length - 1);

                var parsed = JSON.parse(result);
                var selectDiv = document.querySelector('#select_meios');
                var selectHTML = '<ons-select id="meio" onchange="runAjaxPublicacao()">';
                    selectHTML += '<option value="" disabled selected>Escolha o meio</option>'
                for (i = 0; i < parsed.length; i++) {
                    selectHTML += "<option value='" + parsed[i].referencia3 + "'>" + parsed[i].clipping + "</option>";
                }
                selectHTML += "</ons-select>";
                selectDiv.innerHTML = selectHTML;
            }
        }


    var urlTema = 'https://services.manchete.pt:8002/Clientes.asmx/getTemasbyUser?user=' + login + '&password=' + pass + '&callback=';

        $.ajax({
            url: urlTema,
            dataType: "text",
            async: true,
            success: function (result) {
                ajaxTema.parseJSON(result);
           
            },
            error: function (request, error) {
                alert('Network error has occurred please try again!');
            }
        });

        var ajaxTema = {

            parseJSON: function (result) {

                result = result.substring(1, result.length - 1);
                
                var parsed = JSON.parse(result);

                console.log(parsed[0]);

                var selectDiv = document.querySelector('#select_temas');
                var selectHTML = '<ons-select id="tema" class="select">'
                    selectHTML += '<option value="" disabled selected>Escolha o tema</option>'

                for (i = 0; i < parsed.length; i++) {
                    selectHTML += "<option value='" + parsed[i].referencia4+ "'>" + parsed[i].tema + "</option>";
                }
                selectHTML += "</ons-select>";
                selectDiv.innerHTML = selectHTML;
                
            }
        }
    }

    function runAjaxPublicacao(){

        var tipo = document.getElementById('meio').value;

        var urlPublicacao = 'https://services.manchete.pt:8002/Clientes.asmx/getSourcesbyUser?user=' + login + '&password=' + pass + '&callback=&tipo=' + tipo;

        $.ajax({
            url: urlPublicacao,
            dataType: "text",
            async: true,
            success: function (result) {
                ajaxPublicacao.parseJSON(result);
            },
            error: function (request, error) {
                alert('Network error has occurred please try again!');
            }
        });
        
        
        var ajaxPublicacao = {

            parseJSON: function (result) {

                result = result.substring(1, result.length - 1);

                var parsed = JSON.parse(result);
                var selectDiv = document.querySelector('#select_publicacao');
                var selectHTML = '<ons-select id="publicacao" class="select">';

                    for (i = 0; i < parsed.length; i++) {
                        selectHTML += "<option value='" + parsed[i].fonte + "'>" + parsed[i].fonte + "</option>";
                    }

                selectHTML += "</ons-select>";
                selectDiv.innerHTML = selectHTML;

            }
        }
    }


var runSearch = function(){

        var dataInicio = document.getElementById('data-inicio').value;
        var dataFim = document.getElementById('data-fim').value;
        var tipo = document.getElementById('meio').value;
        var tema = document.getElementById('tema').value;
        var publicacao = document.getElementById('publicacao').value;
        var palavra1 = document.getElementById('palavra1').value;
        var palavra2 = document.getElementById('palavra2').value;
        var and = document.getElementById('and');
        var or = document.getElementById('or');

        if(dataInicio == "" || dataFim == "" ){
            ons.notification.toast('Preencha as datas para a pesquisa', {
                timeout: 1000
              });
        } else {

    var operador;

        if(or.checked){
            operador = "or";
        }

        if(and.checked){
            operador = "and";
        }

    var url = 'https://services.manchete.pt:8002/Clientes.asmx/getSearch?user='+login+'&password='+ pass +'&callback=&datainicio='+dataInicio+'&datafim='+dataFim+'&tipo='+tipo+'&tema='+tema+'&publicacao='+publicacao+'&palavra1='+palavra1+'&palavra2='+palavra2+'&operador='+operador;
    var urlEncoded = encodeURI(url);
    
    $.ajax({
        url: urlEncoded,
        dataType: "text",
        async: true,
        success: function (result) {
            ajaxPesquisa.parseJSONP(result);
            modal.hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            modal.hide();
            alert('Erro ao buscar os dados no servidor por esta URL - ' + url + " error: " + jqXHR.status + " " + jqXHR.responseText + " " + " " + errorThrown);

        }
    });
    

    var ajaxPesquisa = {
    
        parseJSONP: function (result) {

            result = result.substring(1, result.length - 1);

            var noticiasParsed = JSON.parse(result);

            noticias = noticiasParsed;

            if (noticias < 1) {
                ons.notification.alert('Não há noticias com esses parametros de pesquisa');
            } else {

            var html = '';
        
                $.each(noticias, function (index, item) {
                    html += "<ons-list-item modifier='chevron' tappable id=" + index + " class='list-item' onclick="+'goToNewsText(this)'+"><div class='center'><span class='ons-list__title'>" + item.titulo + "</span><span class='list-item__subtitle'>" + item.publicacao + '</span></div><div class="right">' + item.hora_insercao + '</div></ons-list-item>';
                
                    addEventListener('click', function(e){
                        noticiaIndex = e.target.parentNode.parentNode.id;
                    });
                
                });
            
                var noticiasList = document.getElementById('noticias-list');

                noticiasList.innerHTML = html;
            }

        }
    }
}
}
    
    
