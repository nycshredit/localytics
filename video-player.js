
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
		nhl.reWriteFacebookComments(aVideo.id);
		VideoCenter.setup(settings);
		VideoCenter.play(options, settings.instanceId);
		this.loadUpNext();
		this.loadRecommendations();
		
		// localytics tracking
		// @todo
		// we need some way to detemine what type of play this was. possible values -- auto, first, recoLocalytics, recoByTag, upNext
		ll('tagEvent', 'Video Start', {'id': aVideo.id, 'Title': aVideo.title, 'duration': aVideo.duration, 'type': 'auto'});
		
	},
	videoEnded : function() {
		
		// local and localytics tracking
		nhl.logUserVideoWatched(this);
		// @todo
		// this data is not passed to us from the obj that comes from the NL video player callback. can we get it?
		ll('tagEvent', 'Video Complete', {'id': this.instanceId/*'Title': this.title, 'duration': video.duration*/}); 
		
		var indexOfLast = playlist.indexOf(VideoPrototype._currentVideo);
		var nextIndex = (indexOfLast + 1);
		if (nextIndex < playlist.length) {
			VideoPrototype.play(playlist[nextIndex]);
		}
	},
	loadUpNext: function() {
		var indexOfCurrent = playlist.indexOf(VideoPrototype._currentVideo);
		
		var upNextArray = playlist.slice(indexOfCurrent + 1, playlist.length);
		
		this.renderVideoList('.relatedVideos', upNextArray);
		
	},
	loadRecommendations : function() {

		if (!VideoPrototype._currentVideo.tags)
			return;

		var videoTags = VideoPrototype._currentVideo.tags;

		var matches = [];

		jQuery.each(recoPlaylist, function(i, aVideo) {
			if (aVideo.tags && aVideo.id != VideoPrototype._currentVideo.id) {
				for (i = 0; i < aVideo.tags.length; i++) {
					var aTag = aVideo.tags[i];
					if (videoTags.indexOf(aTag) >= 0) {
						matches[matches.length] = aVideo;
						break;
					}
				}
			}
		});

		if (matches.length > 5) {
			matches = matches.slice(0, 5);
		}

		this.renderVideoList('.recommendedVideos', matches);
	},
	renderVideoList: function(containerId, aPlaylist) {
		
		jQuery(containerId).empty();
		
		for (i = 0; i < aPlaylist.length; i++) {
			var aVideo = aPlaylist[i];
			pubDate = nhl.getReadableVideoPublishedDate(aVideo.pubDate);
			duration = nhl.getReadableVideoDuration(aVideo.duration);
			jQuery(containerId).append(
				'<li rel="' + aVideo.id + '" class="thumbContainer">' +
					'<img src="' + aVideo.canvas + '" class="thumb" border="0" />' +
					'<div class="thumbTray">' +
					'<h4>' + aVideo.title + '</h4>' +
					'<p>' + duration + ' | ' + pubDate + '</p>' + 
					'<div class="share"><img title="Share this video"  src="share-icon.png" /><img src="favorite-icon.png" title="Add to my favorites" /></div>' + 
					'</div>' +
				'</li>'					
			);
		}
		
		// bind click events	
		jQuery(containerId + ' li').unbind();
		jQuery(containerId + ' li').each(function(index) {
			jQuery(this).on("click", function(){
				var vidId = jQuery(this).attr('rel');
				var aVideo = VideoPrototype.videoFromPlaylistWithId(aPlaylist, vidId);
				VideoPrototype.play(aVideo);
		    });
		});
		
		// bind hover state to elements
        jQuery(containerId + ' .thumbContainer').hover(
            function () {
              jQuery(this).find('.thumbTray').animate({marginBottom: 0, opacity: 0.85}, 200);
            }, 
            function () {
              jQuery(this).find('.thumbTray').animate({marginBottom: -20, opacity: 0.7}, 200);
            }
        );      
	},
	videoFromPlaylistWithId: function(playlist, id) {
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