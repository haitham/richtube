var ytplayer = null;

function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("ytplayer");
}

$(function(){
	
	var video = {
		youtubeId: videoYoutubeId,
		title: videoYoutubeId,
		timeline: {
			subtitles: [],
			comments: []
		}
	};
	
	$(videoTimeline.subtitles).each(function(){
		video.timeline.subtitles.push({
			"label": this.label,
			"lines": this.lines.sort(function(a,b){
				return (a.start > b.start);
			})
		});
	});
	
	video.timeline.comments = videoTimeline.comments.sort(function(a,b){
		return (a.start > b.start);
	});
	
	var subtitleHolders = "";
	var subtitleControls = "";
	for (var i=0; i<video.timeline.subtitles.length; i++){
		subtitleHolders = subtitleHolders + "<div style='width:90%' id='subtitle_" + i + "'>&nbsp;</div>";
		subtitleControls = subtitleControls + "<input class='L-subcontrol' type='checkbox' checked='true' id='subtitle_control_" + i + "' /><label>" + video.timeline.subtitles[i].label + "</label><br/>";
		$(".L-subcontrol").live('click', function(){
			var check = $(this);
			var index = check.attr('id').split("_").pop();
			if (check.attr("checked")){
				$("#subtitle_" + index).show();
			} else {
				$("#subtitle_" + index).hide();
			}
			
		});
	}
	$("#subtitles_container").html(subtitleHolders);
	$("#subtitle_controls").html(subtitleControls);
	
	var updateExtras = function(){
		if (ytplayer && ytplayer.getDuration){
			for (var i=0; i<video.timeline.subtitles.length; i++){
				var sub = video.timeline.subtitles[i];
				var lineIndex;
				for (lineIndex=0; lineIndex<sub.lines.length; lineIndex++){
					if (ytplayer.getCurrentTime() < sub.lines[lineIndex].start){
						break;
					}
				}
				lineIndex = lineIndex - 1;
				if ( lineIndex < 0 || (typeof sub.lines[lineIndex].end !== "undefined" && sub.lines[lineIndex].end !== null && ytplayer.getCurrentTime() >= sub.lines[lineIndex].end) ){
					$("#subtitle_" + i).html("&nbsp;");
				} else {
					$("#subtitle_" + i).html(sub.lines[lineIndex].text);
				}
			}
			var comments = video.timeline.comments;
			var commentIndex;
			for (commentIndex=0; commentIndex<comments.length; commentIndex++){
				if (ytplayer.getCurrentTime() < comments[commentIndex].start){
					break;
				}
			}
			commentIndex = commentIndex - 1;
			if ( commentIndex < 0 || (typeof comments[commentIndex].end !== "undefined" && comments[commentIndex].end !== null && ytplayer.getCurrentTime() >= comments[commentIndex].end) ){
				$("#comments_container").html("&nbsp;");
			} else {
				$("#comments_container").html(comments[commentIndex].html);
			}
		}
	};
	
	Util.embedVideo(videoYoutubeId, "video");
	
	setInterval(updateExtras, 500);
	
});