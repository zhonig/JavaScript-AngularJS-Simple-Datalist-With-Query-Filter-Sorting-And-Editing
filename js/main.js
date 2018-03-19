//Declare angular module mainApp -- include xeditable for editing route and ui bootstrap
let mainApp = angular.module("mainApp", ["xeditable", "ui.bootstrap"]);

//Specify bootstrap 3 theme
mainApp.run(['editableOptions', function(editableOptions) {
	
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

}]);

//Declare clients controller within mainApp module
mainApp.controller('clientsController', function ($scope, $http) {
	
	//Get Clients JSON data from clients.json
	$http.get('clients.json').then(function (results) {
		
		//Declare clients in scope
		$scope.clients = results.data;
		
	});
	
	//Set the default columns
	$scope.columns = {
		'firstname': 'First Name',
		'lastname': 'Last Name',
		'dob': 'DOB'
	};
	
	//Set the default sort type
	$scope.sortType = Object.keys($scope.columns)[0];
	
	//Set the default sort order
	$scope.sortReverse = false;
	
	//Set the default query filter
	$scope.query = '';
	
	//On column click, update sorting options
	$scope.updateSortOptions = function (colKey) {
		
		$scope.sortType = colKey;
		$scope.sortReverse = !$scope.sortReverse;
		
	};
	
	$scope.searchTable = function (item, index, items) {
		
		//Store lower case query
		let query = ($scope.query || "").toLowerCase();
		
		//If no query, then display record
		if(!query) {
			return true;
		}
		
		//Store column keys
		let colKeys = Object.keys($scope.columns);
		
		//Traverse through column keys
		for (let colPos = 0; colPos < colKeys.length; colPos++) {
			
			//Store current column key
			let key = colKeys[colPos];
			
			//Store current column value
			let value = (key === 'dob' ? new Date(item[key]).toLocaleDateString() : item[key]).toLowerCase();
			
			//If current column value starts with query, then display record
			if(value.startsWith(query)) {
				return true;
			}
			
		}
		
		//Do not display record
		return false;
		
	};
	
	//Bootstrap UI Date XEditable Opened
	$scope.opened = {};

	//Bootstrap UI Date XEditable Open
	$scope.open = function($event, elementOpened) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened[elementOpened] = !$scope.opened[elementOpened];
	};
	
	//After save of changed value, update clients.json file
	$scope.updateClient = function() {
		//POST to server -- unable to do this without back-end implementation due to browser security
		//return $http.post('clients.json', $scope.clients);
		
		//Being there is no server implemented, we will create a hyperlink file that allows the user to save the json file to their machine
		
		//Select Output container
		let outputEl = document.getElementById('output');
		
		//Convert clients json to json string using angular
		let clientsjsonString = angular.toJson($scope.clients);
		
		//Create hyperlink element
		let aElement = document.createElement('a');
		aElement.href = "data:application/json;charset=UTF-8," + encodeURIComponent(clientsjsonString);
		aElement.innerHTML = "Right-click and choose 'save link as...' --- overwrite clients.json";
		
		//Empty output container
		outputEl.innerHTML = "";
		
		//Append hyperlink element to output container
		outputEl.appendChild(aElement);
	};
	
});