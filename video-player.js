
var vpGlobalSettings = {
		"site": "www", 
	    "lang": "en", 
	    "playerType": "n2", 
	    "pageName": "nhl:en:news:news", 
	    "section": "news",
	    "section2": "news", 
	    "hierarchy": "news,playersafety", 
	    "videoChannel": "inline article",
	    "noTealium": true,
		"fwSectionId": "nhl_us_nhl_videocenter_playersafetydecisions",
		"skipAdTime": 5
}

var VideoPrototype = {
	_currentVideo : null,
	play : function(aVideo) {
		this._currentVideo = aVideo;
		jQuery('#videoContainer').empty();
		jQuery('#details h1').html(aVideo.title);
		jQuery('#details p').html(aVideo.desc);
		jQuery('#details p.durationDate').html(aVideo.duration +'sec &nbsp;|&nbsp; ' + aVideo.pubDate);
		
		jQuery('#details p.tags').empty();
		for (i = 0; i < aVideo.tags.length; i++) {
			var aTag = aVideo.tags[i];
			jQuery('#details p.tags').append(
					'<a href="javascript:void(0)">' + aTag + '</a> ');
		}

		var settings = {
			instanceId : aVideo.id,
			containerId : "videoContainer",
			endCallback : VideoPrototype.videoEnded
		};
		var options = {
			playlist : [ aVideo.id ],
			autostart : true
		};
		var settings = jQuery.extend({}, vpGlobalSettings, settings);
		VideoCenter.setup(settings);
		VideoCenter.play(options, settings.instanceId);
		this.loadUpNext();
	},
	videoEnded : function() {
		var indexOfLast = playlist.indexOf(VideoPrototype._currentVideo);
		var nextIndex = (indexOfLast + 1);
		if (nextIndex < playlist.length) {
			VideoPrototype.play(playlist[nextIndex]);
		}
	},
	loadUpNext: function() {
		var indexOfCurrent = playlist.indexOf(VideoPrototype._currentVideo);
		console.log('load everything after index ' + indexOfCurrent);
	
		var upNextArray = playlist.slice(indexOfCurrent + 1, playlist.length);
		
		jQuery('#relatedVideos ul li').remove()
		for (i = 0; i < upNextArray.length; i++) {
			var aVideo = upNextArray[i];
			jQuery('#relatedVideos ul').append(
				'<li>' +
					'<img src="' + aVideo.canvas + '" border="0" />' +
					'<h3>' + aVideo.title + '<span>(' + aVideo.duration + 's ' + aVideo.pubDate + ')</span></h3>' + 
				'</li>'					
			);
		}
		
	}

}