(function(){
	angular
		.module('BarTindrApp')
		.controller('FoodController', ['$http', '$scope', '$q', FoodController]);

	function FoodController($http, $scope, $q) {
		$scope.everythingWeNeed = [];
		$scope.getPlaces = getPlaces
	function getPlaces(lat, lng, radius, section) {
		var promises = [];
		
		var clientInfo = {
			clientId: 'QVSPFCY2CMP0LWO1NDRQIBN523IOX22IYTQGG02RSIJTJTOE',
			clientSecret: '3MKDIXJAHAVOPV2YLIROCEQG1WXBWUXVYUIFCOGSOISHA1GD',
			version: '20150822'
		}


		$.ajax({
			method: "GET",
			url: 'https://api.foursquare.com/v2/venues/explore?ll=' 
				+ lat + ',' 
				+ lng + 
				'&section=' + section 
				+ '&venuePhotos=1&radius=' + radius 
				+ '&offset=0&limit=50&client_id=QVSPFCY2CMP0LWO1NDRQIBN523IOX22IYTQGG02RSIJTJTOE&client_secret=3MKDIXJAHAVOPV2YLIROCEQG1WXBWUXVYUIFCOGSOISHA1GD&v=20150822'
		}).success(function(data){
			console.log(data);
			var totalResults = Math.trunc(parseInt((data.response.totalResults/50)) + 1);
			for(i = 0; i < totalResults; i++){
				promises.push($.ajax({
					method: 'GET', 
					url: 'https://api.foursquare.com/v2/venues/explore?ll=' 
					+ lat + ',' 
					+ lng + 
					'&section=' + section 
					+ '&venuePhotos=1&radius=' + radius 
					+ '&offset=' + (i * 50) + '&limit=50' 
					+ '&client_id=QVSPFCY2CMP0LWO1NDRQIBN523IOX22IYTQGG02RSIJTJTOE&client_secret=3MKDIXJAHAVOPV2YLIROCEQG1WXBWUXVYUIFCOGSOISHA1GD&v=20150822'
				}));
			}
			$q.all(promises).then(success, fail);

			var placeInfo = {};
			function success(data) {
				console.log(data);
				data.forEach(function(dat) {
					dat.response.groups[0].items.forEach(function(da) {
						placeInfo = {
							name: da.venue.name,
							rating: da.venue.rating,
							hours: da.venue.hours,
							phone: da.venue.contact.formattedPhone,
							address: da.venue.location.address,
							city: da.venue.location.city,
							state: da.venue.location.state,
							zip: da.venue.location.postalCode,
							crossStreet: da.venue.location.crossStreet,
							fullAddress: da.venue.location.formattedAddress[0] + " " +  da.venue.location.formattedAddress[1],
							distance: da.venue.location.distance,
							latitude: da.venue.location.lat,
							longitude: da.venue.location.lng,
							websiteUrl: da.venue.url,
							tier: da.venue.price,
							category: da.venue.categories[0].name,
							imageUrl: da.venue.featuredPhotos
 						};
 						$scope.everythingWeNeed.push(placeInfo);
					})
				})
				$scope.places = data;
				console.log($scope.everythingWeNeed);
			}

			function fail(data) {
				console.log(data);
			} 	
		})
	
	}

		$http({
			method: 'GET',
			url: "http://localhost:52355/api/places"
		}).success(function(data){
			console.log(data);
			getPlaces(data.locations[0].latitude, data.locations[0].longitude, data.locations[0].radius, 'food');
		}).error(function(data){
			console.log(data);
		});	

	}



})()