var runNoticiasTab = function(){

    modal.show();

    if(!checkAuth()){
        console.log("CheckAuth: Not allowed");
        return;
     };

    var date = new Date();
    var dataInicio = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var dataFim = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1);
    var url = 'https://services.manchete.pt:8002/Clientes.asmx/getNewsPress?user=' + login + '&password=' + pass + '&callback=""&datainicio=' + dataInicio + '&datafim=' + dataFim + '&referencia3=';

    function ajaxLoad(){
        $.ajax({
            url: url,
            dataType: "jsonp",
            async: true,
            success: function (result) {
                ajaxNoticiasTab.parseJSONP(result);
                modal.hide();
            },
            error: function (request, error) {
                alert('Erro ao buscar dados no servidor, tente de novo.');
                console.log(error);
                myNavigator.resetToPage("tab-bar-home.html");
            }
        });
    }
   
    ajaxLoad();



    const ajaxNoticiasTab = {

        parseJSONP: function (result) {
        
            noticias = result;
            
            var html = '';
            var error = document.getElementById('sem-noticia-tab');
            var noticiasList = document.getElementById('noticias-list-tab');
        
            if(noticias == null || noticias.length < 1){
        
                noticiasList.innerHTML = "";
                error.innerHTML = "<div class='error'><h3>Nao há noticias para esta categoria.</h3></div>";
        
            }else{
        
            error.innerHTML = "";
        
            var iconList;
        
            $.each(result, function (index, item) {
        
                if(item.link.indexOf('pdf') > -1){
                    iconList = '<i class="icon-noticias-list zmdi zmdi-collection-pdf"></i>'
                }else if(item.link.indexOf('http') > -1){
                    iconList = '<i class="icon-noticias-list zmdi zmdi-open-in-browser"></i>';
                }else{
                    iconList = '<i class="icon-noticias-list disabled zmdi zmdi-format-subject"></i>'
                }

        
                html += "<ons-list-item modifier='chevron' tappable id=" + index + " class='list-item-noticias' onClick=goToNewsText(this)>"+
                '<div class="left">'+iconList+'</i></div>'+
                "<div class='center'><span class='ons-list__title'>" + item.titulo + "</span><span class='list-item__subtitle'>" +
                item.publicacao + '</span></div><div class="right"></div></ons-list-item>';
                
            });
                noticiasList.innerHTML = html;
            
                html = "";
                els = "";

                    }
        }
    
    }
    
    var pullHook = document.getElementById('pull-hook-noticias-tab');
        
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
    }

}



    