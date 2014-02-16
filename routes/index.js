
/*
 * GET home page.
 */
var mongoose = require('mongoose');
var videoSchema = require('../schemas/video').videoSchema;


var Video = mongoose.model('Video', videoSchema);

var getCatVids = function(cat) {
    return function(req, res) {
        Video.videosByCategoryAlpha(cat, function(err, vidObj) {
            if (err) {
              res.status(500).json({status: "error"});
            } else {
              res.status(200).json({status: 'success', vids: vidObj})
            }
        });
    }
}

exports.index = function(req, res){
    res.render('splash', { title: 'Kenyan Sign Language Directory' });
};

exports.biologyVids = getCatVids('biology');

exports.mathVids = getCatVids('math');

exports.chemistryVids = getCatVids('chemistry');

exports.physicsVids = getCatVids('physics');

exports.browse = function (req,res) {
    res.render('browse', {title: 'Kenyan Sign Language Directory'})
};


exports.quiz = function(req,res) {
    var selectMap = {
        biology: 0,
        math: 0,
        chemistry: 0,
        physics: 0
    }
    for (var param in req.query ) {
        if (param in selectMap) {
            selectMap[param] = 1;
        }
    }
    res.status(200).render('quiz', {status: 'success', selectMap: selectMap});
};

exports.admin = function(req, res) {
    res.render('admin', {title: "Login to KSL Admin"});
}
// exports.quizVids = function(req,res) {
//     var promises = [];
//     for (var param in req.query ) {
//         if (param in promiseMap) {

//         }
//     }
//     Promise.all(promises).then(function(vidLists) {
//         var allVids = [];
//         allVids = allVids.concat(vidLists);

//         res.status(200).json({status: 'success', vids: vidLists});
//     }).catch(function() {
//         res.status(500).json({status: 'err'});
//     }); 
// };


