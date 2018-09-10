if(!user.authenticated){
    myNavigator.resetToPage('manchetes.html')
    console.log("User not auth in loadUser fn")

} else {

showLoading();

var noticiasTab, noticiaIndexTab;

function goToNewsTextTab(el){
    noticiaIndexTab = el.id;
    if(noticiaIndex !== "noticias-list" || noticiaIndex !== ""){
        fn.load("noticia-texto-tab.html"); 
    }
}

var loadNoticiasTab = function(){

    var url = 'https://services.manchete.pt:8002/Clientes.asmx/getNewsPress?user=' + login + '&password=' + pass + '&callback=&datainicio=' + dataInicio + '&datafim=' + dataFim + '&referencia3=';

    var request = new XMLHttpRequest();

        request.open('GET', url);
        request.responseType = 'text';
       
        // document.querySelector('#erro-noticia-tab').innerHTML = '<div class="progress-bar progress-bar--indeterminate"></div>';

        request.onload = function () {

            if(request.status === 500){  
               document.querySelector('#erro-noticia-tab').innerHTML = '<div id="error-request"><p>Ocorreu um erro ao buscar as noticias, tente mais tarde.</p></div>';
                console.log("Server 500 error");
            }else{
                document.querySelector('#erro-noticia-tab').innerHTML = '';
                var noticiasText = request.response;
                    noticiasText = noticiasText.substring(1, noticiasText.length - 1);
                var noticias = JSON.parse(noticiasText);
                ajaxNoticiasTab.parseJSONP(noticias);
            }
        }
        request.onerror = function(){
            document.querySelector('#erro-noticia-tab').innerHTML = '<p class="error-request">Ocorreu um erro ao buscar as noticias, tente mais tarde.</p>';
        }
        request.send();
}

 loadNoticiasTab();

    var ajaxNoticiasTab = {

        parseJSONP: function (result) {
        
            noticiasTab = result;
            
            var html = '';
            var error = document.getElementById('erro-noticia-tab');
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
                    }else if(item.link.indexOf('mp3') > -1){
                        iconList = '<a href="'+item.link+'" target="_blank"><i class="icon-noticias-list zmdi zmdi-volume-up"></i></a>';
                    }else if(item.link.indexOf('http') > -1){
                        iconList = '<a href="'+item.link+'" target="_blank"><i class="icon-noticias-list zmdi zmdi-globe"></i></a>';
                    }else{
                        iconList = '<i class="icon-noticias-list disabled zmdi zmdi-format-subject"></i>'
                    }
                    html += "<ons-list-item modifier='chevron' tappable class='list-item-noticias'>" +
                    '<div class="left">'+iconList+'</i></div>'+
                    "<div class='center' id=" + index + " onClick=goToNewsTextTab(this)><span class='ons-list__title'>" + item.titulo + "</span><span class='list-item__subtitle'>" +
                    item.publicacao + '</span></div><div class="right" id=' + index + 'onClick=goToNewsTextTab(this)></div></ons-list-item>';
                });
                    noticiasListTab.innerHTML = html;
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
                loadNoticiasTab();
                break;
            }
        
            pullHook.innerHTML = message;
        });

        pullHook.onAction = function(done) {
            setTimeout(done, 2000);
        }

        }
    }
}


