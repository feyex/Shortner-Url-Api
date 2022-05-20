const shortid = require('../utils/shortener');
const UrlSchema = require('../models/Url');
const isValidUrl = require('../utils/validateUrl');


module.exports.createUrlShortner = async (req, res) => {
    let { longUrl, shortUrl } = req.body;

    const newShortUrl = shortid(6);

    // check if user specified a short url
    let shortUrlValue = shortUrl ? shortUrl : newShortUrl;

    if (isValidUrl.ValidateUrl(longUrl)) {
        try {

            // Add https if url has no http to ensure redirect
            if(longUrl.includes('www')){
                longUrl = longUrl.includes('http') ? longUrl : isValidUrl.makeUrl(longUrl) ;
                 
            }

            let url = await UrlSchema.findOne({ longUrl });
            if (url) {
                res.status(200)
                    .json({
                        message: 'URL already exists',
                        url
                    });
            } else {
                if (shortUrl && shortUrl.length < 4) {
                    res.status(400)
                        .json({
                            message: 'Short Code Url Value Cannot be less than four in length ',
                        });
                }
                else {
                    // check if user provided an already existing url
                    let shortCode = await UrlSchema.findOne({ shortUrl: shortUrlValue });

                    shortUrl = shortCode ? newShortUrl : shortUrlValue;

                    url = new UrlSchema({
                        longUrl,
                        shortUrl
                    });

                    await url.save();
                    res.status(201)
                        .json({
                            message: 'URL successfully submitted',
                            'url': url.longUrl,
                            'shortCode': url.shortUrl,
                            'registeredAt': url.createdAt,
                        });
                }

            }
        } catch (err) {
            res.status(500).json('Server Error');
        }
    } else {
        res.status(400).json('The Url Provided is Invalid.');
    }
};

module.exports.getUrlByShortCode = async (req, res) => {
    try {
        //check if url exists
        const url = await UrlSchema.findOne({ shortUrl: req.params.shortcode });
        // console.log(url.length, 'll')
        if (url) {
            //update the number of time it has been accessed
            url.clicks++;
            await url.save();
            // redirect to original Url
            return await res.redirect(url.longUrl);
        } else {
            res.status(404)
                .json('Cannot Access Url / Short Code Url Not found');
        }
    } catch (err) {
        res.status(500).json('Server Error');
    }
}


module.exports.getUrlStats = async (req, res) => {
    try {
        const url = await UrlSchema.findOne({ shortUrl: req.params.shortcode });
        if (url) {
            res.status(200)
                .json({
                    'url': url.longUrl,
                    'shortCode': url.shortUrl,
                    'noOfTimesAccessed': url.clicks,
                    'registeredAt': url.createdAt,
                    'lastAccessed': url.updatedAt
                });
        } else res.status(404).json('Short Code for Url Not found');
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
}