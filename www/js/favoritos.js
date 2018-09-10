var login,
    pass,
    noticiaID,
    noticias;

var storage = window.localStorage;
    login = storage.getItem('userLogin');
    pass = storage.getItem('userPass');

$(document).on('pagecontainerbeforeshow', function (evt, data) {

    if (login == null || pass == null) {
        $("body").pagecontainer("change", "login.html", { transition: "slide" });
    }
});


$(document).on('pageshow', '#favoritos', function () {

    $.mobile.loading('show');

    //storage.removeItem('lista-favoritos');

    var listaFavoritos = storage.getItem('lista-favoritos');

    //console.log(listaFavoritos);
    
    ajax.parseJSONP(listaFavoritos);

});


var ajax = {

    parseJSONP: function (result) {

        noticias = result;
        //console.log(noticias);

        var error = document.getElementById('error');

        if (noticias == null) {
            error.innerHTML = "<h3>Nao ha artigo guardado em favoritos.</h3>"
            $.mobile.loading('hide');

        } else {

            noticias = JSON.parse(storage.getItem('lista-favoritos'));

            //console.log(noticias);

            var html = '';

            $.each(noticias, function (index, item) {
                html += "<li><a class='noticia-item' href='' id=" + index + " data-transition='slide'><h5>" + item.titulo + "</h5><p>" + item.publicacao + '</p><p><strong>' + item.hora_insercao + '</strong></p></a></li>';
            });

            var noticiasList = document.getElementById('noticias-list');

            noticiasList.innerHTML = html;

            $('#noticias-list').listview('refresh');     

            $.mobile.loading('hide');

        }
    }
}
            



$(document).on('pagebeforeshow', '#noticia-texto-page', function () {

    var id = noticias[noticiaID].id;
   
    var url = 'https://services.manchete.pt:8002/Clientes.asmx/getTextbyIdNew?user=' + login + '&password=' + pass + '&callback=&id=' + id;

    $.ajax({
        url: url,
        dataType: "text",
        async: true,
        success: function (result) {
            ajax2.parseJSON(result);
            $.mobile.loading('hide');
        },
        error: function (request, error) {
            $.mobile.loading('hide');
            alert('Network error has occurred please try again!');
        }
    });

    var ajax2 = {
        parseJSON: function (result) {

            result = result.substring(1, result.length - 1);
            var textoNoticia = JSON.parse(result);
            var texto = document.getElementById('texto-noticia');
            //console.log("Texto JSON: " + textoNoticia);
            texto.innerHTML = textoNoticia.texto;

        }
    }
});

$(document).on('tap', '#noticias-list li a', function () {

    noticiaID = $(this).attr('id');
    console.log("A passar: " + noticiaID);
    $(":mobile-pagecontainer").pagecontainer("change", "#noticia-texto-page", { transition: "slide", changeHash: false });

});








