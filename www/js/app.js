//CLOONE NOTE.
//This app is developed using code-push plugin with 'cloonegit' Github account so that updates can be easily implemented without pushing the apps to play store.
//For more information, visit https://github.com/Microsoft/cordova-plugin-code-push on how to use the plugin.
//NOTE : the update does not work if the app version is changed in config.xml
//Regards, Boon.


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform, $rootScope, $http, $sce) {
    $rootScope.system_callurl = "";
    $rootScope.sideMenuIconClass = "left";

     $http.get('setting.json')
     .success(function (data) {
              // The json data will now be in scope.
              $rootScope.systemSetting = data;

              $rootScope.system_callurl = $rootScope.systemSetting.home_url;
              $rootScope.dwloadurl = $sce.trustAsResourceUrl($rootScope.system_callurl);
              //var result = document.getElementById("left-header");
              //angular.element(result).addClass("bar-positive");
              //$scope.system_left_header = "bar-positive";
              //alert( JSON.stringify(data) );
              //alert( $rootScope.systemSetting.left_menu );
              });

  $ionicPlatform.ready(function() {
    codePush.sync();

    window.addEventListener("resume", function () {
      codePush.sync();
    });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });



})

.config(function($ionicConfigProvider){
  $ionicConfigProvider.tabs.position('bottom');
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.load', {
    cache: false,
    url: '/load',
    views: {
      'menuContent': {
        templateUrl: 'templates/load.html',
         controller: 'load_ctrl'
      }
    }
  })


  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/load');
})
.service('Menus', function($http) {
  return {
    getMarkers: function(apiUrl){
        return $http.get(apiUrl).then(function(response){
          return response.data;
      });
    }
  }
});
