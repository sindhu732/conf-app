window.serverPath = "http://192.168.0.9:1880";
window.hostid = "sindhu@moonraft.com"
angular.module('app.controllers', [])
  
.controller('homePageCtrl', function($rootScope, $scope, $http, $window) {
	$rootScope.trial = 'trial 1';
	$http({
	  method: 'GET',
	  url: serverPath + '/getConf?'+'email=' + hostid
	}).then(function successCallback(response) {
		console.log(response);
	    $scope.booked = response.data;
	  }, function errorCallback(response) {
	    console.log("Couldn't get cards for homepage " + response);
	  });

	$scope.selectTile = function(index) {
		console.log("Selected a meeting " + index + $scope.booked[index]);
		$rootScope.selectedTile = $scope.booked[index];
	}
})
   
.controller('detailsPageCtrl', function($rootScope, $scope) {
	$scope.detail = $rootScope.selectedTile;

	$scope.unlock = function() {
		$rootScope.unlockDetail = ["/"+$scope.detail.room_id, $scope.detail.startTime];
		console.log("Unlocking " + $rootScope.unlockDetail);
	}

	$scope.ac = function() {

	}

	$scope.cancel = function() {

	}
})
   
.controller('searchPageCtrl', function($rootScope, $scope, $http) {
	console.log($rootScope.trial);
	$rootScope.trial = 'trial 2';
	$scope.findConf = function(date, startTime, endTime) {
		/*var startTime = $scope.sThours + $scope.sTquarters;
		var endTime = $scope.eThours + $scope.eTquarters;*/
		dateOnly = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		var req = {
			method: 'GET',
			url: serverPath + '/findConf?' + 'date=' + dateOnly + '&startTime=' + startTime + '&endTime=' + endTime
		}
		console.log(req);
		$http(req).then(function successCallback(response) {
			$rootScope.searchResults = response.data;
			console.log($rootScope.searchResults);
		}, function errorCallback(response) {
			console.log("Could not find any conf rooms " + response);
		})
	}
})
 
.controller('acPageCtrl', function($scope) {
	$scope.acControl = function() {
		console.log("AC control to be developed yet");
	}

})

.controller('unlockPageCtrl', function($rootScope, $scope, $http) {
	var topicMsg = $rootScope.unlockDetail;
	console.log("Topic and message " + topicMsg);
	var unlocked = false;
	// unlock ? true(1, yes) and false(0, lock, no)
	$scope.unlockControl = function() {
		if(unlocked == false) {
			unlocked = true;
			var req = {
				method: 'POST',
				url: serverPath + '/unlock',
				data: {
					topic: topicMsg[0],
					message: topicMsg[1]
				}
			};
			console.log("Unlock request " + req);
			$http(req).then(function(response) {
				console.log(response);
			})
		}
		else {
			alert("Already unlocked");
		}
	}

})

.controller('resultsPageCtrl', function($rootScope, $scope) {
	console.log($rootScope.trial);
	$scope.results = $rootScope.searchResults;
	console.log("Got results " + $scope.results);
	$scope.selectTile = function(index) {
		$rootScope.trial = 'trial 3';
		console.log("Card selected " + index + $scope.rooms[index]);
		$rootScope.selectedTile = $scope.rooms[index];
	}
})

.controller('bookingPageCtrl', function($rootScope, $scope, $window) {
	console.log($rootScope.trial);
	$scope.detail = $rootScope.selectedTile;
	console.log("Displaying " + $scope.detail);
	$scope.book = function() {
		var req = {
			method: 'POST',
			url: serverPath + '/bookConf',
			data: {
				host_id: window.hostid,
				room_id: 'The Big Conference Room',
				date: '2016-03-02',
				startTime: '1200',
				endTime: '1400',
				meeting: {
					title: 'integration',
					description: 'Door lock integration',
					attendees: ['Sindhu', 'Umang']
				}
			},
			headers: {'Content-Type': 'application/json'}
		};
		http(req).then(function successCallback(response) {
			console.log("Booked " + response);
		}, function errorCallback(response) {
			console.log("Could not book conf rooms " + response);
		})
	}
})

