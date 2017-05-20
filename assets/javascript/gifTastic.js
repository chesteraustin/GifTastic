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
		//clear gifsContainer for new images
		$("#gifsContainer").empty();

		var topicSelected = $(this).attr("data-topic");
		for (var i = 1; i <= 10; i++) {
			showGifs(topicSelected)
		}

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

	var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + encodeURIComponent(topic);

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		console.log(response)
		var gifs = response.data;

		//Display Gifs

		//Create IMAGES
		var imgSrc = $("<img>");
		imgSrc.attr("src", gifs.fixed_height_small_still_url);
		imgSrc.attr("data-pause", gifs.fixed_height_small_still_url);
		imgSrc.attr("data-play", gifs.fixed_height_small_url);
		imgSrc.attr("data-state", "pause");
		imgSrc.addClass("img-responsive");

		//Create DIVs to hold images
		var newDiv = $("<div>");
		newDiv.addClass("col-md-3 gifContainer text-center");

		//insert IMAGE to DIV
		$(newDiv).append(imgSrc);

		//insert DIV to CONTAINER
		$("#gifsContainer").append(newDiv);
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