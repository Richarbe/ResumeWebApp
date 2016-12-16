var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM organization_full;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(organization_id, callback) {
    var query = 'SELECT * FROM organization_full WHERE organization_id = ?';
    var queryData = [organization_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    // FIRST INSERT THE LOCATION
    var query = 'INSERT INTO organization (org_name, start_date, end_date, location_id) VALUES (?,?,?,?)';

    var queryData = [params.org_name, params.start_date, params.end_date, params.location_id];

    // NOTE THE EXTRA [] AROUND companyAddressData
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE organization SET org_name = ?, start_date = ?, end_date = ?, location_id = ? WHERE organization_id = ?';
    var queryData = [params.org_name, params.start_date, params.end_date, params.location_id, params.organization_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(organization_id, callback) {
    var query = 'DELETE FROM organization WHERE organization_id = ?';
    var queryData = [organization_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};