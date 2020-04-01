/* eslint-disable */
const fs = require('fs');
const packageJson = require('./package.json');

const appVersion = packageJson.version;
const deploymentHash = makeid(8);

const jsonData = {
  version: appVersion,
  deploymentHash: deploymentHash
};

var jsonContent = JSON.stringify(jsonData);

fs.writeFile('./public/meta.json', jsonContent, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to meta.json');
    return console.log(err);
  }

  console.log('meta.json file has been saved with latest version number and deployment hash');
});

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/* eslint-enable */
