var app = {
    
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {

        this.receivedEvent('deviceready');

        console.log("running index.js")

        const push = PushNotification.init({
            android: {
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },

            windows: {}
            
        });

        push.on('registration', function(data) {
      
            var oldRegId = localStorage.getItem('registrationId');

            console.log("Registration ID: "+ data.registrationId);
     
            if (oldRegId !== data.registrationId) {
                console.log("New registration id added.")
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }
        });
       
        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
           
            navigator.notification.alert(
              data.message,         // message
              null,                 // callback
              data.title,           // title
              'Ok'                  // buttonName
            );
          });

        if (ons.platform.isIPhoneX()) { // Utility function
            // Add empty attribute to the <html> element
            document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
          }

       
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
}
app.initialize();
