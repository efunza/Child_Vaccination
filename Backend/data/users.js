const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10),  // hashed password
    role: 'admin',
  },
  {
    id: 2,
    email: 'parent@example.com',
    password: bcrypt.hashSync('parent123', 10),
    role: 'parent',
  },
  {
    id: 3,
    email: 'squperlier@gmail.com',
    password: bcrypt.hashSync('simon123', 10),
    role: 'parent',
  },
];

module.exports = users;
