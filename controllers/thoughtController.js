const { text } = require('express');
const { User, Thought } = require('../models');

module.exports = {
 
  
  getThoughts(req, res) {
    Thought.find()
      .then((courses) => res.json(courses))
      .catch((err) => res.status(500).json(err));
  },
 

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.Id })
      .select('-__v')
      .then((thoughtText) =>
        !thoughtText
          ? res.status(404).json({ message: 'No course with that ID' })
          : res.json(thoughtText)
      )
      .catch((err) => res.status(500).json(err));
  },
  

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
 

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.Id })
     
      .then(() => res.json({ message: 'Thought and users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.Id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};