var express = require('express');
var router = express.Router();
var location_dal = require('../model/location_dal');

// View All accounts
router.get('/all', function(req, res) {
    location_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('location/locationViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.location_id == null) {
        res.send('location_id is null');
    }
    else {
        location_dal.getById(req.query.location_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('location/locationViewById', {'result': result});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    res.render('location/locationAdd');
});

// insert a company record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.loc_name == null) {
        res.send('A location name must be provided.');
    }
    else if(req.query.address == null) {
        res.send('An address must be provided');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        location_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/location/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.location_id == null) {
        res.send('A location id is required');
    }
    else {
        location_dal.getById(req.query.location_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('location/locationUpdate', {'result': result});
            }
        });
    }

});

router.get('/update', function(req, res) {
    location_dal.update(req.query, function(err, result){
        res.redirect(302, '/location/all');
    });
});

// Delete a location for the given location_id
router.get('/delete', function(req, res){
    if(req.query.location_id == null) {
        res.send('location_id is null');
    }
    else {
        location_dal.delete(req.query.location_id, function(err, result){

            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/location/all');
            }

        });
    }
});


module.exports = router;