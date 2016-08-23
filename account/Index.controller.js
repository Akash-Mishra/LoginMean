(function () {
	'use strict';
	angular.module('app')
	       .controller('Account.IndexController', Controller);
	       function Controller($window, UserService, FlashService) {
	       	var vm = this;

	       	vm.user = null;
	       	vm.saveUser = saveUser;
	       	vm.deleteUser = deleteUser;

	       	initController();

	       	function initController() {
	       		// get Current user
	       		UserService.getCurrent().then(function (user) {
	       			vm.user = user;
	       		});
	       	}

	       	function saveUser(){
	       		UserService.Update(vm.user)
	       		    .then(function () {
	       		    	FlashService.Success('User Updated!');
	       		    })
	       		    .catch(function (error) {
	       		    	FlashService.error(error);
	       		    });
	       	}

	       	function deleteUser(){
	       		UserService.Delete(vm.user._id)
	       		    .then(function () {
	       		    	// log User out
	       		    	$window.location = '/login';
	       		    })
	       		    .catch(function (error) {
	       		    	FlashService.error(error);
	       		    });
	       	}
	       }
})();