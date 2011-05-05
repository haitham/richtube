var Util = function(){
	
	var public = {};
	
	public.getYoutubeIdFromUrl = function(url){
		var videoId = url.split('v=')[1];
		if (typeof videoId === 'undefined'){ return null; }
		var ampersandPosition = videoId.indexOf('&');
		if(ampersandPosition != -1) {
		  videoId = videoId.substring(0, ampersandPosition);
		}
		return videoId;
	};
	
	public.embedVideo = function(videoId, elementId){
		var params = { allowScriptAccess: "always" };
	  var atts = { id: "ytplayer" };
	  swfobject.embedSWF("http://www.youtube.com/e/" + videoId + "?enablejsapi=1&playerapiid=ytplayer",
	                     elementId, "425", "356", "8", null, null, params, atts);
	};
	
	public.embedVideoFromUrl = function(url, elementId){
		embedVideo(Util.getYoutubeIdFromUrl(url), elementId);
	};
	
	return public;
}();