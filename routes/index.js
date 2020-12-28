const express = require('express');
const bodyParser = require('body-parser');
const UrlInfo = require('../models/UrlInfo');
const shortCode = require('../functions/shortCode');
const validUrl = require('valid-url');
const cors = require('cors');
const router = express.Router();


router.use(bodyParser.json());
router.use(cors());
// render logic to redirect to original url
router.get('/:code', async (req, res) => {
    const urlCode = req.params.code;
    const urlItem = await UrlInfo.findOne({urlCode: urlCode })
    if(urlItem) {
        urlItem.clickCount++;
        urlItem.save();
        res.redirect(urlItem.originalUrl)
    } else {
        res.status(403).send('No url found')
    }
})

// render logic to enter data into db
router.post('/api', async (req, res) => {
    var { originalUrl } = req.body;
    if(validUrl.isUri(originalUrl)) {
        const foundInDB = await UrlInfo.findOne({ originalUrl: originalUrl });
        // generate short code 
        // create item and save to db
        if(!foundInDB) {       
        var urlCode = shortCode();
        var shortUrl = 'http://localhost:5000/' + urlCode;
        const itemToBeSaved = { originalUrl, shortUrl, urlCode, clickCount: 0 };
        const item = new UrlInfo(itemToBeSaved);
        await item.save();
        res.status(200).json(itemToBeSaved); 
        } else {
            res.send({foundUrl: `${foundInDB.shortUrl}`});
        }
    } else {
        res.send({invalidUrl: 'Invalid Url'});
    }
})
module.exports = router;