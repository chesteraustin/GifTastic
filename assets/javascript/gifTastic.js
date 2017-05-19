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

	var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&sort=recent&q=" + encodeURIComponent(topic);

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		console.log(response)
		//Display Gifs
		var imgSrc = $("<img>");
		imgSrc.attr("src", response.data[0].images.downsized_still.url)
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
		newButton.addClass("topic-button col-md-12");
		newButton.attr("data-topic", topic)

		//Append to 
		$("#topicsContainer").append(newButton);
	}
}