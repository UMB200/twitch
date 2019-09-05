var fccTwitchLink = 'https://api.twitch.tv/kraken/';
var twitchApiId = 'njwvclbooaqh78zhrris6o9ho6no54';
var streamerLogo;
var streamerName;
var streamerStatus;
//array for followers
var subscribersPool  = [];

//funcation that enters all data into teh table
function prependData(){
	$('#subscribersPool').prepend(
		"<div class='row'>" +
	 	"<div class='col-md-4'>" + "<img src='" + streamerLogo + "'>" + "</div>" +
	 	"<div class='col-md-4'>" + streamerName + "</div>" +
		"<div class='col-md-4'>" + streamerStatus + "</div></div>" ); 
}

$(document).ready(function(){
	
	$.ajax ({
		type: "GET",
		url: fccTwitchLink + 'streams/freecodecamp',
		async: true,
		headers: {
			'Client-ID': twitchApiId,	
		},
		success:  function(twichData0) {
			//Get status of the channel
			if(twichData0.stream === null){
				$('#fccStatus').html("Free code channel is offline");
			}
			else{
				$('#fccStatus').html("Free code channel is online");	
			}
		}
	});
	$.ajax({
		type: "GET",
		url: fccTwitchLink + 'users/freecodecamp/follows/channels/',
		async: true,
		headers: {
			'Client-ID': twitchApiId,
		},
		success: function(twichData1){
			for (var i = 0 ; i < twichData1.follows.length; i++) {
				streamerName = twichData1.follows[i].channel.display_name;
				streamerLogo = twichData1.follows[i].channel.logo;
				streamerStatus = twichData1.follows[i].channel.status;
				
				if(streamerLogo == null){
					streamerLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgbfKOE4AyxdnY6aPR8D3of3V2MLrZwFZRrdeW5mYqHMi6ld7DJ4o9B-U';
					
				}
				if(streamerStatus == null){
					streamerStatus = 'No available status is provided';
				}
				prependData();
			}

		},
		error: function(twichData1){
			streamerName = twichData1.statusText;
			streamerStatus = twichData1.status;
			prependData();
		}
	});
	
});