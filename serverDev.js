import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfigDev from './webpack.config.dev'
import webpackConfigProd from './webpack.config.prod'
import {domain, port, scriptCSS, scriptJS} from './config'
import https from 'https'
import fs from 'fs-extra'
const app = express();

const env = process.env.NODE_ENV || 'development'
if(env == 'production'){
	app.use(webpackDevMiddleware(webpack(webpackConfigProd), {
	  publicPath: webpackConfigProd.output.publicPath,
	  stats: { colors: true }
	}));
}
else {
	app.use(webpackDevMiddleware(webpack(webpackConfigDev), {
	  publicPath: webpackConfigDev.output.publicPath,
	  stats: { colors: true }
	}));
}
//**SSL file and passphrase use for server
var ssl_options = {
    key: fs.readFileSync('key/star_apps_aegpresents_com.key'),
    cert: fs.readFileSync('key/star_apps_aegpresents_com.pem')
};

app.use('/public', express.static(__dirname + '/public'))

app.use('/assets', express.static(__dirname + '/assets'))


app.use(express.static('public'));

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

// app.get('*', function(req, res) {
//   res.render('index', {scriptCSS, scriptJS});
// });

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.listen(port, domain, function (err) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log('listening on http://'+domain+':'+port)
// })
https.createServer(ssl_options, app).listen(port, domain, function() {
        console.log('listening on https://'+domain+':'+port)
    });
