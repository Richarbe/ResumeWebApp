var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM launch_pad_full;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(launch_pad_id, callback) {
    var query = 'SELECT * FROM launch_pad_full WHERE launch_pad_id = ?';
    var queryData = [launch_pad_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    // FIRST INSERT THE LOCATION
    var query = 'INSERT INTO launch_pad (pad_name, organization_id, location_id) VALUES (?,?,?)';

    var queryData = [params.pad_name, params.organization_id, params.location_id];

    // NOTE THE EXTRA [] AROUND companyAddressData
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE launch_pad SET pad_name = ?, organization_id = ?, location_id = ? WHERE launch_pad_id = ?';
    var queryData = [params.pad_name, params.organization_id, params.location_id, params.launch_pad_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(launch_pad_id, callback) {
    var query = 'DELETE FROM launch_pad WHERE launch_pad_id = ?';
    var queryData = [launch_pad_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};