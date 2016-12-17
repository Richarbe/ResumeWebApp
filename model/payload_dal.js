var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM payload_full;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(payload_id, callback) {
    var query = 'SELECT * FROM payload_full WHERE payload_id = ?';
    var queryData = [payload_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO payload (pay_name, destination, success_status, vehicle_id, organization_id) VALUES (?,?,?,?,?)';

    var queryData = [params.pay_name, params.destination, params.success_status, params.vehicle_id, params.organization_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE payload SET pay_name = ?, destination = ?, success_status = ?, vehicle_id = ?, organization_id = ? WHERE payload_id = ?';
    var queryData = [params.pay_name, params.destination, params.success_status, params.vehicle_id, params.organization_id, params.payload_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(payload_id, callback) {
    var query = 'DELETE FROM payload WHERE payload_id = ?';
    var queryData = [payload_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};