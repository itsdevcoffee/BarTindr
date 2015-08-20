(function() {
	angular
		.module('BarTindrApp')
		.controller('LocationController', ['$scope', 'loginService', 'locationService', '$ionicLoading', '$state', '$ionicPopup', LocationController]);
		
	function LocationController($scope, loginService, locationService, $ionicLoading, $state, $ionicPopup) {

		//Functions
		$scope.convertToMeters = convertToMeters;
		$scope.findLocation = findLocation;
		$scope.saveLocation = saveLocation;


		//Variables
		$scope.center = {};
		$scope.paths = {};
		$scope.locationInfo = {};

		$ionicLoading.show({
			template: 'Finding location...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
		});

		function findLocation(save) {
			//Find current location
			locationService.findGeolocation().then(geolocationSuccess, geolocationFail);


			function geolocationSuccess(position) {

				//Get all the location information
				locationService.reverseGeo(position).then(reverseSuccess, reverseFail);

				function reverseSuccess(geocode) {
					$ionicLoading.hide();

					if(save == null) {
						//Define leaflet map center
						$scope.center = {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
							zoom: 10
						};

						$scope.markers = {
							marker: {
								draggable: false,
								message: $scope.locationInfo.name,
								lat: position.coords.latitude,
								lng: position.coords.longitude,
								icon: {}
							}
						};

						$scope.paths = {
							circle: {
								type: 'circle',
								radius: 24140.2,
								miles: 15,
								latlngs: $scope.markers.marker,
								clickable: false
							}
						};
					}


					//Format the address
					var formattedGeocode = locationService.addressFormatter(geocode);

					//Define object to be saved to database
					$scope.locationInfo = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						name: formattedGeocode.name,
						address: formattedGeocode.address,
						city: formattedGeocode.city,
						state: formattedGeocode.state,
						country: formattedGeocode.country,
						zipCode: formattedGeocode.zipCode,
						radius: $scope.paths.circle.radius
					};

					//Overload to save information	
					if(save) {

						//Is loading for the save function
						$ionicLoading.show({
							template: 'Saving ' + $scope.locationInfo.name + '...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>',
							duration: 1000
						});

						locationService.setNewLocation($scope.locationInfo).then(saveSuccess, saveFail);

						function saveSuccess() {
							$ionicLoading.hide();
							$state.go('home');
						}
						function saveFail() {
							$ionicLoading.hide();
							
						}
					}

				}

				function reverseFail(err) {
					console.log(err);
				}
			}

			//Cannot find location
			function geolocationFail(err) {
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: '<h5>Error Locating</h5>',
					template: '<h5 class="text-center">' + err + '</h5>'
				});
			}

		}

		$scope.findLocation();		

		function convertToMeters() {
			//Converts the miles to meters for the leaflet map
			$scope.paths.circle.radius = locationService.convertToMeters($scope.paths.circle.miles);
			//Updates the radius for our main data object	
			$scope.locationInfo.radius = $scope.paths.circle.radius;
		}

		function saveLocation() {
			//Is loading for the save function
			$ionicLoading.show({
				template: 'Saving ' + $scope.locationInfo.name + '...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>',
				duration: 1000
			});
			
			locationService.setNewLocation($scope.locationInfo).then(saveSuccess, saveFail);

			function saveSuccess() {
				$ionicLoading.hide();
				$state.go('home');
			}
			function saveFail() {
				$ionicLoading.hide();
				
			}
		}

		
	}

})();