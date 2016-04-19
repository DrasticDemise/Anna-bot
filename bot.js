var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var annaImage = randomAnnaImage();
var botID = process.env.BOT_ID;
var annaSaying = randomAnnaSaying();
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
    "text"    : annaSaying,
	"attachments" : [
		{
		  "type"  : "image",
		  "url"   : annaImage
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
function randomAnnaSaying(){
	return "\"I'm gonna bop you in the nose! *throws quesadilla*"";
}
function randomAnnaImage(){
	return "\"http://i.imgur.com/nN0fRAJ.jpg"";
}

exports.respond = respond;