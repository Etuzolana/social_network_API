const { User, Thought } = require('../models');


const headCount = async () =>
  await User.aggregate()
    .count('userCount')
    .then((numberOfUser) => numberOfUsers);



const grade = async (userId) =>
  User.aggregate([
    {
      $unwind: '$assignments',
    },
    {
      $group: { _id: userId, overallGrade: { $avg: '$assignments.score' } },
    },
  ]);

module.exports = {
 

  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
       //   headCount: await headCount(),
        };
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
     // .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: req.body,},
      {runValidators: true,
        new: true,}
    ).then((dbUserData) => { 
      if (!dbUserData){
        res.status(404).json({message: "No user found with this ID"})
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
   },


  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no courses found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  

  addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
 

  removeAssignment(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};