/*
hash_8c_2.js

code by tree_fly, itreefly.com
2023-02-27
*/
function hash_8c_2(message) { 
	try {
	  let crypto = require('node:crypto');
	  var hash = crypto.createHash("md5").update(message).digest("hex");

	  return hash.substring(2, 10); //equal to 'cut -c 3-10'
	} catch (err) {
	  return "";
	}
}
module.exports = hash_8c_2;