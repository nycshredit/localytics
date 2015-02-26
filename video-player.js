
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
		duration = nhl.getReadableVideoDuration(aVideo.duration);
		publishedDate = nhl.getReadableVideoPublishedDate(aVideo.pubDate);
		jQuery('#details p.durationDate').html(duration + ' &nbsp;|&nbsp; ' + publishedDate);
		
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
		this.loadRecommendations();
	},
	videoEnded : function() {
		nhl.logUserVideoWatched(this);
		var indexOfLast = playlist.indexOf(VideoPrototype._currentVideo);
		var nextIndex = (indexOfLast + 1);
		if (nextIndex < playlist.length) {
			VideoPrototype.play(playlist[nextIndex]);
		}
	},
	loadUpNext: function() {
		var indexOfCurrent = playlist.indexOf(VideoPrototype._currentVideo);
		var upNextArray = playlist.slice(indexOfCurrent + 1, playlist.length);
		
		jQuery('#relatedVideos ul li').remove()
		for (i = 0; i < upNextArray.length; i++) {
			var aVideo = upNextArray[i];
			pubDate = nhl.getReadableVideoPublishedDate(aVideo.pubDate);
			duration = nhl.getReadableVideoDuration(aVideo.duration);
			jQuery('#relatedVideos ul').append(
				'<li rel="' + aVideo.id + '">' +
					'<img src="' + aVideo.canvas + '" border="0" />' +
					'<h3>' + aVideo.title + '&nbsp;<span>(' + duration + ' | ' + pubDate + ')</span></h3>' + 
				'</li>'					
			);
		}
		
		// bind click events		
		jQuery('#relatedVideos ul li').each(function(index) {
			jQuery(this).on("click", function(){
				var vidId = jQuery(this).attr('rel');
				var aVideo = VideoPrototype.videoFromPlaylistWithId(vidId);
				VideoPrototype.play(aVideo);
		    });
		});
		
	},
	loadRecommendations: function() {
		
		jQuery('#recommendedVideos ul').empty();
		
		var random = Math.floor(Math.random() * (recoPlaylist.length - 6));
		
		console.log(random);
		
		var recoList = recoPlaylist.slice(random, (random + 5));
		
		for (i = 0; i < recoList.length; i++) {
			var aVideo = recoList[i];
			jQuery('#recommendedVideos ul').append(
				'<li rel="' + aVideo.id + '">' +
					'<img src="' + aVideo.canvas + '" border="0" />' +
					'<h3>' + aVideo.title + '&nbsp;<span>(' + aVideo.duration + 's ' + aVideo.pubDate.substring(0, 10) + ')</span></h3>' + 
				'</li>'					
			);
		}
		
		// bind click events		
		jQuery('#recommendedVideos ul li').each(function(index) {
			jQuery(this).on("click", function(){
				var vidId = jQuery(this).attr('rel');
				var aVideo = VideoPrototype.videoFromPlaylistWithId(vidId);
				VideoPrototype.play(aVideo);
		    });
		});
		
	},
	videoFromPlaylistWithId: function(id) {
		var aVideo = null;
		for (i = 0; i < playlist.length; i++) {
			aVideo = playlist[i];
			if (aVideo.id == id) {
				break;				
			}
		}
		return aVideo;
	},
	userRecommendations: function(data) {
		console.log(data);
	}

}