var videoSchema = require('./schemas/video').videoSchema;
var db = require('./db');
var mongoose= require('mongoose');

var AWS = require('aws-sdk');

AWS.config.loadFromPath('./aws.json');

var s3 = new AWS.S3(); 

var params = {Bucket: 'ksl-directory'};

var regex = /(\w+)\/(\w+)[\-]?(\w+)?\.webmhd\.webm/;

var Video = mongoose.model('Video', videoSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    s3.listObjects(params, function(err, data) {
        if (err) {
            console.log('err');
        } else {
            for (i in data.Contents) {
                var video = data.Contents[i];
                var match = regex.exec(video.Key);
                if (match) {
                    // match[0] is whole match, match[1] is category, match[2] and onwards are words of title.
                    var category = match[1].toLowerCase();
                    var title = match[2].split("variation")[0];
                    // To UpperCase
                    title = title.charAt(0).toUpperCase() + title.slice(1);

                    for (var x = 3, len = match.length; x < len; x++) {
                        var word = match[x];

                        if (typeof word === 'undefined') {
                            break;
                        }

                        word = word.charAt(0).toUpperCase() + word.slice(1);
                        title += " " + word.split("variation")[0];
                    }
                    var v = new Video({
                        title: title,
                        categories: [category],
                        word: title,
                        url: "https://s3.amazonaws.com/ksl-directory/" + video.Key
                    });
                    //console.log(v);
                    v.save(function(err, vid) {
                        if (err) {
                            console.log('error saving: ' + vid);
                        }
                    });
                    // console.log(video.Key + ": " + title);
                } else {
                    console.log("NO: " + video.Key);
                }
                
            }
        }
    });
});

