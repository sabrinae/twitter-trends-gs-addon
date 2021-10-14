function makeRequest() {
  var twitterService = getTwitterService();
  
  var base =  'https://api.twitter.com/1.1/trends/place.json?id=';

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Trending: Twitter Hashtags by Location');
  var range = sheet.getRange(4, 1, 2);
  
  // the woeid API does not exist anymore, so to find the woeid go to 'https://www.yahoo.com/news/weather/', search your city, and enter the id at the end of URL
  
  if (range.activate().getValue() === 'Minneapolis, MN') {
    var woeid = '2452078';
  } else if (range.activate().getValue() === 'Indianapolis, IN') {
    woeid = '2427032';
  } else if (range.activate().getValue() === 'Chicago, IL') {
    woeid = '2379574';
  } else if (range.activate().getValue() === 'Oklahoma City, OK') {
    woeid = '2464592';
  } else if (range.activate().getValue() === 'Tulsa, OK') {
    woeid = '2464592';
  } else {
    var ui = SpreadsheetApp.getUi();
    var errorResult = ui.alert('sorz ma dude this data is unavailable next time use a city in the dropdown', ui.ButtonSet.OK);
  };
  
  var url = base + woeid;
  
  var response = twitterService.fetch(url);
  
  if (response.getResponseCode() === 200) {
    var data = JSON.parse(response.getContentText());
  } else {
    Logger.log('Error: ' + response.getResponseCode());
  };
  
  toSheet(data);
}

function toSheet(data) {
  var row = [];
  var date = Utilities.formatDate(new Date(), "CDT", "MMMM dd, YYYY' T'HH:mm:ss'Z'");
  
  for (var key in data[0].trends) {
    var hash = data[0].trends[key].name;
    var hashURL = data[0].trends[key].url;
    var volume = data[0].trends[key].tweet_volume;
    var hashPromo = data[0].trends[key].promoted_content;
    Logger.log(key, hash, hashURL, volume, hashPromo)
    
    row.push([date, hash, hashURL, volume, hashPromo]);
  }
  
  Logger.log(row);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Trending: Twitter Hashtags by Location');
  sheet.getRange("A7:E61").clearContent(); // remove old hashtags to be replaced w/new ones
  
  var newRange = sheet.getRange(7,1, row.length, row[0].length).setValues(row);
  
  sheet.appendRow(row[0]);
}
