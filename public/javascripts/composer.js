$(function(){
  $("#add_widget").hide()
  var insertAction = function(action,timeLine){
  }
  
  var getPlayerObject = function(){
    return document.getElementById('video_container object');
  }

	$("#youtube_fetch").click(function(){
		var videoEmbed = Util.getYoutubeEmbedFromUrl($("#youtube_url").val());
		$("#video_container").html(videoEmbed);
		$("#add_widget").show()
	});
	
	$("#start_subtitle").live( "click" , function(){
	  getPlayerObject().playVideo()
  });
  
  $("#end_subtitle").live( "click" , function(){
    getPlayerObject().pauseVideo()
  });
  
  $("#save").live( "click" , function(){
    alert("save_button")
  });
	
});