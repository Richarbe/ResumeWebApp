var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM vehicle_model;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(vehicle_model_id, callback) {
    var query = 'SELECT * FROM vehicle_model WHERE vehicle_model_id = ?';
    var queryData = [vehicle_model_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO vehicle_model (mod_name, mass_at_pad_kg, thrust_asl_kN, use_status) VALUES (?,?,?,?)';

    var queryData = [params.mod_name, params.mass_at_pad_kg, params.thrust_asl_kN, params.use_status];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE vehicle_model SET mod_name = ?, mass_at_pad_kg = ?, thrust_asl_kN = ?, use_status = ? WHERE vehicle_model_id = ?';
    var queryData = [params.mod_name, params.mass_at_pad_kg, params.thrust_asl_kN, params.use_status, params.vehicle_model_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(vehicle_model_id, callback) {
    var query = 'DELETE FROM vehicle_model WHERE vehicle_model_id = ?';
    var queryData = [vehicle_model_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};