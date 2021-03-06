var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/anna$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
function randomAnnaSaying(){
	var num = Math.random();
	if(num < 0.2){
		return "\"REEE REE REE @Chase Green\"";
	}else if(num < 0.4){
		return "\"I'm at work\"";
	}else if(num < 0.6){
		return "\"I'm gonna bop you in the nose! *throws quesadilla*\"";
	}else if(num < 0.8){
		return "\"Lets go to Los Vaqueros!\"";
	}else{
		return "\"Why do you hate me??? @Chase Green\"";
	}
	return "\"I'm gonna bop you in the nose! *throws quesadilla*\"";
}
function randomAnnaImage(){
	return "\"http://i.imgur.com/nN0fRAJ.jpg\"";
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text"    : randomAnnaSaying(),
	"attachments" :
		{
		  "type"  : "image",
		  "url"   : "http://i.imgur.com/nN0fRAJ.jpg"
		}
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;