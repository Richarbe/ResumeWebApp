var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM resume_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(resume_id, callback) {
    var query = 'SELECT r.*, s.name FROM resume_view r ' +
        'LEFT JOIN resume_skill rs ON rs.resume_id = r.resume_id ' +
        'LEFT JOIN skill s ON s.skill_id = rs.skill_id ' +
        'WHERE r.resume_id = ?';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO resume (account_id, resume_name) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.account_id, params.resume_name];

    connection.query(query, queryData, function(err, result) {

        // THEN USE THE resume_ID RETURNED AS insertId AND THE SELECTED skill_IDs INTO resume_skill
        var resume_id = result.insertId;
        // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
        var query = 'INSERT INTO resume_skill (resume_id, skill_id) VALUES ?';

        // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
        var resumeSkillData = [];
        for (var i = 0; i < params.skill_id.length; i++) {
            resumeSkillData.push([resume_id, params.skill_id[i]]);
        }


        connection.query(query, [resumeSkillData], function (err, result) {
            callback(err, result);
        });
    });
};


exports.delete = function(resume_id, callback) {
    var query = 'DELETE FROM resume WHERE resume_id = ?';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};
