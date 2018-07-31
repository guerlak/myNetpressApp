var runNoticias = function(){

    modal.show();

    var pullHook = document.getElementById('pull-hook-noticia');
        
    pullHook.addEventListener('changestate', function(event) {

    var message = '';
    
        switch (event.state) {
            case 'initial':
            message = 'Pull to refresh';
            break;
            case 'preaction':
            message = 'Release';
            break;
            case 'action':
            message = '<ons-progress-circular indeterminate></ons-progress-circular>';
            ajaxLoad();
            break;
        }
            pullHook.innerHTML = message;
        });

    pullHook.onAction = function(done) {
        setTimeout(done, 2000);
    };

    if(!checkAuth()){
        console.log("CheckAuth: Not allowed");
        return;
     };

    var url = 'https://services.manchete.pt:8002/Clientes.asmx/getNewsPress?user=' + login + '&password=' + pass + '&callback=""&datainicio=' + dataInicio + '&datafim=' + dataFim + '&referencia3=';

    function ajaxLoad(){
        $.ajax({
            url: url,
            dataType: "jsonp",
            async: true,
            success: function (result) {
                ajaxNoticias.parseJSONP(result);
                modal.hide();
            },
            error: function (request, error) {
                alert('Erro ao buscar dados no servidor, tente mais tarde.');
                console.log(error);
                modal.hide();
            }
        });
    }
   
    ajaxLoad();
}



    