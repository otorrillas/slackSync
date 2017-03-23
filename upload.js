/*
	SlackSync - Emoji upload to Slack
*/
'use strict';

const hyperquest = require('hyperquest');
const through = require('through2');
const cheerio = require('cheerio');
const FormData = require('form-data');
const path = require('path');


module.exports = function upload(team, cookie, emojiFile) {
    const headers = {
        'Cookie': cookie
    };

    getCrumb((err, crumb) => {
    	uploadEmoji(crumb, emojiFile);
    });

    function getCrumb(callback) {
        const request = hyperquest(`https://${team}.slack.com/customize/emoji`, {
            headers: headers
        });
        request.pipe(through(write, end));

        let data = '';

        function write(buf, enc, cb) {
            data += buf;
            cb();
        }

        function end() {
            let $ = cheerio.load(data)
            try {
                let crumb = $('input[name="crumb"]')[0].attribs.value
                cb(null, crumb)
            } catch (e) {
                return console.log('Can not load page properly, please make sure your team name and cookie is correct.')
            }
        }
    }

    function uploadEmoji (crumb, file) {
    	console.log("start emoji upload");
	    let name = path.parse(file).name;
	    let filename = path.parse(file).base;

	    let form = new FormData()
	    form.append('add', 1);
	    form.append('crumb', crumb);
	    form.append('name', name);
	    form.append('mode', 'data');

	    form.append('img', fs.createReadStream(file), {
	      filename: filename
	    });

	    form.submit({
	      protocol: 'https:',
	      host: `${team}.slack.com`,
	      path: '/customize/emoji',
	      headers: headers
	    }, function (err, res) {
	      if (err) {
	        console.log(`Upload file ${file} error: ${err}`)
	      } else {
	        console.log(`Done uplaod ${file}`)
	      }
	    });
  	}
}