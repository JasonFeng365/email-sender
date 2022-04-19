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
			
			
			$scope.index = 0;
		
		$scope.date = formatDate;
		$scope.resetBoxes = function(){
			$scope.firstName="";$scope.lastName="";$scope.studentID="";$scope.type="";$scope.subject="";$scope.startTime="";$scope.endTime="";
		}
		
		$scope.updateArray = function() {
			return $scope.firstName+" "+$scope.lastName+" "+$scope.studentID+" "+$scope.type+" "+$scope.subject+" "+$scope.startTime+" "+$scope.endTime;
		}
		
		$scope.resetBoxes()
		$scope.updateArray()
		$scope.personList=[];
		
		$scope.currentUpdateIndex = -1;
		
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
		if ($scope.isEmpty()) return;
		
		var person;
		
		if ($scope.currentUpdateIndex == -1) {
			person = {index: $scope.index, firstName: $scope.firstName, lastName: $scope.lastName, studentID: $scope.studentID, type: $scope.type, subject: $scope.subject, startTime: $scope.startTime, endTime: $scope.endTime, fullName: $scope.firstName+" "+$scope.lastName}
			$scope.personList.push(person)
			console.log("New student at index: "+person.index)
			$scope.index++;
		}
	else {
		person = {index: $scope.currentUpdateIndex, firstName: $scope.firstName, lastName: $scope.lastName, studentID: $scope.studentID, type: $scope.type, subject: $scope.subject, startTime: $scope.startTime, endTime: $scope.endTime, fullName: $scope.firstName+" "+$scope.lastName}
		$scope.personList[$scope.currentUpdateIndex] = person;
		$scope.currentUpdateIndex = -1;
		console.log("Updated student at index: "+person.index)
	}
		person.toString=function toString(){
			return this.firstName+", "+this.lastName+", "+this.studentID+", "+this.type+", "+this.subject+", "+this.startTime+", "+this.endTime
			//return this.firstName+", "+this.lastName+", "+this.studentID+", "+this.type+", "+this.subject+", "+this.startTime+", "+this.endTime+". Index: "+this.index;
		}
		
		$scope.resetBoxes()
    }
	
	$scope.getList = function(){
		return $scope.personList.toString();
	}
	
	$scope.getEmail = function(){
		return $scope.personList.toEmail();
	}
	
	$scope.updateStudent = function(){
		console.log("Updating student "+$scope.updatingStudent);
		if ($scope.updatingStudent == null) {
			console.log("null valued student, returning")
			return;
		}
		
		if (!$scope.isEmpty()){
			$scope.addToList();
		}
		
		var student = $scope.updatingStudent;
		$scope.currentUpdateIndex = $scope.updatingStudent.index;
		console.log(	"Updating student at index: "+$scope.currentUpdateIndex);
	    		
		$scope.selectStudent(student);
	}
	
	$scope.deleteStudent = function(){
		if ($scope.updatingStudent == null) {
			console.log("null valued student, returning")
			return;
		}
		
		if (confirm("Delete student "+$scope.updatingStudent.fullName+"?")){
			var index = $scope.updatingStudent.index;
			$scope.personList.splice(index, 1)
			$scope.index--;
			
			
			for(var i = index; i < $scope.personList.length; i++){
				$scope.personList[i].index--;
				console.log($scope.personList[i].fullName + $scope.personList[i].index)
			}
			
		}
	}
	
	$scope.selectStudent = function(student){
		$scope.firstName=student.firstName;
		$scope.lastName=student.lastName;
		$scope.studentID=student.studentID;
		$scope.type=student.type;
		$scope.subject=student.subject;
		$scope.startTime=student.startTime;
		$scope.endTime=student.endTime;
	}
	
	$scope.fieldArray = function(){
		return [$scope.firstName, $scope.lastName, $scope.studentID, $scope.type, $scope.subject, $scope.startTime, $scope.endTime]
	}
	
	$scope.isEmpty = function(){
		var array = $scope.fieldArray();
		console.log(array)
		
		for (var i = 0; i < array.length; i++){
			if (array[i]!="") {
				console.log("Non-empty student")
				return false;
			}
		}
		console.log("Empty student")
		return true;
	}
	
	$scope.finish = function(){
		var name = $scope.tutorName;
		var email = $scope.email;
		var set = name+","+email;
		document.cookie = set
	}

});