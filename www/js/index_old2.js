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
       

        if (ons.platform.isIPhoneX()) { 
            document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
          }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

document.addEventListener('deviceready', function () {
     // Enable to debug issues.
     // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    
     var notificationOpenedCallback = function(jsonData) {
       console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
     };
  
     window.plugins.OneSignal
       .startInit("9c2d242d-06ea-4995-bdb5-b7f51a13057c")
       .handleNotificationOpened(notificationOpenedCallback)
       .endInit();
   }, false);


app.initialize();

