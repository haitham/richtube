var ytplayer = null;
function onYouTubePlayerReady(playerId) {
 ytplayer = document.getElementById("ytplayer");
}

$(function(){
  
  var tracks = null
  var lastLines = []
  var lastComment = null;
  var numTracks = -1;
  

  $("#add_widget").hide() // will be removed
  
  var create_add_widget = function(){
    widget = $('#template').html();
    numTracks = numTracks  + 1 ;
    widget = widget.replace(/ID/g,("" + numTracks));
    tracks.subtitles.push({
        label: "",
        lines: []
    });
    $('#widgets').append(widget);
  };

	$("#youtube_fetch").click(function(){
	  Util.embedVideoFromUrl($("#youtube_url").val(), "video_container");
		$("#add_widget").show();
		tracks = {
		  subtitles : [],
		  comments : []
		};
	});
	
	$('#new_subtitles').live("click" , function(){
    ytplayer.pauseVideo();
    create_add_widget();
  });
	
	$(".start_subtitle").live("click" , function(){
	  var id = $(this).attr("id");
	  ytplayer.pauseVideo();
	  if($("#subtitles_" + id).val().length == 0){
	    alert("Enter text");
	    return ;
	  }
    //create element
    var line = {
      text : $("#subtitles_" + id).val(),
      start : ytplayer.getCurrentTime()
    };
    //insert it to the right place
    tracks.subtitles[id].lines.push(line);
    //update indeces
    lastLines[id] = line;
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
      start : ytplayer.getCurrentTime(),
      pause : $("#pause_check").attr("checked"),
    };
    //insert it to the right place
    tracks.comments.push(line);
    //update indeces
    lastComment = line;
    $('#message').html("Comment added at" + line.start + " seconds").fadeIn().delay(3000).fadeOut();
    $("#pause_check").attr("checked",false)
  });
  
  $(".end_subtitle").live( "click" , function(){
    var id = $(this).attr("id");
    ytplayer.pauseVideo();
    if(!lastLines[id]){
      alert("No subtitle was entered");
      return ;
    }
    lastLines[id].end = ytplayer.getCurrentTime();
    lastLines[id] = null;
    $("#subtitles_" + id).val("");
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
    var failure = false;
    $('.track_label:visible').each(function(){
      var label = $(this);
      if(label.val().length == 0){
        alert("Track labels must be supplied");
        failure = true;
        return;
      }
      tracks.subtitles[label.attr("id")].label = label.val();
    });
    if (failure){
      return;
    }
    
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
