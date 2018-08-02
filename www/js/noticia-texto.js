var runNoticiasTexto = function(){
    
    var link = "'"+noticias[noticiaIndex].link+"'";
    var id = noticias[noticiaIndex].id;
    
    var url = 'https://services.manchete.pt:8002/Clientes.asmx/getTextbyIdNew?user=' + login + '&password=' + pass + '&callback=&id=' + id;

        $.ajax({
            url: url,
            dataType: "text",
            async: true,
            success: function(result){
                ajaxNoticiaTexto.parseJSON(result);
                modal.hide();
            },
            error: function (request, error) {
                alert('Network error has occurred please try again!');
                modal.hide();
            }
        });

    var ajaxNoticiaTexto = {

        parseJSON: function(result) {
            result = result.substring(1, result.length - 1);
            var textoNoticia = JSON.parse(result);
            var texto = document.getElementById('texto-noticia');
            
            var sys = "'_system'"
            var ext = link.split(".");
            var extention = (ext[ext.length - 1]);
            var icon = "";

                if(ext.length > 1){
                    switch (extention){
                        case "pdf'":
                        icon = '<button class="fab fab--mini noticiasTexto-btn" onclick="window.open(' + link + ',' + sys + ');"><i class="zmdi zmdi-collection-pdf"></i></button>';
                        break;
                        case "mp4'":
                        icon = '<button class="fab fab--mini noticiasTexto-btn" onclick="window.open(' + link + ',' + sys + ');"><i class="zmdi zmdi-play"></i></button>';
                        break;
                        default: 
                        icon = '<button class="fab fab--mini noticiasTexto-btn" onclick="window.open(' + link + ',' + sys + ');"><i class="zmdi zmdi-globe"></i></button>';
                    }
                }

            var browseBtns = document.querySelector('#browse-btns');

            shareLink =  link.substring(9);

            browseBtns.innerHTML = '<div style="text-align: right; padding: 10px;">'+icon;
            // '<a onclick="guardarFavoritos()" id="guardar-favoritos"><button class="fab fab--mini" disabled><i class="zmdi zmdi-favorite"></i></button></div>';

            texto.innerHTML = textoNoticia.texto;
            
            var tituloTexto = document.getElementsByTagName('p')[0];

            document.getElementById('titulo-noticia').appendChild(tituloTexto);
        }
    }
}
    

// function shareEmail(){

//     var dialog = document.getElementById('em-dialog');

//     if (dialog) {
//         dialog.show();
//     } else {
//         ons.createElement('alert-dialog.html', { append: true })
//         .then(function(dialog) {
//             dialog.show();
//         });
//     }
// }

function shareFacebook(){
    console.log("Sharing Facebook -- " + shareLink);
    window.open("https://www.facebook.com/sharer/sharer.php?u=http%3A//"+shareLink+"");
}

function shareTwitter(){
    console.log("Sharing twitter");
    window.open("https://twitter.com/home?status=This%20is%20Awesome%20page!!%20http%3A//"+shareLink+"");
}

var hideAlertDialog = function() {
    document.getElementById('my-alert-dialog').hide();
}



