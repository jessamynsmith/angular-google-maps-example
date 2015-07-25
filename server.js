var sslRedirect = require('heroku-ssl-redirect'),
  express = require('express'),
  app = express();

// enable ssl redirect
app.use(sslRedirect());

app.use(express.static('app'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// API Routes
app.get('/api/v1/yelp', function(request, response) {
  var url = require('url');
  var yelp = require("yelp").createClient({
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET
  });

  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  console.log(query);

  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search(query, function(error, data) {
    if (error) {
      console.log(error);
      response.send(error);
    }
    response.send(data);
  });
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
