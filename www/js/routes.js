angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
    .state('homePage', {
      url: '/homepage',
      templateUrl: 'templates/homePage.html',
      controller: 'homePageCtrl'
    })
        
    .state('detailsPage', {
      url: '/detailsPage',
      templateUrl: 'templates/detailsPage.html',
      controller: 'detailsPageCtrl'
    }) 
        
    .state('searchPage', {
      url: '/searchPage',
      templateUrl: 'templates/searchPage.html',
      controller: 'searchPageCtrl'
    })

    .state('resultsPage', {
      url: '/resultsPage',
      templateUrl: 'templates/resultsPage.html',
      controller: 'resultsPageCtrl'
    })

    .state('bookingPage', {
      url: '/bookingPage',
      templateUrl: 'templates/bookingPage.html',
      controller: 'bookingPageCtrl'
    })
        
    .state('unlockPage', {
      url: '/unlockPage',
      templateUrl: 'templates/unlockPage.html',
      controller: 'unlockPageCtrl'
    })

    .state('acPage', {
      url: '/acPage',
      templateUrl: 'templates/acPage.html',
      controller: 'acPageCtrl'
    })

    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/homepage');

});