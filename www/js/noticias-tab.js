
function goToNewsTextTab(el){
    noticiaIndexTab = el.id;
    if(noticiaIndex !== "noticias-list" || noticiaIndex !== ""){
        fn.load("noticia-texto-tab.html"); 
    }
}

var runNoticiasTab = function(){


    if(!isAuthenticated()){

        myNavigator.resetToPage("manchetes.html");
        console.log("passar not auth");

    }else{ 

    modal.show();

    var url = 'https://services.manchete.pt:8002/Clientes.asmx/getNewsPress?user=' + login + '&password=' + pass + '&callback=""&datainicio=' + dataInicio + '&datafim=' + dataFim + '&referencia3=';
       
        function ajaxNoticiasLoad(){
            $.ajax({
                url: url,
                dataType: "jsonp",
                async: true,
                success: function (result) {
                    ajaxNoticiasTab.parseJSONP(result);
                    modal.hide();
                },
                error: function (request, error) {
                    // alert('Erro ao buscar dados no servidor, tente de novo.');
                    console.log("Error on parse : ", error);
                    modal.hide();
                }
            });
        }

    const ajaxNoticiasTab = {

        parseJSONP: function (result) {
        
            noticiasTab = result;
            
            var html = '';
            var error = document.getElementById('sem-noticia-tab');
            var noticiasListTab = document.getElementById('noticias-list-tab');
        
            if(noticiasTab == null || noticiasTab.length < 1){
        
                noticiasListTab.innerHTML = "";
                error.innerHTML = "<div class='error'><h3>Nao há noticias para esta categoria.</h3></div>";
        
            }else{
        
                error.innerHTML = "";

                var iconList;
            
                $.each(result, function (index, item) {
                    if(item.link.indexOf('pdf') > -1){
                        iconList = '<a href="'+item.link+'" target="_blank"><i class="icon-noticias-list zmdi zmdi-collection-pdf"></i></a>'
                    }else if(item.link.indexOf('mp4') > -1){
                        iconList = '<a href="'+item.link+'" target="_blank"><i class="icon-noticias-list zmdi zmdi-tv-play"></i></a>';
                    }else if(item.link.indexOf('http') > -1){
                        iconList = '<a href="'+item.link+'" target="_blank"><i class="icon-noticias-list zmdi zmdi-globe"></i></a>';
                    }else{
                        iconList = '<i class="icon-noticias-list disabled zmdi zmdi-format-subject"></i>'
                    }
                    html += "<ons-list-item modifier='chevron' tappable class='list-item-noticias'>" +
                    '<div class="left">'+iconList+'</i></div>'+
                    "<div class='center' id=" + index + " onClick=goToNewsTextTab(this)><span class='ons-list__title'>" + item.titulo + "</span><span class='list-item__subtitle'>" +
                    item.publicacao + '</span></div><div class="right" id=' + index + ' onClick=goToNewsTextTab(this)></div></ons-list-item>';
                });
                    noticiasListTab.innerHTML = html;
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
                ajaxNoticiasLoad();
                break;
            }
                pullHook.innerHTML = message;
    });

    pullHook.onAction = function(done) {
        setTimeout(done, 2000);
    }

    ajaxNoticiasLoad();
}
}