var express = require('express');
var router = express.Router();
var vehicle_model_dal = require('../model/vehicle_model_dal');

// View All accounts
router.get('/all', function(req, res) {
    vehicle_model_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('vehicle_model/vehicle_modelViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.vehicle_model_id == null) {
        res.send('vehicle_model_id is null');
    }
    else {
        vehicle_model_dal.getById(req.query.vehicle_model_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('vehicle_model/vehicle_modelViewById', {'result': result});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    res.render('vehicle_model/vehicle_modelAdd');
});

// insert a company record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.mod_name == null) {
        res.send('A vehicle_model name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        vehicle_model_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/vehicle_model/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.vehicle_model_id == null) {
        res.send('A vehicle_model id is required');
    }
    else {
        vehicle_model_dal.getById(req.query.vehicle_model_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('vehicle_model/vehicle_modelUpdate', {'result': result});
            }
        });
    }

});

router.get('/update', function(req, res) {
    vehicle_model_dal.update(req.query, function(err, result){
        res.redirect(302, '/vehicle_model/all');
    });
});

// Delete a vehicle_model for the given vehicle_model_id
router.get('/delete', function(req, res){
    if(req.query.vehicle_model_id == null) {
        res.send('vehicle_model_id is null');
    }
    else {
        vehicle_model_dal.delete(req.query.vehicle_model_id, function(err, result){

            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/vehicle_model/all');
            }

        });
    }
});


module.exports = router;