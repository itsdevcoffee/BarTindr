(function() {
	angular
		.module('BarTindrApp')
		.controller('LoginController', ['$scope', 'loginService', '$window', LoginController]);

	function LoginController($scope, loginService, $window) {

		$scope.loginUser = loginUser;
		$scope.getUser = getUser;


		function loginUser() {
			if($window.sessionStorage.getItem('token') != null) {
			} else {
				loginService.login('chrispena@gmail.com', '123456').then(success, fail);

				function success(data) {
					console.log(data);
				}

				function fail() {

				}
			}
		}

		function getUser() {
			loginService.getUserInfo().then(success,fail);

			function success(data) {
				console.log(data);
			}

			function fail(data) {
				console.log(data);
			}
		}

	}

})();