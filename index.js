	var app = angular.module('myApp', []);
	
	var tutorDate = new Date()
	var month = tutorDate.getMonth()+1
	var day = tutorDate.getDate()
	var formatDate = month+"/"+day
				
				
	
			 
		
		app.controller('myCtrl', function($scope) {
			var cookieArray = document.cookie.split(",")
			$scope.tutorName = cookieArray[0]
			$scope.email = cookieArray[1]
			console.log(document.cookie)
		
			$scope.emailInstructions="Format: first name, last name, student ID, drop-in/pass peer, subject, start time, end time%0D%0A";
		
		$scope.date = formatDate;
		$scope.resetBoxes = function(){
			$scope.firstName="";$scope.lastName="";$scope.studentID="";$scope.type="";$scope.subject="";$scope.startTime="";$scope.endTime="";
		}
		
		$scope.updateArray = function() {
			return $scope.firstName+" "+$scope.lastName+" "+$scope.studentID+" "+$scope.type+" "+$scope.subject+" "+$scope.startTime+" "+$scope.endTime;
			//var arr = [$scope.firstName, $scope.lastName, $scope.studentID, $scope.type, $scope.subject, $scope.startTime, $scope.endTime]
			//var string="";
			//for (var i=0; i<arr.length; i++){
				//if (arr[i]!=""){
					//string+=arr[i]+", "
				//}
			//}
			//$scope.array=string.slice(-2);
			//return $scope.array;
		}
		
		$scope.resetBoxes()
		$scope.updateArray()
		$scope.personList=[];
		$scope.personList.toString = function toString(){
			var string="";
			for (var i = 0; i < $scope.personList.length; i++){
				string += $scope.personList[i].toString() + "\n"
			}
			return string;
		}
		$scope.personList.toEmail = function toEmail(){
			
			
		
			var string="";
			for (var i = 0; i < $scope.personList.length; i++){
				string += $scope.personList[i].toString() + "%0D%0A"
			}
			return string;
		}
		
		
		
	$scope.addToList = function() {
        var person = {firstName: $scope.firstName, lastName: $scope.lastName, studentID: $scope.studentID, type: $scope.type, subject: $scope.subject, startTime: $scope.startTime, endTime: $scope.endTime}
		person.toString=function toString(){
			return this.firstName+", "+this.lastName+", "+this.studentID+", "+this.type+", "+this.subject+", "+this.startTime+", "+this.endTime;
		}
		$scope.personList.push(person)
		console.log(person.toString())
		console.log($scope.personList.toString())
		$scope.resetBoxes()
    }
	
	$scope.getList = function(){
		return $scope.personList.toString();
	}
	
	$scope.getEmail = function(){
		return $scope.personList.toEmail();
	}
	
	$scope.setStudent = function(){
		console.log("Setting student")
	}
	
	$scope.finish = function(){
		var name = $scope.tutorName;
		var email = $scope.email;
		var set = "name="+name+",email="+email;
		document.cookie = set
	}

});