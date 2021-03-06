// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//var controllers = require('./controllers');
//var services = require('./services');
//require('aws-sdk');

//angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',])
angular.module('starter', ['ionic','starter.controllers', 'starter.services'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: ''
      }
    }
  })

  .state('tab.menu', {
      url: '/menu',
      views: {
        'tab-menu': {
          templateUrl: 'templates/tab-menu.html',
          controller: 'MenuCtrl'
        }
      }
    })
    .state('tab.menu-detail', {
      url: '/menu/:choiceId',
      views: {
        'tab-menu': {
          templateUrl: 'templates/menu-detail.html',
          controller: 'MenuDetailCtrl'
        }
      }
    })

   .state('tab.item-customization', {
      url: '/menu/:menuId/:itemId',
      views: {
        'tab-menu': {
          templateUrl: 'templates/item-customization.html',
          controller:'CustomizationsCtrl'

        }
      }
    })

  .state('tab.checkout', {
    cache: false, // added to reload controller
    url: '/checkout',
    views: {
      'tab-checkout': {
        templateUrl: 'templates/tab-checkout.html',
        controller: 'CheckoutCtrl'
      }
    }
  })

   .state('tab.checkout-confirmation', {
    url: '/checkout/confirmation',
      cache: false, // added to reload controller
    views: {
      'tab-checkout': {
        templateUrl: 'templates/item-confirmation.html',
        controller: 'CheckoutCtrl'
      }
    }
  })

  .state('tab.checkout-thankYou', {
    cache: false, // added to reload controller
    url: '/checkout/confirmation/thankYou',
    views: {
      'tab-checkout': {
        templateUrl: 'templates/item-thankYou.html',
        controller: ''
      }
    }
  })

  .state('tab.orders', {
  cache: false,
    url: '/orders',
    views: {
      'tab-orders': {
        templateUrl: 'templates/tab-orders.html',
        controller: 'OrdersCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
