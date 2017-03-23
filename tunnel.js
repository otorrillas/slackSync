'use strict';

const config = require('./config.json')[process.env.NODE_ENV || 'development'];

// Local tunnel
let localtunnel = require('localtunnel');
let tunnel = localtunnel(config.port, { subdomain: config.tunnel_domain}, (err, tunnel) => {
    if (err)
    	console.log(err);

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    tunnel.url;
    console.log(`Tunnel started at: ${tunnel.url}`);
});

tunnel.on('close', function() {
    // tunnels are closed
});