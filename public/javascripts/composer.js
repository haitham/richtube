var ytplayer = null;

function onYouTubePlayerReady(playerId) {
 ytplayer = document.getElementById("ytplayer");
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
    alert(ytplayer.getCurrentTime())
  });
  
  $("#save").live( "click" , function(){
    alert("save_button")
  });
	
});