SlackSync
---

Keep your emojis sync across different Slack teams! Made using the [Slack Events API][4].


For running the application itself, run:
```bash
npm start
```

For running the tunnel to expose your localhost:
```bash
npm tunnel
```

### Configuration

```json
{
	"development" : {
		"port": 3000,
		"tunnel_domain": "sample.domain",
		"download_path": "./emoji_cache/",
		"SLACK_VERIFICATION_TOKEN": "sampleToken",
		"teams": {
			"sampleID": {
				"name": "sampleName",
        		"domain": "sampleDomain",
				"cookie": "sampleCookie"
			}
		}
	}
}
```

#### Port
The default port for the Slack Events API is `3000`.

#### Tunnel Domain
For testing locally, [`localtunnel`][3] is being used. You can set your own tunnel domain (for free) by setting `tunnel_domain` variable and running `npm tunnel`.

#### Download path
Specify the download path for the emojis. Default: `./emoji_cache/`

#### Slack verification token
You can get the verification token once you have created the [Slack App][1] at the `Basic Information` screen.

#### Team info
You can get the team information from the SlackWebAPI [team.info][2].

##### Cookie
> **Warning**: this is not a permanent solution.
For getting the cookie: 
- Visit the Emoji Page under https://{team}.slack.com/customize/emoji.
- Open the `Developer tools`.
- Navigate to the `Network` tab.
- Refresh the page.
- Click on the `emoji` cookie item and scroll down in the `Headers` tab until the `Request Headers` section.
- Copy the `Cookie` content.

## Further improvements
- [ ] OAuth2 Support for `Add to Slack` button.
- [ ] Use the Slack API for uploading emojis (feature not available yet).


[1]: https://api.slack.com/apps/
[2]: https://api.slack.com/methods/team.info/test
[3]: https://github.com/localtunnel/localtunnel
[4]: https://github.com/slackapi/node-slack-events-api