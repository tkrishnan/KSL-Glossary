var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
    title: String,
    categories: Array,
    word: String,
    url: String
});

// List of videos of a specific category
videoSchema.statics.videosByCategory = function(cat,cb) {
    this.find({categories: cat }, cb);
}

// Returns an object 
videoSchema.statics.videosByCategoryAlpha = function(cat, cb) {
    var vidObj = {};
    console.log('what');
    var videosByCategoryCB = function(err, vids) {
        if (err) {
            cb('error');
        } else {
            for (var i = 0, len= vids.length; i < len; i++) {
                var vid = vids[i],
                firstLetter = vid.word[0].toLowerCase();

                firstLetter in vidObj ? vidObj[firstLetter].push(vid) : vidObj[firstLetter] = [vid];
            }

            cb(null, vidObj);
        }
    };

    cat === "all" ? this.find({}, videosByCategoryCB).setOptions({sort: 'word'}) : this.find({categories: cat }, videosByCategoryCB).setOptions({sort: 'word'});
}

exports.videoSchema = videoSchema;
