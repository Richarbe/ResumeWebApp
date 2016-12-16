var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM vehicle_full;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(vehicle_id, callback) {
    var query = 'SELECT * FROM vehicle_full WHERE vehicle_id = ?';
    var queryData = [vehicle_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO vehicle (veh_name, vehicle_model_id, organization_id) VALUES (?,?,?)';

    var queryData = [params.veh_name, params.vehicle_model_id, params.organization_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE vehicle SET veh_name = ?, vehicle_model_id = ?, organization_id = ? WHERE vehicle_id = ?';
    var queryData = [params.veh_name, params.vehicle_model_id, params.organization_id, params.vehicle_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(vehicle_id, callback) {
    var query = 'DELETE FROM vehicle WHERE vehicle_id = ?';
    var queryData = [vehicle_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};