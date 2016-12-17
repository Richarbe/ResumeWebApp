var express = require('express');
var router = express.Router();
var launch_attempt_dal = require('../model/launch_attempt_dal');
var vehicle_dal = require('../model/vehicle_dal');
var launch_pad_dal = require('../model/launch_pad_dal');

// View All accounts
router.get('/all', function(req, res) {
    launch_attempt_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('launch_attempt/launch_attemptViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.launch_attempt_id == null) {
        res.send('launch_attempt_id is null');
    }
    else {
        launch_attempt_dal.getById(req.query.launch_attempt_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('launch_attempt/launch_attemptViewById', {'result': result});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    vehicle_dal.getAll(function(err,vehicle) {
        launch_pad_dal.getAll(function(err,launch_pad) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('launch_attempt/launch_attemptAdd', {'vehicle':vehicle, 'launch_pad':launch_pad});
            }
        });
    });
});

// insert a company record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.launch_time == null) {
        res.send('A launch time must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        launch_attempt_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/launch_attempt/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.launch_attempt_id == null) {
        res.send('An launch attempt id is required');
    }
    else {
        launch_attempt_dal.getById(req.query.launch_attempt_id, function(err,launch_attempt) {
            vehicle_dal.getAll(function(err,vehicle) {
                launch_pad_dal.getAll(function(err,launch_pad) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.render('launch_attempt/launch_attemptUpdate', {
                            'launch_attempt': launch_attempt,
                            'vehicle': vehicle,
                            'launch_pad': launch_pad
                        });
                    }
                });
            });
        });
    }

});

router.get('/update', function(req, res) {
    if(req.query.launch_attempt_id == null) {
        res.send('An launch attempt id is required');
    }
    else {
        launch_attempt_dal.update(req.query, function(err, result){
            if (err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/launch_attempt/all');
            }
        });
    }
});

// Delete an launch_attempt for the given launch_attempt_id
router.get('/delete', function(req, res){
    if(req.query.launch_attempt_id == null) {
        res.send('launch_attempt_id is null');
    }
    else {
        launch_attempt_dal.delete(req.query.launch_attempt_id, function(err, result){

            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/launch_attempt/all');
            }

        });
    }
});


module.exports = router;