var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('about/main');
});

router.get('/entity_relationship_diagram', function(req, res, next){
    res.render('includes/image', {title:'Entity Relationship Diagram', file:'ERD.png', back:'../about'})
});

router.get('/functional_dependancy_diagram', function(req, res, next){
    res.render('includes/image', {title:'Functional Dependency Diagram', file:'FDD.png', back:'../about'})
});

router.get('/relation_schema', function(req, res, next){
    res.render('includes/image', {title:'Relation Schema', file:'RS.png', back:'../about'})
});
module.exports = router;
