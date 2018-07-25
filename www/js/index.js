/*
    * Licensed to the Apache Software Foundation (ASF) under one
    * or more contributor license agreements.  See the NOTICE file
    * distributed with this work for additional information
    * regarding copyright ownership.  The ASF licenses this file
    * to you under the Apache License, Version 2.0 (the
    * "License"); you may not use this file except in compliance
    * with the License.  You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing,
    * software distributed under the License is distributed on an
    * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    * KIND, either express or implied.  See the License for the
    * specific language governing permissions and limitations
    * under the License.
 */
var registrationId = ""

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {

        this.receivedEvent('deviceready');
        var push = PushNotification.init({
            android: {},
            browser: {
              pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: true,
                sound: 'false'
            },
          windows: {}
      });
        push.on('registration', function(data) {

            registrationId = data.registrationId;
            console.log("Registration event: " + data.registrationId);
            document.getElementById("regId").innerHTML = data.registrationId;
         
            var oldRegId = localStorage.getItem('registrationId');
            console.log("A PASSAR REGIST MOBILE 111")
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                console.log("A PASSAR REGIST MOBILE")
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

        });
       
        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });


        if (ons.platform.isIPhoneX()) { // Utility function
            // Add empty attribute to the <html> element
            document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
          }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    }
};

app.initialize();
