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
	
	public.getYoutubeEmbedFromId = function(videoId){
		return "<div id=\"video_container\">" +
  				 "<object style=\"height:390px; width:640px\" width=\"425\" height=\"344\">" +
  				 "<param name=\"movie\" value=\"http://www.youtube.com/v/" + videoId + "?version=3&amp;feature=player_embedded\">" +
  				 "<param name=\"allowFullScreen\" value=\"true\">" +
  				 "<param name=\"allowScriptAccess\" value=\"always\">" +
  				 "<embed src=\"http://www.youtube.com/v/" + videoId + "?version=3&amp;feature=player_embedded\" type=\"application/x-shockwave-flash\" allowfullscreen=\"true\" allowscriptaccess=\"always\" width=\"425\" height=\"344\"></object>" +
					 "</div>"
	};
	
	public.getYoutubeEmbedFromUrl = function(url){
		return Util.getYoutubeEmbedFromId(Util.getYoutubeIdFromUrl(url));
	};
	
	return public;
}();