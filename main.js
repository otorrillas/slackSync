/*
	SlackSync - Keep your emojis sync between teams
*/
'use strict';

// Load the configuration
const config = require('./config.json')[process.env.NODE_ENV || 'development'];

// Initialize using verification token from environment variables
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const slackEvents = createSlackEventAdapter(config.SLACK_VERIFICATION_TOKEN, {
  includeBody: true
});

/* 
	Download/upload emoji functions
*/

const download = require('download-file');
const upload = require('./upload.js');
const path = require('path');

function download_emoji(url, name) {
	let extension = url.split('.').pop();
	let filename = name + '.' + extension;
	let emojiOptions = {
		directory: config.download_path,
		filename: filename
	};
	download(url, emojiOptions, (err) => {
		if (err)
			console.log(err);
	});

	return config.download_path + filename;
}

function upload_emoji_to_others(excludedTeam, file) {
	let teamCookies = config.teams;
	for (let team in teamCookies) {
		if(team !== excludedTeam) {
			console.log('Uploading to team: ' + team);
			upload(team, teamCookies[team], file);
		}
	}
}

/* 
	SlackEvent - Emoji changed
*/

slackEvents.on('emoji_changed', (event, body) => {
	console.log('Emoji event received!');
	let teamID = body.team_id;


	if (event.subtype === 'add') {
		// Get the emojiURL and name
		let emojiURL = event.value,
			emojiName = event.name;

		// Download the emoji
		let emojiPath = download_emoji(emojiURL, emojiName);
		// Upload the emoji to other teams
		upload_emoji_to_others(teamID, emojiPath);
		// Remove the file
		// TODO
	}
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(config.port).then(() => {
  console.log(`server listening on port ${config.port}`);
});