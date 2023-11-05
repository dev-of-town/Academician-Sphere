const router = require('express').Router();

router.use(require('./authentication'));
router.use(require('./user'));
router.use(require('./community'));
router.use(require('./post'));
router.use(require('./search'));

module.exports = router;