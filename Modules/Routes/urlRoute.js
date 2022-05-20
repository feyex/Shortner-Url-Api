const express = require('express');
const router = express.Router();
const urlController = require ('../controller/url');

// declare routes to business logic
router.get('/:shortcode', urlController.getUrlByShortCode);

router.get('/:shortcode/stats', urlController.getUrlStats);

router.post('/', urlController.createUrlShortner);


module.exports = router;
  