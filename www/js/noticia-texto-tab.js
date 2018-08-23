 
var runNoticiasTextoTab = function(){

    var linkTab = "'"+noticiasTab[noticiaIndexTab].link+"'";
    var id = noticiasTab[noticiaIndexTab].id;
    var tipo = noticiasTab[noticiaIndexTab].tipo;

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
            var ext = linkTab.split(".");
            var extention = (ext[ext.length - 1]);
            var icon = "";
                
                if(ext.length > 1){
                    switch (extention){
                        case "pdf'":
                        icon = '<button class="fab fab--mini noticiasTexto-btn" onclick="window.open(' + linkTab + ',' + sys + ');"><i class="zmdi zmdi-collection-pdf"></i></button>';
                        break;
                        case "mp4'":
                        icon = '<button class="fab fab--mini noticiasTexto-btn" onclick="window.open(' + linkTab + ',' + sys + ');"><i class="zmdi zmdi-play"></i></button>';
                        break;
                        case "mp3'":
                        icon = '<button class="fab fab--mini noticiasTexto-btn" onclick="window.open(' + linkTab + ',' + sys + ');"><i class="zmdi zmdi-volume-up"></i></button>';
                        break;
                        default: 
                        icon = '<button class="fab fab--mini noticiasTexto-btn" onclick="window.open(' + linkTab + ',' + sys + ');"><i class="zmdi zmdi-globe"></i></button>';
                    }
                }

                var browseBtns = document.querySelector('#browse-btns');

                shareLink =  linkTab.substring(9);

                browseBtns.innerHTML = '<div style="text-align: right; padding: 10px;">'+icon;
                // '<a onclick="guardarFavoritos()" id="guardar-favoritos"><button class="fab fab--mini" disabled><i class="zmdi zmdi-favorite"></i></button></div>';

                texto.innerHTML = textoNoticia.texto;
                
                var tituloTexto = document.getElementsByTagName('p')[0];

                document.getElementById('titulo-noticia').appendChild(tituloTexto);
        }
    }
}
    

function shareEmailTab(){
    console.log("criar email tab")

    var dialog = document.getElementById('email-dialog-tab');
    dialog.show();

}

const sendEmailBtnTab = function (){

    sendEmail(noticiasTab[noticiaIndexTab].id, noticiasTab[noticiaIndexTab].tipo);

}

function shareFacebook(){
    console.log("Sharing Facebook -- " + shareLink);
    window.open("https://www.facebook.com/sharer/sharer.php?u=http%3A//"+shareLink+"");
}

function shareTwitter(){
    console.log("Sharing Twitter");
    window.open("https://twitter.com/home?status=This%20is%20Awesome%20page!!%20http%3A//"+shareLink+"");
}

var hideAlertDialog = function() {
    document.querySelector('ons-alert-dialog').hide();
}



