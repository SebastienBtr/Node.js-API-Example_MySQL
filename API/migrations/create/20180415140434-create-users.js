'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('users', {
    id: { 
      type: 'int', 
      unsigned: true,
      primaryKey: true,
      autoIncrement: true, 
    },
    email: {
      type: 'string',
      notNull: true,
      unique: true
    },
    password: {
      type: 'string',
      notNull: true
    },
    firstname: 'string',
    lastname: 'string',
    created_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP')
    } 
  });
};

exports.down = function (db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
