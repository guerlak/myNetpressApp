
var runUserInfo = function(){

    if(!checkAuth()){
        myNavigator.pushPage('login.html');
    } ;

    modal.show();

    var requestURL = 'https://services.manchete.pt:8002/Clientes.asmx/AuthenticateLogin?user=' + login + '&password=' + pass + '&callback=""&deviceType=""&deviceToken=""';
    
    var request = new XMLHttpRequest();

        request.open('GET', requestURL);
        request.responseType = 'text';
        request.send();

        request.onload = function () {

            var userText = request.response;
            userText = userText.substring(3, userText.length - 1);

            var user = JSON.parse(userText);
            var img = document.querySelector('#user-logo');
            var logo = document.createElement('img');

            logo.setAttribute("width", "100px");
            logo.src = user.logo;

            var html = "<ons-list-item><img id='user-info-logo' width='170px' src=" + user.logo + "></ons-list-item>"+
            "<ons-list-item>" + user.nomecliente + "</ons-list-item><ons-list-item>" + user.mail + "</ons-list-item><ons-list-item>" + user.nomeacesso + "</ons-list-item>";

            var collection = document.querySelector('#user-info-list');

            collection.innerHTML = html;

            modal.hide();

        }
    }


    
