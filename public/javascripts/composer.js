var ytplayer = null;

function onYouTubePlayerReady(playerId) {
 alert("3aaaaaaaa")
 ytplayer = document.getElementById("ytPlayer");
}

$(function(){
  $("#add_widget").hide()
  var insertAction = function(action,timeLine){
  }

	$("#youtube_fetch").click(function(){
		var videoEmbed = Util.getYoutubeEmbedFromUrl($("#youtube_url").val());
		$("#video_container").html(videoEmbed);
		$("#add_widget").show()
	});
	
	$("#start_subtitle").live( "click" , function(){
	  ytplayer.playVideo()
  });
  
  $("#end_subtitle").live( "click" , function(){
    ytplayer.pauseVideo()
  });
  
  $("#save").live( "click" , function(){
    alert("save_button")
  });
	
});