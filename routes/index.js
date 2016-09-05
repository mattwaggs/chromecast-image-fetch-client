var express = require('express');
var router = express.Router();
var imageViewer = require('chromecast-image-fetcher');

router.get('/', function(req, res, next) {
    
    var dimensions = {s: 400, w: 400, h: 250};
    var append = '=s{s}-w{w}-h{h}-p-k-no-nd-mv'
        .replace('{s}', dimensions.s)
        .replace('{w}', dimensions.w)
        .replace('{h}', dimensions.h);
    
    var images = imageViewer.fetchImages(function(err, images) {
        if(err) throw err;

        var finalImages = images.map(function(image, index) {
            return Object.assign({}, image, {
                imageURL: image.url + append
            });
        });
        
        res.render('index', {images: finalImages});
    });
});

module.exports = router;
