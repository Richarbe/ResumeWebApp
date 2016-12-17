var express = require('express');
var router = express.Router();
var payload_dal = require('../model/payload_dal');
var organization_dal = require('../model/organization_dal');
var vehicle_dal = require('../model/vehicle_dal');

// View All accounts
router.get('/all', function(req, res) {
    payload_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('payload/payloadViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.payload_id == null) {
        res.send('payload_id is null');
    }
    else {
        payload_dal.getById(req.query.payload_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('payload/payloadViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    vehicle_dal.getAll(function (err, vehicle) {
        organization_dal.getAll(function (err, organization) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('payload/payloadAdd', {'vehicle': vehicle, 'organization': organization});
            }
        });
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.pay_name == null) {
        res.send('A payload name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        payload_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/payload/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.payload_id == null) {
        res.send('An payload id is required');
    }
    else {
        payload_dal.getById(req.query.payload_id, function(err,payload) {
            vehicle_dal.getAll(function(err,vehicle) {
                organization_dal.getAll(function (err, organization) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.render('payload/payloadUpdate', {'payload': payload, 'vehicle': vehicle, 'organization': organization});
                    }
                });
            });
        });
    }

});

router.get('/update', function(req, res) {
    if(req.query.payload_id == null) {
        res.send('A payload id is required');
    }
    else if(req.query.pay_name == null) {
        res.send('payload name is required');
    }

    else {
        payload_dal.update(req.query, function(err, result){
            if (err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/payload/all');
            }
        });
    }
});

// Delete a payload for the given payload_id
router.get('/delete', function(req, res){
    if(req.query.payload_id == null) {
        res.send('payload_id is null');
    }
    else {
        payload_dal.delete(req.query.payload_id, function(err, result){

            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/payload/all');
            }

        });
    }
});


module.exports = router;