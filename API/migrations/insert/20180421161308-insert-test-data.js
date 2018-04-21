'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {

  //password = test

  db.insert('users', ['email', 'firstname', 'lastname', 'password'], 
  ['myuser@test.fr', 'Jean', 'Dupont', '$2b$10$hpQ4XGtsArdwZkKy/BfTq.LscrM1/tVavwn5v9Cd7sQJ72dYyqU/W'], callback);

};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
