const router = require('express').Router();

const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');

router.get('/', homeRoutes);
router.get('/api', apiRoutes);

module.exports = router;