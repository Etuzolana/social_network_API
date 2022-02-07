const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');


  await Thought.deleteMany({});

  await User.deleteMany({});

  const users = [];

  const assignments = getRandomAssignments(20);

  
  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      first,
      last,
      github,
      assignments,
    });
  }

  
  await User.collection.insertMany(users);

  await Thought.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    users: [...users],
  });

  console.table(users);
  console.table(assignments);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
