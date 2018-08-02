
var noticias, noticiaIndex;

const storage = window.localStorage;
const modal = document.querySelector('ons-modal');
const myNavigator = document.getElementById('myNavigator');
const registrationId = storage.getItem('registrationId');

const user = {
    logo: "",
    email: "",
    nome: ""

}

var login = storage.getItem('userLogin');
var pass = storage.getItem('userPass');

const date = new Date();
const dataInicio = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

const d = new Date();
      d.setDate(d.getDate() + 1); 
const dataFim = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate());

var listaFavoritos = [];
var savedId = "";

window.fn = {};
window.fn.open = function() {
  const menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
    if(isAuthenticated()){
        myNavigator.pushPage(page);
        menu.close();
    }else{
    ons.notification.alert({
        title: "Aviso",
        message: "Faça o login de utilizador para aceder a aplicação."
    });
    }
}

const isAuthenticated = function(){
    
    let result;
    if(!storage.getItem('userLogin') || !storage.getItem('userPass') ){
        result = false;
    }else{
        result = true;
    }
    return result;
}

const logout = function() {

    ons.notification.confirm({
        message: "Pretende sair da aplicação?",
        title: "Logout",
        cancelable: false,
        callback: function(answer) {
            if (answer) { 
                storage.removeItem('userLogin');
                storage.removeItem('userPass');
                removeNotifications();
                ons.notification.toast('Logout com sucesso', {
                    timeout: 2000
                });
                myNavigator.resetToPage('manchetes.html');
            } else { 
                return;
            } 
        }
    })
    
}


const toggleNotification = function(){

    const not = document.getElementById('checkNoti');
    let url;
    console.log(not.checked);

    if(!not.checked){
        console.log("Disable notification")

    url = 'https://services.manchete.pt:8002/Clientes.asmx/ActivateNotifications?user=' + login + '&password=' + pass + '&callback=""&deviceType='+ device.platform +'&deviceToken='+registrationId+'&activate=0';

    }else{
        console.log("Enable notification")
        url = 'https://services.manchete.pt:8002/Clientes.asmx/ActivateNotifications?user=' + login + '&password=' + pass + '&callback=""&deviceType='+ device.platform +'&deviceToken='+registrationId+'&activate=1';
    }

    let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'text';
        request.send();
}


function goToNewsText(el){
    noticiaIndex = el.id;
    if(noticiaIndex !== "noticias-list" || noticiaIndex !== ""){
        fn.load("noticia-texto.html"); 
    }
}


const ajaxNoticias = {

  parseJSONP: function (result) {

      noticias = result;
      
      var html = '';
      var error = document.getElementById('sem-noticia');
      var noticiasList = document.getElementById('noticias-list');

      if(noticias == null || noticias.length < 1){
        noticiasList.style.display = "none"
        error.innerHTML = "<div class='error'><h3>Nao há noticias para esta categoria.</h3></div>";

      }else{

        noticiasList.style.display = "block"
        error.innerHTML = "";

      var iconList;

      $.each(result, function (index, item) {

        if(item.link.indexOf('pdf') > -1){
            iconList = '<a href="'+item.link+'" target="_blank"><i class="icon-noticias-list zmdi zmdi-collection-pdf"></i></a>'
        }else if(item.link.indexOf('mp4') > -1){
            iconList = '<a href="'+item.link+'" target="_blank"><i class="icon-noticias-list zmdi zmdi-tv-play"></i></a>';
        }else if(item.link.indexOf('http') > -1){
            iconList = '<a href="'+item.link+'" target="_blank"><i class="icon-noticias-list zmdi zmdi-open-in-browser"></i></a>';
        }else{
            iconList = '<i class="icon-noticias-list disabled zmdi zmdi-format-subject"></i>'
        }
        html += "<ons-list-item modifier='chevron' tappable class='list-item-noticias'>" +
        '<div class="left">'+iconList+'</i></div>'+
        "<div class='center' id=" + index + " onClick=goToNewsText(this)><span class='ons-list__title'>" + item.titulo + "</span><span class='list-item__subtitle'>" +
        item.publicacao + '</span></div><div class="right" id=' + index + ' onClick=goToNewsTextTab(this)></div></ons-list-item>';
    });

        noticiasList.innerHTML = html;

    //  for(var i = 0; i < els.length; i++){
    //      els[i].addEventListener('click', function(e){
    //          noticiaIndex = e.target.parentNode.parentNode.id;
    //          console.log(e.target)
    //          console.log(noticiaIndex)
    //          if(noticiaIndex !== "noticias-list" || noticiaIndex !== ""){
    //              fn.load("noticia-texto.html"); 
    //          }
    //      });
    //  }   

    }
  }
}

