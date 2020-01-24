function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Configure Add-on', functionName: 'configureAddOn'},
    {name: 'Grab Twitter Data', functionName: 'showSidebar'},
    {name: 'Save Copy of Report', functionName: 'saveReport'}
  ];
  spreadsheet.addMenu('TOP 50 TRENDS', menuItems);
}

function configureAddOn() {
  
}

function getWOEID() {
  var yahooService = getYahooService();
  
  var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
  var method = 'GET';
  
  var APP_ID = '<YOUR_APP_ID>';
  var CONSUMER_KEY = '<YOUR_CONSUMER_KEY>';
  var CONSUMER_SECRET = '<YOUR_CONSUMER_SECRET>';
  
  var query = {
    'location': 'chicago,il',
    'format': 'json'
  };
  
  var oauth_call = {
    'oauth_consumer_key': CONSUMER_KEY,
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': new Date(),
    'oauth_version': '1.0'
  };
  
  var response = yahooService.fetch(url, oauth_call);
  if (response.getResponseCode() === 200) {
    Logger.log(response);
    var data = JSON.parse(response.getContentText());
  } else {
    Logger.log('Error: ' + resposne.getResponseCode());
  };
}

function grabTwitterData() {
  var twitterService = getTwitterService();
  
  var base =  'https://api.twitter.com/1.1/trends/place.json?id=';

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Sheet 1');
  var range = sheet.getRange();
}

function saveReport() {

}
