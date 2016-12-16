var express = require('express');
var router = express.Router();
var location_dal = require('../model/location_dal');
var organization_dal = require('../model/organization_dal');
var launch_pad_dal = require('../model/launch_pad_dal');

// View All accounts
router.get('/all', function(req, res) {
    launch_pad_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('launch_pad/launch_padViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.launch_pad_id == null) {
        res.send('launch_pad_id is null');
    }
    else {
        launch_pad_dal.getById(req.query.launch_pad_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('launch_pad/launch_padViewById', {'result': result});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    launch_pad_dal.getAll(function(err,launch_pad) {
        location_dal.getAll(function (err, location) {
            organization_dal.getAll(function (err, organization) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.render('launch_pad/launch_padAdd', {'launch_pad':launch_pad, 'location': location, 'organization': organization});
                }
            });
        });
    });
});

// insert a company record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.pad_name == null) {
        res.send('A launch_pad name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        launch_pad_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/launch_pad/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.launch_pad_id == null) {
        res.send('An launch_pad id is required');
    }
    else {
        launch_pad_dal.getById(req.query.launch_pad_id, function(err,launch_pad) {
            location_dal.getAll(function(err,location) {
                organization_dal.getAll(function (err, organization) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.render('launch_pad/launch_padUpdate', {'launch_pad': launch_pad, 'location': location, 'organization': organization});
                    }
                });
            });
        });
    }

});

router.get('/update', function(req, res) {
    if(req.query.launch_pad_id == null) {
        res.send('An launch_pad id is required');
    }
    else if(req.query.pad_name == null) {
        res.send('An launch pad name is required');
    }

    else {
        launch_pad_dal.update(req.query, function(err, result){
            if (err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/launch_pad/all');
            }
        });
    }
});

// Delete a launch_pad for the given launch_pad_id
router.get('/delete', function(req, res){
    if(req.query.launch_pad_id == null) {
        res.send('launch_pad_id is null');
    }
    else {
        launch_pad_dal.delete(req.query.launch_pad_id, function(err, result){

            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/launch_pad/all');
            }

        });
    }
});


module.exports = router;