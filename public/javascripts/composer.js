$(function(){
	$("#youtube_fetch").click(function(){
		var videoEmbed = Util.getYoutubeEmbedFromUrl($("#youtube_url").val());
		$("#video_container").html(videoEmbed);
	});
});