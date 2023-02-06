const router = require('express').Router();
// will need to insert file path into router.get currently set to homepage
router.get('/', async (req,res) => {
   res.render('all');
});

module.exports = router;