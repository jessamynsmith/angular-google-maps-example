'use strict';

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
app.get('/api/v1/yelp/search', function(request, response) {
  const url = require('url');
  const yelpFusion = require('yelp-fusion');
  const yelp = yelpFusion.client(process.env.YELP_API_KEY);

  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;

  yelp.search(query, function(error, data) {
    if (error) {
      response.status(error.statusCode).send(error);
    } else {
      response.send(data);
    }
  });
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
