
var storage = window.localStorage;
var modal = document.querySelector('ons-modal');
var myNavigator = document.getElementById('myNavigator');
var registrationId = storage.getItem('registrationId');

var date = new Date();
var dataInicio = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

var d = new Date();
    d.setDate(d.getDate() + 1); 
var  dataFim = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate());

var user = {
    logo: "",
    nomecliente: "",
    email: "",
    nomeacesso: "",
    authenticated: false
}


var login = storage.getItem('userLogin');
var pass = storage.getItem('userPass');

var checkAuth = function(log, pass){
    if(log && pass){
        user.authenticated = true;
    }else{
        user.authenticated = false;
    }
}

checkAuth(login, pass);

window.fn = {};
window.fn.open = function() {

var menu = document.getElementById('menu');
    menu.open();
};

window.fn.load = function(page) {
    myNavigator.pushPage(page);
    menu.close();
}

var authUser =  function(l, p){

    storage.setItem("userLogin", l);
    storage.setItem("userPass", p);
    login = l;
    pass = p;
    user.authenticated = true;
    loadUser(login, pass);
    ons.notification.toast('Bem vindo a Manchete', {
        timeout: 3000
    });
    myNavigator.resetToPage("tab-bar-home.html");
}

var isAuthenticated = function(u){
    var result;
        if(!u.authenticated){
            result = false;
        }else{
            result = true;
        }
        return result;
}


function loadUser(l, p){

    if(user.authenticated){

        var requestURL = 'https://services.manchete.pt:8002/Clientes.asmx/AuthenticateLogin?user=' + l + '&password=' + p + '&callback=&deviceType=&deviceToken=';
        var request = new XMLHttpRequest();

        console.log(requestURL)

        request.open('GET', requestURL);
        request.responseType = 'text';
        request.send();

        request.onload = function () {

            if(request.status === 500){

                ons.notification.alert('Ocorreu um erro ao buscar o utilizador em nossos servidores', {
                    title: "Server error"
                });
                
            }else{

            var userText = request.response;
                userText = userText.substring(1, userText.length - 1);
            var data = JSON.parse(userText);
                document.querySelector('#nome-utilizador').innerHTML = "Olá, <b>"+data.nomecliente+"</b>";
                
                user.logo = data.logo;
                user.email = data.mail;
                user.nomecliente = data.nomecliente;
                user.nomeacesso = data.nomeacesso;

            }
        }

    } else {
        console.log("User not auth in loadUser fn...")
    }
}


var logout = function() {

    ons.notification.confirm({
        message: "Pretende sair da aplicação?",
        title: "Logout",
        cancelable: false,
        callback: function(answer) {
            if (answer) { 
                storage.removeItem('userLogin');
                storage.removeItem('userPass');
                removeNotifications();
                login = "";
                pass = "";
                user.authenticated = false;
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


var sendEmail = function (newId, tipo){

    var name = document.getElementById("nameShare").value;
    var emailDestination = document.getElementById("emailShare").value;
    var message = document.getElementById("messageShare").value;


    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var emailRegex = reg.test(emailDestination.toLowerCase().trim());

    if(!emailRegex){

        ons.notification.toast('Favor inserir um email válido.', {
            timeout: 3000
        })

    }else{
  
        var emailUrl = "https://services.manchete.pt:8002/Clientes.asmx/sendnewByEmail?newId="+newId+"&tipo="+tipo+"&emailSender="+login+"&emailDestination="+emailDestination+"&nameDestination="+name+"&message="+message+"&user="+login+"&password="+pass+"&callback=";

        var urlEncoded = encodeURI(emailUrl);
        var request = new XMLHttpRequest();
        request.open('GET', urlEncoded);
        request.send();

        request.onload = function () {
            document.querySelector('ons-alert-dialog').hide();
            ons.notification.toast('Email enviado.', {
                timeout: 3000
            })
        }
    }
}

function showLoading(){
    document.querySelector('.loading').innerHTML = '<div id="loading" class="progress-bar progress-bar--indeterminate">';   
}

function hideLoading(){
    document.querySelector('.loading').innerHTML = '';
}

function checkConnection() {
    var networkState = navigator.connection.type;

    if(networkState == "none"){
        ons.notification.alert({
            message: "Sem conexão a internet, verifique sua rede.",
            title: "Sem conexão",
            cancelable: false
    })
    }
}

loadUser(login, pass);

document.addEventListener('deviceready', checkConnection, false);

