/*
	App JS
	Developer:
		Luis Matute 		- luis.matute@me.com
	Description:
		This is the server configuration.
*/

module.exports = function(config){

	var cwhr = function(){};

	var express = require('express'),
		http = require('http'),
		app = express(),
		isDeploying = false;

	// all environments
	app.set('port', process.env.PORT || config.port);

	app.get(config.healtUrl, function (req, res, next) {
		if(isDeploying){
			res.send('WebHook Receiver is deploying...');
		} else {
			res.send('WebHook Receiver is waiting...');
		}
	});

	var baseUrl = config.deploysBaseUrl;

	for(i in config.deploys){

		var depl = config.deploys[i];

		app.post(baseUrl + depl.url, function (req, res) {

			isDeploying = true;

		 	var spawn = require('child_process').spawn,
		     deploy = spawn('sh', [ './deploy.sh', depl.dir, depl.branch ]);

	    deploy.stdout.on('data', function (data) {

		  	console.log(''+data);

		  	var afterDeploy = spawn('sh', [ depl.afterDeploy.script ]);
		  	afterDeploy.on('data', function (_data) {
	        console.log(''+_data);
	    	});
		  	afterDeploy.on('close', function (code) {
	        console.log('Child process exited with code ' + code);
	        isDeploying = false;
	    	});

			});

	    deploy.on('close', function (code) {
	        console.log('Child process exited with code ' + code);
	    });

	    res.json(200, {message: 'WebHook received. Deploy triggered'});
	    
		});

	}

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});

	return cwhr;
}