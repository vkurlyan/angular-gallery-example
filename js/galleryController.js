var myApp = angular.module('myApp',[]);

myApp.controller('galleryCtrl', ['$scope', '$http', function($scope, $http) {
	var feedUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK&tags=christmas';

	$scope.tags = [
		{name: 'Night'},
		{name: 'New'},
		{name: 'Xmas'},
		{name: 'Winter'}
	];

	$http({
		method: 'jsonp',
		url: feedUrl
	}).then(function successCallback(response) {
	    $scope.photos = $scope.photosStore = response.data.items;
	}, function errorCallback(response) {
	    console.log(response.statusText);
	});

	$scope.filterTag = function(tag){
		if (tag.isSelected) {
			tag.isSelected = false;
			$scope.photos = $scope.photosStore;
			return;
		}

		var tagName = tag.name.toLowerCase();

		$scope.tags.forEach(function(el){
			el.isSelected = false;
		});
		tag.isSelected = true;

		$scope.photos = $scope.photosStore.filter(function(el){
			return (el.tags.toLowerCase().split(' ').indexOf(tagName) !== -1);
		});
	}
}]);