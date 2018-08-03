const storage = window.localStorage;
const modal = document.querySelector('ons-modal');
const myNavigator = document.getElementById('myNavigator');
const registrationId = storage.getItem('registrationId');

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

    console.log("Loading user...")

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
        
    }
        
}
    








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





  