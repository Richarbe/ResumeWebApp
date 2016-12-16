var express = require('express');
var router = express.Router();
var location_dal = require('../model/location_dal');
var organization_dal = require('../model/organization_dal');

// View All accounts
router.get('/all', function(req, res) {
    organization_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('organization/organizationViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.organization_id == null) {
        res.send('organization_id is null');
    }
    else {
        organization_dal.getById(req.query.organization_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('organization/organizationViewById', {'result': result});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    organization_dal.getAll(function(err,organization) {
        location_dal.getAll(function(err,location) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('organization/organizationAdd', {'organization':organization, 'location':location});
            }
        });
    });
});

// insert a company record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.org_name == null) {
        res.send('A organization name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        organization_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/organization/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.organization_id == null) {
        res.send('An organization id is required');
    }
    else {
        organization_dal.getById(req.query.organization_id, function(err,organization) {
            location_dal.getAll(function(err,location) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.render('organization/organizationUpdate', {'organization':organization, 'location':location});
                }
            });
        });
    }

});

router.get('/update', function(req, res) {
    if(req.query.organization_id == null) {
        res.send('An organization id is required');
    }
    else if(req.query.org_name == null) {
        res.send('An organization name is required');
    }
    else {
        organization_dal.update(req.query, function(err, result){
            if (err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/organization/all');
            }
        });
    }
});

// Delete an organization for the given organization_id
router.get('/delete', function(req, res){
    if(req.query.organization_id == null) {
        res.send('organization_id is null');
    }
    else {
        organization_dal.delete(req.query.organization_id, function(err, result){

            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/organization/all');
            }

        });
    }
});


module.exports = router;