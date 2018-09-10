
var runUserInfo = function(){

    var html = "<ons-list-item><img id='user-info-logo' width='170px' src=" + user.logo + "></ons-list-item>"+
    "<ons-list-item>" + user.nomecliente + "</ons-list-item><ons-list-item>" + user.email + "</ons-list-item><ons-list-item>" + user.nomeacesso + "</ons-list-item>";

    var userInfo = document.querySelector('#user-info-list');

    userInfo.innerHTML = html;
    isNotificationChecked();

}