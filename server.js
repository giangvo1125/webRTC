require('babel-core/register');
require('css-modules-require-hook/preset');


var app = require("./serverDev.js");
// if(env === 'prod'){
// 	var app = require("./serverProd.js");
// } else {
// 	var app = require("./serverDev.js");
// }
