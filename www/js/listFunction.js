var noticias, noticiaIndex;

var showList = function(referencia){

    document.addEventListener('deviceready', checkConnection, false);

    console.log("List FN")

    modal.show();

    var url = 'https://services.manchete.pt:8002/Clientes.asmx/getNewsPress?user=' + login + '&password=' + pass + '&callback=""&datainicio=' + dataInicio + '&datafim=' + dataFim + '&referencia3='+referencia;

    console.log(url)

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
                modal.hide();
                document.querySelector('#erro-noticia').innerHTML = '<div id="error-request"><p>Ocorreu um erro ao buscar as noticias, tente mais tarde.</p></div>'
                console.log(error);
               
            }
        });
    }

    ajaxLoad();

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
            })
    
            pullHook.onAction = function(done) {
                setTimeout(done, 2000);
            }

}


const goToNewsText = function(el){
    noticiaIndex = el.id;
    if(noticiaIndex !== "noticias-list" || noticiaIndex !== ""){
        fn.load("noticia-texto.html"); 
    }
}


const ajaxNoticias = {

    parseJSONP: function (result) {
  
        noticias = result;
        console.log(noticias)
        
        var html = '';
        var error = document.getElementById('sem-noticia');
        var noticiasList = document.getElementById('noticias-list');
  
        if(noticias == null || noticias.length < 1){
          noticiasList.style.display = "none"
          error.innerHTML = "<div class='error'><h3>Nao há noticias para esta categoria.</h3></div>";
  
        }else{
  
          noticiasList.style.display = "block";
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
            "<div class='center' id=" + index + " onClick=goToNewsText(this)><span class='ons-list__title'>" + item.titulo + "</span><span class='list-item__subtitle'>" +
            item.publicacao + '</span></div><div class="right" id=' + index + ' onClick=goToNewsText(this)></div></ons-list-item>';
        });

        noticiasList.innerHTML = html;
        
      }
    }
  }

 





    