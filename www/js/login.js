
var loginRun = function(){

    var inputEmail = document.getElementById("email").value;
    var inputPass = document.getElementById("password").value;


    if(inputEmail == "" || inputPass == "") {
        alert("Preencha os campos de login para aceder aplicacao");
        return;

    }  else  {

            const registrationId = storage.getItem('registrationId');

            var url = 'https://services.manchete.pt:8002/Clientes.asmx/AuthenticateLogin?user=' + inputEmail + '&password=' + inputPass + '&callback=&deviceType=' + cordova.platformId + '&deviceToken='+registrationId;
            
            console.log(url);
            console.log('token is: ' + registrationId)

            $.ajax({
                
                url: url,
                dataType: "text",
                async: true,
                success: function (result) {
                    ajax.parseJSON(result);
                    console.log('running');
                },
                error: function (request, error) {
                    alert('Erro ao buscar dados no sevidor, tente mais tarde.');
                }
            });
            
            var ajax = {

                parseJSON: function (result) {

                    result = result.substring(1, result.length - 1);

                    var user = JSON.parse(result);

                    if (user.id == null) {
                        ons.notification.alert({
                            message: "Os dados inseridos não correspondem a um utilizador válido.",
                            title: "Login falhou",
                            cancelable: false
                    })

                    }else if(user.login === "1"){
                        ons.notification.alert({
                            message: "Este utilizador não possui acesso a app. Entre em contacto para mais informações.",
                            title: "Sem acesso",
                            cancelable: false
                    })

                    } else {

                        // ons.notification.toast(cordova.platformId, {
                        //     timeout:1000
                        // });
                    
                        storage.setItem("userLogin", inputEmail);
                        storage.setItem("userPass", inputPass);

                        // if (storage.getItem('lista-favoritos') == null) {
                        //     var listaFavoritos = [];
                        //     storage.setItem('lista-favoritos', listaFavoritos);
                        // }
                        
                        ons.notification.toast('Bem vindo a Manchete', {
                            timeout: 3000
                        });
                        myNavigator.resetToPage("tab-bar-home.html");
                    }               
                }
            }
    }
            
}

