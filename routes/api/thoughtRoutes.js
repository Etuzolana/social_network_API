const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

'/api/users'
router.route('/').get(getThoughts).post(createThought);

//'api/users/792837489023740927342375'
router
  .route('/:Id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
