var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('overwatch.sqlite');

db.serialize(function() {
  db.run("CREATE TABLE teams (logo VARCHAR, name VARCHAR)");
});

db.close();