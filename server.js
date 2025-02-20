var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.use(express.static('www'));
app.use(express.static(path.join('www', 'build')));

app.use(bodyParser.json());

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/dreamhouse';

if (process.env.DATABASE_URL !== undefined) {
  pg.defaults.ssl = true;
}

var client = new pg.Client(connectionString);
client.connect();

var propertyTable = 'property__c';
var favoriteTable = 'favorite__c';
var brokerTable = 'broker__c';
var xxxTable = 'xxx__c';
var yyyTable = 'yyy__c';


// setup the demo data if needed
client.query('SELECT * FROM salesforce.broker__c', function(error, data) {
  if (error !== null) {
    client.query('SELECT * FROM broker__c', function(error, data) {
      if (error !== null) {
        console.log('Loading Demo Data...');
        require('./db/demo.js')(client);
        console.log('Done Loading Demo Data!');
      }
    });
  }
  else {
    var schema = 'salesforce.';
    propertyTable = schema + 'property__c';
    favoriteTable = schema + 'favorite__c';
    brokerTable = schema + 'broker__c';
    xxxTable = schema + 'xxx__c';
    yyyTable = schema + 'yyy__c';
  }
});


app.get('/property', function(req, res) {
  client.query('SELECT * FROM ' + propertyTable, function(error, data) {
    res.json(data.rows);
  });
});

app.get('/property/:id', function(req, res) {
  client.query('SELECT ' + propertyTable + '.*, ' + brokerTable + '.sfid AS broker__c_sfid, ' + brokerTable + '.name AS broker__c_name, ' + brokerTable + '.email__c AS broker__c_email__c, ' + brokerTable + '.phone__c AS broker__c_phone__c, ' + brokerTable + '.mobile_phone__c AS broker__c_mobile_phone__c, ' + brokerTable + '.title__c AS broker__c_title__c, ' + brokerTable + '.picture__c AS broker__c_picture__c FROM ' + propertyTable + ' INNER JOIN ' + brokerTable + ' ON ' + propertyTable + '.broker__c = ' + brokerTable + '.sfid WHERE ' + propertyTable + '.sfid = $1', [req.params.id], function(error, data) {
    res.json(data.rows[0]);
  });
});


app.get('/favorite', function(req, res) {
  client.query('SELECT ' + propertyTable + '.*, ' + favoriteTable + '.sfid AS favorite__c_sfid FROM ' + propertyTable + ', ' + favoriteTable + ' WHERE ' + propertyTable + '.sfid = ' + favoriteTable + '.property__c', function(error, data) {
    res.json(data.rows);
  });
});

app.post('/favorite', function(req, res) {
  client.query('INSERT INTO ' + favoriteTable + ' (property__c) VALUES ($1)', [req.body.property__c], function(error, data) {
    res.json(data);
  });
});

app.delete('/favorite/:sfid', function(req, res) {
  client.query('DELETE FROM ' + favoriteTable + ' WHERE sfid = $1', [req.params.sfid], function(error, data) {
    res.json(data);
  });
});


app.get('/broker', function(req, res) {
  client.query('SELECT * FROM ' + brokerTable, function(error, data) {
    res.json(data.rows);
  });
});

app.get('/broker/:sfid', function(req, res) {
  client.query('SELECT * FROM ' + brokerTable + ' WHERE sfid = $1', [req.params.sfid], function(error, data) {
    res.json(data.rows[0]);
  });
});

/* XXX & YYY GET, POST, DELETE CALLS */
app.get('/xxx', function(req, res) {
  client.query('SELECT * FROM ' + xxxTable, function(error, data) {
    res.json(data.rows);
  });
});

app.get('/xxx/:sfid', function(req, res) {
  client.query('SELECT * FROM ' + xxxTable + ' WHERE sfid = $1', [req.params.sfid], function(error, data) {
    res.json(data.rows[0]);
  });
});

app.get('/yyy', function(req, res) {
  client.query('SELECT ' + xxxTable + '.*, ' + yyyTable + '.sfid AS yyy__c_sfid FROM ' + xxxTable + ', ' + yyyTable + ' WHERE ' + xxxTable + '.sfid = ' + yyyTable + '.xxx__c', function(error, data) {
    res.json(data.rows);
  });
});

app.post('/yyy', function(req, res) {
  ///let randNumber= Math.floor(Math.random() * 10000000000);
  client.query('INSERT INTO ' + yyyTable + ' (xxx__c, output__c) VALUES ($1, $2)', [req.body.xxx__c, req.body.output__c], function(error, data) {
    res.json(data);
  });
});

app.delete('/yyy/:sfid', function(req, res) {
  client.query('DELETE FROM ' + yyyTable + ' WHERE sfid = $1', [req.params.sfid], function(error, data) {
    res.json(data);
  });
});

/* Post call inserting the output field into the database*/
app.post('/output', function(req, res) {
  //let randName = Math.floor(Math.random() * 10000000000);
  client.query('INSERT INTO ' + yyyTable + ' (xxx__c, output__c) VALUES ($1, $2)', [req.body.xxx__c, req.body.output__c], function(error, data) {
    res.json(data);
  });
});

var port = process.env.PORT || 8200;

app.listen(port);

//console.log('Listening at: http://localhost:' + port);
