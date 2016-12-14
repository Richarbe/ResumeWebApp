var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM location;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(location_id, callback) {
    var query = 'SELECT * FROM location WHERE location_id = ?';
    var queryData = [location_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    // FIRST INSERT THE LOCATION
    var query = 'INSERT INTO location (loc_name, address) VALUES (?,?)';

    var queryData = [params.loc_name, params.address];

    // NOTE THE EXTRA [] AROUND companyAddressData
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });

};

exports.delete = function(location_id, callback) {
    var query = 'DELETE FROM location WHERE location_id = ?';
    var queryData = [location_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};