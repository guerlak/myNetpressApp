
var runUserInfo = function(){

    var requestURL = 'https://services.manchete.pt:8002/Clientes.asmx/AuthenticateLogin?user=' + login + '&password=' + pass + '&callback=&deviceType=&deviceToken=';
    
    var request = new XMLHttpRequest();

        request.open('GET', requestURL);
        request.responseType = 'text';
        request.send();

        request.onload = function () {

            var userText = request.response;
            console.log(userText)
            userText = userText.substring(1, userText.length - 1);

            var user = JSON.parse(userText);
            
            var logo = document.createElement('img');

            logo.setAttribute("width", "100px");
            logo.src = user.logo;

            var html = "<ons-list-item><img id='user-info-logo' width='170px' src=" + user.logo + "></ons-list-item>"+
            "<ons-list-item>" + user.nomecliente + "</ons-list-item><ons-list-item>" + user.mail + "</ons-list-item><ons-list-item>" + user.nomeacesso + "</ons-list-item>";

            var collection = document.querySelector('#user-info-list');

            collection.innerHTML = html;
            modal.hide();

        }

        const isNotificationChecked = function(){


            let getStateNotificationURL = 'https://services.manchete.pt:8002/Clientes.asmx/StateNotifications?user=' + login + '&password=' + pass + '&callback=""&deviceType='+ device.platform +'&deviceToken='+registrationId;
            let request = new XMLHttpRequest();
    
                request.open('GET', getStateNotificationURL);
                request.responseType = 'text';
                request.send();
    
                request.onload = function () {
    
                    var stateText = request.response;
                    stateText = stateText.substring(3, stateText.length - 1);
    
                    console.log(stateText)
    
                   var state = JSON.parse(stateText);
                   const n = document.getElementById('notification-state');

                   if(state.estadoNot === "true"){
                       console.log("returning true");
                       n.innerHTML = "<ons-list-item><div class='center'><b>Notificações</b></div><div class='right'><ons-switch id='checkNoti' checked onchange='toggleNotification()'></ons-switch></div></ons-list-item>";
                       
                   }else{
                       console.log("returning false")
                       n.innerHTML = "<ons-list-item><div class='center'><b>Notificações</b></div><div class='right'><ons-switch id='checkNoti' onchange='toggleNotification()'></ons-switch></div></ons-list-item>";
                       
                   }
                
            }
        }
    
        isNotificationChecked();

    }

    

    
