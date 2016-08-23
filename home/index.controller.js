( function () {
	'use strict';

	angular
	    .module('app')
	    .controller('Home.IndexController', Controller);

	function Controller(UserService) {
		var vm = this;

		vm.user = null;

		initController();

		function initController(){
			// get Current users
			UserService.GetCurrent().then(function (user) {
				vm.user = user;
			});
		}
	}
})();