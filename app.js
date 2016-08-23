(function () {
	'use strict';

	angular
	    .module('app', ['ui-router'])
	    .config(config)
	    .run(run);

	function config($stateProvider, $urlRouterProvider) {
		// default route
		$urlRouterProvider.otherwise('/');

		$stateProvider
		    .state('home', {
		    	templateUrl: 'home/index.html',
		    	controller: 'Home.IndexController',
		    	controllerAs: 'vm',
		    	data: { activeTab: 'home' }
		    })
		    .state('account', {
		    	url: '/account',
		    	templateUrl: 'account/index.html',
		    	controller: 'Account.IndexController',
		    	controllerAs: 'vm',
		    	data: { activeTab: 'account' }
		    });
	}

	function run($http, $rootscope, $window) {
		// add JWT token as default auth header
		$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

		// update active tabs on state change
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$rootScope.activeTab = toState.data.activeTab;
		});
	}

	// manually bootstrap angular after the jwt token is retrieved from server
	$(function () {
		// get JWT token from the server 
		$.get('/app/token', function(token) {
			window.jwtToken = token;

			angular.bootstrap(document, ['app']);
		});
	});
})();