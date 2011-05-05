var ytplayer = null;
var tracks = null

function onYouTubePlayerReady(playerId) {
 ytplayer = document.getElementById("ytplayer");
}

$(function(){
  
  //var tracks = null
  var lastLine = null;
  var lastComment = null;
  var numTracks = 1;
  

  $("#add_widget").hide()

	$("#youtube_fetch").click(function(){
	  Util.embedVideoFromUrl($("#youtube_url").val(), "video_container");
		$("#add_widget").show()
		tracks = {
		  subtitles : [{
		    label: "",
		    lines: [],
		  }],
		  comments : [],
		};
	});
	
	$("#start_subtitle").live("click" , function(){
	  ytplayer.pauseVideo();
	  if($("#subtitles").val().length == 0){
	    alert("Enter text");
	    return ;
	  }
    //create element
    var line = {
      text : $("#subtitles").val(),
      start : ytplayer.getCurrentTime()
    };
    //insert it to the right place
    tracks.subtitles[0].lines.push(line);
    //update indeces
    lastLine = line;
    $('#message').html("subtitle added at" + line.start + " seconds").fadeIn().delay(3000).fadeOut();
  });
  
  $("#start_comment").live("click" , function(){
    ytplayer.pauseVideo();
    if($("#comment_text").val().length == 0){
      alert("Enter text");
      return ;
    }
    //create element
    var line = {
      html : $("#comment_text").val(),
      start : ytplayer.getCurrentTime()
    };
    //insert it to the right place
    tracks.comments.push(line);
    //update indeces
    lastComment = line;
    $('#message').html("Comment added at" + line.start + " seconds").fadeIn().delay(3000).fadeOut();
  });
  
  $("#end_subtitle").live( "click" , function(){
    ytplayer.pauseVideo();
    if(!lastLine){
      alert("No subtitle was entered");
      return ;
    }
    lastLine.end = ytplayer.getCurrentTime();
    lastLine = null;
    $("#subtitles").val("");
  });
  
  $("#end_comment").live( "click" , function(){
    ytplayer.pauseVideo();
    if(!lastComment){
      alert("No subtitle was entered");
      return ;
    }
    lastComment.end = ytplayer.getCurrentTime();
    lastComment = null;
    $("#comment_text").val("");
  });
  
  $("#save_button").live( "click" , function(){
    if($('#track_label').val().length == 0){
      alert("Track labels must be supplied");
      return;
    }
    tracks.subtitles[0].label = $('#track_label').val()
    var encoded = $.JSON.encode(tracks);
    $.ajax({
    url  : "/videos",
    type : "POST",
    data : {"video[youtube_id]": Util.getYoutubeIdFromUrl(ytplayer.getVideoUrl()), "video[title]":$("#video_title").val(), "video[timeline]": encoded },
    success: function(response){
      $('#message').html("Saved successfully").fadeIn();
      location = "/videos/" + response;
    }
    });
  });
});
