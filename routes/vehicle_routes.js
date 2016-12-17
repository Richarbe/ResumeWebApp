var express = require('express');
var router = express.Router();
var vehicle_model_dal = require('../model/vehicle_model_dal');
var organization_dal = require('../model/organization_dal');
var vehicle_dal = require('../model/vehicle_dal');

// View All accounts
router.get('/all', function(req, res) {
    vehicle_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('vehicle/vehicleViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.vehicle_id == null) {
        res.send('vehicle_id is null');
    }
    else {
        vehicle_dal.getById(req.query.vehicle_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('vehicle/vehicleViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    vehicle_model_dal.getAll(function (err, vehicle_model) {
        organization_dal.getAll(function (err, organization) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('vehicle/vehicleAdd', {'vehicle_model': vehicle_model, 'organization': organization});
            }
        });
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.veh_name == null) {
        res.send('A vehicle name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        vehicle_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/vehicle/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.vehicle_id == null) {
        res.send('An vehicle id is required');
    }
    else {
        vehicle_dal.getById(req.query.vehicle_id, function(err,vehicle) {
            vehicle_model_dal.getAll(function(err,vehicle_model) {
                organization_dal.getAll(function (err, organization) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.render('vehicle/vehicleUpdate', {'vehicle': vehicle, 'vehicle_model': vehicle_model, 'organization': organization});
                    }
                });
            });
        });
    }

});

router.get('/update', function(req, res) {
    if(req.query.vehicle_id == null) {
        res.send('A vehicle id is required');
    }
    else if(req.query.veh_name == null) {
        res.send('vehicle name is required');
    }

    else {
        vehicle_dal.update(req.query, function(err, result){
            if (err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/vehicle/all');
            }
        });
    }
});

// Delete a vehicle for the given vehicle_id
router.get('/delete', function(req, res){
    if(req.query.vehicle_id == null) {
        res.send('vehicle_id is null');
    }
    else {
        vehicle_dal.delete(req.query.vehicle_id, function(err, result){

            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/vehicle/all');
            }

        });
    }
});


module.exports = router;