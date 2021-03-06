// hemo-globals
var nhl = {};
var log = function(t){if(console){console.log(t);}};

(function($){
	
	// LOCAL STORAGE HELPERS
	nhl.localStoreWriteKeyValue = function(key,value){
		if(typeof(Storage) !== "undefined") {
	    	localStorage.setItem(key,value);
		} else {
			log('storage not supported (1)');
		}
	}
	
	nhl.localStoreRemoveKey = function(key){
		if(typeof(Storage) !== "undefined") {
	    	localStorage.removeItem(key);
		} else {
			log('storage not supported (2)');
		}
	}
	
	nhl.localStoreGetItem = function(key){
		v = null;
		if(typeof(Storage) !== "undefined") {
	    	v = localStorage.getItem(key);
		} else {
			log('storage not supported (3)');
		}
		return v;
	}
	
	nhl.localStoreAppendKeyValue = function(key,value){
		if(typeof(Storage) !== "undefined") {
			
			// get the current value
			currentValue = localStorage.getItem(key);
			
			if ( currentValue ){
				// only do this if the value isn't already in the 'array' 
				if ( currentValue.indexOf(value) == -1 ){
					newValue = currentValue + ',' + value;
					nhl.localStoreWriteKeyValue(key,newValue);
				}
			} else {
				nhl.localStoreWriteKeyValue(key,value);
			}
		} else {
			log('storage not supported (3)');
		}
	}
	
	// VIDEO COMPLETE HELPERS
	nhl.videoWatchedStorageKey = 'userVideosWatched';
	
	nhl.logUserVideoStarted = function(video){
		
	}
	
	nhl.logUserVideoWatched = function(video){
		if (video) {
			if ( video.instanceId /*&& video.title && video.duration*/ ){
				nhl.localStoreAppendKeyValue(nhl.videoWatchedStorageKey,video.instanceId);
			}
		}
	}
	
	nhl.getUserVideoWatched = function(){
		value = nhl.localStoreGetItem(nhl.videoWatchedStorageKey);
		if ( value ){
			if ( value.indexOf(',') > -1 ){
				value = value.split(',').map(function(i) {
   					return parseInt(i, 10);
			 	});
			} else if ( value ){
				// create array
				value = [parseInt(value)];
			}
		}
		return value;
	}
	
	// VIDEO DATE HELPERS
	nhl.getReadableVideoDuration = function(d){
		return moment().startOf('day').seconds(d).format('m:ss');
	}
	
	nhl.getReadableVideoPublishedDate = function(p){
		return moment(p, 'MM/DD/YYYY hh:mm:ss a').fromNow();
	}
	
	nhl.commentElement = "#comments";
	nhl.reWriteFacebookComments = function(videoId){
		// do nothing for now.
		//$(nhl.commentElement).html('<div class="fb-comments" data-href="http://localhost/#videoId-'+videoId+'" data-width="716" data-numposts="5" data-colorscheme="dark"></div><script>jQuery(function(){FB.XFBML.parse();});</script>');
	}
	
	
	$(function(){
		log('dom-ready');
		// onload shit goes here
	});
	
})(jQuery);