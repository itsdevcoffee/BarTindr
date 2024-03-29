(function() {
	angular
		.module('BarTindrApp')
		.config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$httpProvider', Config])
		.run(['$rootScope', '$window', '$location', '$state', LoginCheck]);
	//Checks if user is logged in and routes them to the right views
	function LoginCheck($rootScope, $window, $location, $state, $scope) {
		$rootScope.$on('$stateChangeSuccess', function(event, next, current) {
			var userAuthed = $window.sessionStorage.getItem('token');
			if(userAuthed) {
				if(next.url =='/') {
					$location.path('/home');
				}
				if(next.url == '/register') {
					$location.path('/home');
				}
			} else {
				if(next.url != '/intro' && '/') {
					$location.path('/')
				}
			}
		});
	};
	function Config($stateProvider, $routeProvider, $urlRouterProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('login', {
				url: '/',
				templateUrl: 'App/Components/Login/loginView.html',
				controller: 'LoginController'
			})
			.state('register', {
				url: '/register',
				templateUrl: 'App/Components/Register/registerView.html',
				controller: 'RegisterController'
			})
			.state('intro', {
				url: '/intro',
				templateUrl: 'App/Components/Intro/introView.html',
				controller: 'IntroController'
			})
			.state('home', {
				url: '/home',
				templateUrl: 'App/Components/Home/homeView.html',
				controller: 'HomeController'
			})
			.state('location', {
				url: '/location',
				templateUrl: 'App/Components/Location/locationView.html',
				controller: 'LocationController'
			})
			.state('locationAddress', {
				url: '/locationAddress',
				templateUrl: 'App/Components/LocationAddress/locationAddressView.html',
				controller: 'LocationAddressController'
			})
			.state('editCurrent', {
				url: '/editCurrent/:currentId',
				templateUrl: 'App/Components/EditCurrent/editCurrentView.html',
				controller: 'EditCurrentController'
			})
			.state('editAddress', {
				url: '/editAddress/:addressId',
				templateUrl: 'App/Components/EditAddress/editAddressView.html',
				controller: 'EditAddressController'
			})
			.state('food', {
				url: '/food',
				templateUrl: 'App/Components/Food/foodView.html',
				controller: 'FoodController'
			})
			.state('do', {
				url: '/do',
				templateUrl: 'App/Components/Do/doView.html',
				controller: 'DoController'
			})
			.state('drink', {
				url: '/drink',
				templateUrl: 'App/Components/Drink/drinkView.html',
				controller: 'DrinkController'
			})
			.state('shop', {
				url: '/shop',
				templateUrl: 'App/Components/Shop/shopView.html',
				controller: 'ShopController'
			})
			.state('spots', {
				url: '/spots',
				templateUrl: 'App/Components/Spots/spotsView.html',
				controller: 'SpotsController'
			})
			.state('locationList', {
				url: '/locationList',
				templateUrl: 'App/Components/LocationList/locationListView.html',
				controller: 'LocationListController'
			})
			.state('privacyPolicy', {
				url: '/privacyPolicy',
				templateUrl: 'App/Components/Home/privacyPolicy.html'
			});
		$httpProvider.interceptors.push('authService');

	}
})();