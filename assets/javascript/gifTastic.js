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

	//Create listener for topic buttons
	$("#topicsContainer").on("click", ".topic-button", function(){
		var topicSelected = $(this).attr("data-topic");
		showGifs(topicSelected)
	})

	//Create listener for image controls
	$("#gifsContainer").on("click", "img", function(){
		var playState = $(this).attr("data-state");

		if (playState === "pause"){
			var newImgSrc = $(this).attr("data-play");
			$(this).attr("data-state", "play");
		}
		else {
			var newImgSrc = $(this).attr("data-pause");
			$(this).attr("data-state", "pause");
		}
		$(this).attr("src", newImgSrc);
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
		var gifs = response.data;

		//Display Gifs
		for (var i = 0; i < gifs.length; i++){
			var imgSrc = $("<img>");
			imgSrc.attr("src", gifs[i].images.downsized_still.url);
			imgSrc.attr("data-pause", gifs[i].images.downsized_still.url);
			imgSrc.attr("data-play", gifs[i].images.downsized_medium.url);
			imgSrc.attr("data-state", "pause");
			$("#gifsContainer").append(imgSrc);
		}
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