var Table = require('../models/table');

// Display list of all BookInstances.

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        table_count: function(callback) {
            Table.countDocuments({}, callback);
        },
        table_available_count: function(callback) {
            Table.countDocuments({booked: false}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Закусочная', error: err, data: results });
    });
};

exports.table_list = function(req, res, next) {
    Table.find({}, 'number booked')
      .populate('table')
      .exec(function (err, list_tables) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('table_list', { title: 'Закусочная: столы', table_list: list_tables });
      });
  
};

exports.table_detail = function(req, res) {
    Table.find({_id: req.params.id}, 'number booked dataBooked')
      .populate('table')
      .exec(function (err, list_tables) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('table_detail', { title: 'Закусочная: стол ' + list_tables[0].number, table: list_tables[0] });
      });
};

exports.table_detail_booked = function(req, res) {
    Table.findByIdAndUpdate(req.params.id, {booked: true, dataBooked: Date.now()}, function (err, table) {
        if (err) { return next(err); }
        //Successful, so render
        table.booked = true
        table.dataBooked = Date.now()
        res.render('table_detail_booked', { title: 'Закусочная: бронь', table: table, name: req.params.name });
      });
};