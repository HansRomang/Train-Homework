var config = {
    apiKey: "AIzaSyDuSE1rx6qhvWdK-marrgu4tPNRFLpuEzw",
    authDomain: "testtrain-f1a0d.firebaseapp.com",
    databaseURL: "https://homework-1-1e9c2.firebaseio.com/",
    projectId: "testtrain-f1a0d",
    storageBucket: "testtrain-f1a0d.appspot.com",
    messagingSenderId: "160177655378"
};
firebase.initializeApp(config);

var database = firebase.database();

var nameOfTrain = "";
var destination = "";
var firsttime = "";
var frequency = "";

$("#addatrain").on("click", function(event){
	event.preventDefault();

	nameOfTrain = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	firsttime = $("#firsttrain-input").val().trim();
	frequency = $("#frequency-input").val().trim();

	$("#train-input").val("");
	$("#destination-input").val("");
	$("#firsttrain-input").val("");
	$("#frequency-input").val("");


database.ref().push({
		nameOfTrain: nameOfTrain,
		destination: destination,
		firsttime: firsttime,
		frequency: frequency
	});	

});

$(document).ready(function() {
	var now = moment();
	$("#displayNow").text(now.format("lll"));
	
});

database.ref().on("child_added", function(childSnapshot) {

	nameOfTrain = childSnapshot.val().nameOfTrain;

	destination = childSnapshot.val().destination;

	firsttime = childSnapshot.val().firsttime;

	frequency = childSnapshot.val().frequency;


	var firsttimeMoment = moment(firsttime, "HH:mm");	

	var currenttime = moment();

	
	var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');

	var minuteRemainder = minuteArrival % frequency;

	var awayTrain = frequency - minuteRemainder;


	var nextArrival = currenttime.add(awayTrain, 'minutes');
	var arrivaltime = nextArrival.format("HH:mm");

	$("#AddTrain").append("<tr><td>" + nameOfTrain + "</td><td>" + destination
	 + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");

});