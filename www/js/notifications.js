var toggleNotification = function(){

    var notification = document.getElementById('check-notification');
    var url;
    console.log(notification.checked);

    if(!notification.checked){
        console.log("Disable notification")
        url = 'https://services.manchete.pt:8002/Clientes.asmx/ActivateNotifications?user=' + login + '&password=' + pass + '&callback=""&deviceType='+ device.platform +'&deviceToken='+registrationId+'&activate=0';

    }else{
        console.log("Enable notification")
        url = 'https://services.manchete.pt:8002/Clientes.asmx/ActivateNotifications?user=' + login + '&password=' + pass + '&callback=""&deviceType='+ device.platform +'&deviceToken='+registrationId+'&activate=1';
    }

    
    var request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'text';
        request.send();
}


var removeNotifications = function(){

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
            console.log('Erro ao remover token do sevidor -> ', error);
        }
    })

    var ajax = {
        parseJSON: function (result) {
            console.log(result);
        }               
    }
}


var isNotificationChecked = function(){

    var getStateNotificationURL = 'https://services.manchete.pt:8002/Clientes.asmx/StateNotifications?user=' + login + '&password=' + pass + '&callback=""&deviceType='+ device.platform +'&deviceToken='+registrationId;
    var request = new XMLHttpRequest();

    request.open('GET', getStateNotificationURL);
    request.responseType = 'text';
    request.send();

    request.onload = function () {

        var stateText = request.response;
        stateText = stateText.substring(3, stateText.length - 1);

        var state = JSON.parse(stateText);
        var n = document.getElementById('notification-state');


        if(state.estadoNot === "true"){
            console.log("returning true");
            n.innerHTML = "<ons-list-item><div class='center'><b>Notificações</b></div><div class='right'><ons-switch id='check-notification' checked onchange='toggleNotification()'></ons-switch></div></ons-list-item>";
            
        }else{
            console.log("returning false")
            n.innerHTML = "<ons-list-item><div class='center'><b>Notificações</b></div><div class='right'><ons-switch id='check-notification' onchange='toggleNotification()'></ons-switch></div></ons-list-item>";
        }
    }
}
