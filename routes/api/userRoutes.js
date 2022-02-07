const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addAssignment,
  removeAssignment,
} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);


router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//router.route('/:userId').get(getSingleUser).put(updateUser);


router.route('/:userId/assignments').post(addAssignment);

router.route('/:userId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
