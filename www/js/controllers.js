angular.module('starter.controllers', [])

.controller('AppCtrl', function(Menus,$rootScope, $scope, $ionicModal, $timeout, $http, $sce, $ionicNavBarDelegate) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //$scope.rightMenu = "";
  $rootScope.leftMenu_auto = "";

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $rootScope.isArray = function(link){
    //console.log("check array"+link);
    if(link.constructor === Array){
      return true;
    }
    else{
      return false;
    }
  }

  //check the link in menu if it is link or array
  $rootScope.checkLink = function(rootLink,link){

    var decodedLink = decodeURIComponent(link).replace("&amp;","&");
    //not submenu
    if(link.substr(0, 2) != "[{"){
      //from other http
      if(link.substr(0, 4) == "http"){
        $rootScope.loadpage(decodedLink);
      }
      else{
        $rootScope.loadpage(rootLink+decodedLink);
      }
    }
    //with submenu
    else{
      //console.log("arrays");
    }
  }

  $rootScope.hasSubmenu = function(rootLink,link){
  }

  //set menu icon
  $rootScope.setSideMenu = function(){
    $timeout(function(){
      //console.log('inside icon function!');
      if($rootScope.systemSetting.left_menu_type == "auto"){
        Menus.getMarkers($rootScope.systemSetting.left_menu_api_url).then( function(result) {
          console.log(result);
          $rootScope.leftMenu_auto = result;
          $rootScope.setSideMenu2();
         });
      }
      //manual
      else{
        $rootScope.setSideMenu2();
      }
    }, 100);

  };

  $rootScope.setSideMenu2 = function(){
    if($rootScope.systemSetting.left_menu == "menu"){
      //left side menu
      //console.log('inside left if!');
      if($rootScope.systemSetting.left_menu_icon){
        //console.log('yes icon left menu!');
        if($rootScope.systemSetting.left_menu_icon_position == "left"){
          //console.log('left side!');
          $rootScope.leftMenuClass = "left-sidemenu without-submenu item-icon-left item-border-style item item-complex";
          $rootScope.leftMenuWithSubClass = "left-sidemenu with-submenu item-icon-left item-border-style item ng-binding";
        }
        else{
          //console.log('right side!');
          $rootScope.leftMenuClass = "left-sidemenu without-submenu item-icon-right item-border-style item item-complex";
          $rootScope.leftMenuWithSubClass = "left-sidemenu with-submenu item-icon-right item-border-style item ng-binding";
        }

      }
      else{
        //console.log('no icon left menu!');
        $rootScope.leftMenuClass = "left-sidemenu without-submenu item-border-style item item-complex";
        $rootScope.leftMenuWithSubClass = "left-sidemenu with-submenu item-icon-right item-border-style item ng-binding";
      }

      //assign left side
      $timeout(function(){
        var list = document.getElementsByClassName("left-sidemenu without-submenu");
        //console.log(list);
        //console.log(list.length);
        for(var i =0 ; i < list.length ;i++){
          //console.log("buat kiri");
          list[i].className = $rootScope.leftMenuClass;
        }

        var list = document.getElementsByClassName("left-sidemenu with-submenu");
        //console.log(list);
        //console.log(list.length);
        for(var i =0 ; i < list.length ;i++){
          //console.log("buat kiri");
          list[i].className = $rootScope.leftMenuWithSubClass;
        }
      }, 100);
    }

    if($rootScope.systemSetting.right_menu == "menu"){
      //$scope.rightMenu = "menu";
      //right side menu
      if($rootScope.systemSetting.right_menu_icon){
        if($rootScope.systemSetting.right_menu_icon_position == "left"){
          $rootScope.rightMenuClass = "right-sidemenu item-icon-left item-border-style item item-complex";
        }
        else{
          $rootScope.rightMenuClass = "right-sidemenu item-icon-right item-border-style item item-complex";
        }

      }
      else{
        $rootScope.rightMenuClass = "right-sidemenu item-border-style item item-complex";
      }

      //assign right side
      var list = document.getElementsByClassName("right-sidemenu");
      elementArray = [].slice.call(list, 0);
      for(var i=0;i<elementArray.length;i++){
        list[i].className = $rootScope.rightMenuClass;
      }
    }
  }

  $rootScope.decodeText = function(text) {
    return decodeURIComponent(text).replace("&amp;","&");
  }


  $scope.$on('$ionicView.enter', function()
  {
      $timeout(function()
      {
          $ionicNavBarDelegate.align($rootScope.systemSetting.header_align);
      });
  });

  $rootScope.loadpage = function( CallURL ) {
    $rootScope.system_callurl = CallURL;
    $rootScope.dwloadurl = "";
    //console.log($rootScope.system_callurl);
    $rootScope.dwloadurl = $sce.trustAsResourceUrl($rootScope.system_callurl);
  };

  //set tab icon position
  $rootScope.setTabType = function() {
    if($rootScope.systemSetting.bottom_menu_icon == "icon")
      return "tabs-icon-only";
    else if($rootScope.systemSetting.bottom_menu_icon == "top")
      return "tabs-icon-top";
    else if($rootScope.systemSetting.bottom_menu_icon == "left")
      return "tabs-icon-left";
    else if($rootScope.systemSetting.bottom_menu_icon == "right")
      return "tabs-icon-right";
    else if($rootScope.systemSetting.bottom_menu_icon == "bottom")
      return "tabs-icon-bottom";
  };

  //set icon for tabs if not none
  $rootScope.setTabIcon = function(icon) {
    if($rootScope.systemSetting.bottom_menu_icon == "none")
      return "";
    else
      return icon;
  };






// not used from bottom here

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('load_ctrl', function($rootScope, $scope, $sce) {
            //alert($rootScope.system_callurl);
            //$rootScope.dwloadurl = $sce.trustAsResourceUrl($rootScope.system_callurl);
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
