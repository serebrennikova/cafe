#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Table = require('./models/table')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var tables = []


function tableCreate(number, booked, dataBooked, cb) {
  tabledetail = { 
    number: number,
    booked: booked,
    dataBooked: dataBooked
  }    
    
  var table = new Table(tabledetail);    
  table.save(function (err) {
    if (err) {
      console.log('ERROR CREATING BookInstance: ' + table);
      cb(err, null)
      return
    }
    console.log('New Table: ' + table);
    tables.push(table)
    cb(null, table)
  }  );
}



function createTables(cb) {
    async.parallel([
        function(callback) {
            tableCreate(1, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(2, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(3, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(4, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(5, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(6, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(7, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(8, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(9, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(10, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(11, false, Date.now(), callback)
        },
        function(callback) {
            tableCreate(12, false, Date.now(), callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createTables
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Tables: '+tables);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});