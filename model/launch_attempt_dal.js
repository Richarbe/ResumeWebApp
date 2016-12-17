var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM launch_attempt_full;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(launch_attempt_id, callback) {
    var query = 'SELECT * FROM launch_attempt_full WHERE launch_attempt_id = ?';
    var queryData = [launch_attempt_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO launch_attempt (launch_time, success_status, launch_pad_id, vehicle_id) VALUES (?,?,?,?)';

    var queryData = [params.launch_time, params.success_status, params.launch_pad_id, params.vehicle_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE launch_attempt SET launch_time = ?, success_status = ?, launch_pad_id = ?, vehicle_id = ? WHERE launch_attempt_id = ?';
    var queryData = [params.launch_time, params.success_status, params.launch_pad_id, params.vehicle_id, params.launch_attempt_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(launch_attempt_id, callback) {
    var query = 'DELETE FROM launch_attempt WHERE launch_attempt_id = ?';
    var queryData = [launch_attempt_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};