const removeNotifications = function(){

    var url = 'https://services.manchete.pt:8002/Clientes.asmx/DeleteNotifications?user=' + login + '&password=' + pass + '&callback=&deviceType=' + cordova.platformId + '&deviceToken='+registrationId;
            
    console.log("Removing notifications from DB and Device");
    console.log('token logout is: ' + registrationId)

    $.ajax({
        
        url: url,
        dataType: "text",
        async: true,
        success: function (result) {
            ajax.parseJSON(result);
        },
        error: function (request, error) {
            console.log('Erro ao deletar token do sevidor.');
        }
    })

    var ajax = {
        parseJSON: function (result) {
            console.log(result);
        }               
    }
}



const sendEmail = function (newId, tipo){

    var name = document.getElementById("nameShare").value;
    var emailDestination = document.getElementById("emailShare").value;
    var message = document.getElementById("messageShare").value;
  
    var url = "https://services.manchete.pt:8002/Clientes.asmx/sendnewByEmail?newId="+newId+"&tipo="+tipo+"&emailSender="+login+"&emailDestination="+emailDestination+"&nameDestination="+name+"&message="+message+"&user="+login+"&password="+pass+"&callback=";

    var urlEncoded = encodeURI(url);
    console.log(urlEncoded);
    var request = new XMLHttpRequest();
    request.open('GET', urlEncoded);
    request.responseType = 'text';
    request.send();

    request.onload = function () {

        document.getElementById('my-alert-dialog').hide();
        console.log("Email enviado.");

    }

}



const loadUser = function(){

    console.log("loading user")

    var requestURL = 'https://services.manchete.pt:8002/Clientes.asmx/AuthenticateLogin?user=' + login + '&password=' + pass + '&callback=&deviceType=&deviceToken=';
    
    var request = new XMLHttpRequest();

        request.open('GET', requestURL);
        request.responseType = 'text';
        request.send();

        request.onload = function () {

            var userText = request.response;
            
            userText = userText.substring(1, userText.length - 1);

            var data = JSON.parse(userText);

            document.querySelector('#nome-utilizador').innerHTML = "Olá, <b>"+data.nomecliente +"</b>";
            
            var logo = document.createElement('img');

            logo.setAttribute("width", "100px");

            user.logo = data.logo;

        }
}

loadUser();






// function guardarFavoritos() {
//   console.log("Entrando na funcao: " + noticias[noticiaID].titulo);
//       var noticia = savedId;
//       console.log("noticia fav "+ noticia);
//       var listaFavoritos = storage.getItem('lista-favoritos');

//       if (listaFavoritos == null) {
//           listaFavoritos = [];
//       } else {
//           listaFavoritos = JSON.parse(listaFavoritos);
//       }
      
//       listaFavoritos.push(noticia);
//       storage.setItem('lista-favoritos', JSON.stringify(listaFavoritos));
//       alert('Notícia em favoritos');
//       console.log("console 1: " + storage.getItem('lista-favoritos'));
//       console.log(JSON.parse(storage.getItem('lista-favoritos')));
// }





  