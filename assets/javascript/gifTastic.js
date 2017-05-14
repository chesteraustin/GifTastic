$(document).ready(function(){
	var topics = [
		"red panda",
		"bunnies",
		"ducks",
		"cows"
	]

	//display buttons
	displayButtons(topics);

	//Create listener to add topic
	$("#addButton").on("click", function(){
		var newTopic = $("#addTopic").val();
		topics.push(newTopic)
		displayButtons(topics);
	})

	//Create listener for topic
	$("#topicsContainer").on("click", ".topic-button", function(){
		var topicSelected = $(this).attr("data-topic");
		showGifs(topicSelected)
	})

})

function showGifs(topic) {

	var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + topic;

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		console.log(response)
		//Display Gifs
		var imgSrc = $("<img>");
		imgSrc.attr("src", response.data.image_url)
		$("#gifsContainer").append(imgSrc);
	});
}

function displayButtons(topics) {
	console.log(topics)
	//Clear container
	$("#topicsContainer").children().not(".add-topic").remove();

	for (var i = 0; i < topics.length; i++) {
		var topic = topics[i];
		//Create button
		newButton = $("<button>");
		newButton.text(topic);
		newButton.addClass("topic-button");
		newButton.attr("data-topic", topic)

		//Append to 
		$("#topicsContainer").append(newButton);
	}
}