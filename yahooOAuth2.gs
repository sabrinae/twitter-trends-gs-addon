var CLIENT_ID = '<YOUR_CLIENT_ID>';
var CLIENT_SECRET = '<YOUR_CLIENT_SECRET>';

var REDIRECT_URL = 'https://script.google.com/macros/d/{SCRIPT_ID}/usercallback';

function getYahooService() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService('Yahoo')

      // Set the endpoint URLs, which are the same for all Google services.
      .setAuthorizationBaseUrl('http://query.yahooapis.com/v1/public/yql')
      .setTokenUrl('')

      // Set the client ID and secret, from the Google Developers Console.
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      .setScope('')
}

function showSidebar() {
  var yahooService = getYahooService();
  if (!yahooService.hasAccess()) {
    var authorizationUrl = yahooService.getAuthorizationUrl();
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
        'Reopen the sidebar when the authorization is complete.');
    template.authorizationUrl = authorizationUrl;
    var page2 = template.evaluate();
    SpreadsheetApp.getUi().showSidebar(page2);
  } else {
    Logger.log('app has access yay');
    
    getWOEID();
  }
}

function authCallback(request) {
  var yahooService = getYahooService();
  var isAuthorized = yahooService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('we gucci, you can close this tab :*');
  } else {
    return HtmlService.createHtmlOutput('Denied. sorz dude, try again. also, you can close this tab');
  }
}
