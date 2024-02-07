// In index.js
const express = require('express');
const cors = require('cors');
const User = require('./User');
const sequelize = require('./sequelize');
const Users = require('./Users');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Sync the models with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();



// Route to get user data by username
app.get('/api/users_data/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Decode the username (since it seems to be encoded in the request)
    const decodedUsername = decodeURIComponent(username);
    console.log('Requested username:', decodedUsername);

    // Check if the user exists in the database
    const userData = await User.findOne({ where: { username: decodedUsername } });

    if (!userData) {
      console.log('User not found for username:', decodedUsername);
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user data
    res.json(userData);
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});



// Route to add a new user or check if user exists
app.post('/api/users_data', async (req, res) => {
  const { username, rightClicks, mistakes, played_time } = req.body;

  try {
    console.log('Received request to save user:', req.body); // Log the received data

    // Check if the user already exists
    const existingUser = await User.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      // If user already exists, send a response with user info
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    } else {
      // If user does not exist, create a new user
      const newUser = await User.create({
        username,
        rightClicks,
        mistakes,
        played_time: 1,
      });

      console.log('User added successfully:', newUser.toJSON()); // Log the new user data

      res.status(201).json({ message: 'User added successfully', userId: newUser.id });
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { username, personal_code } = req.body;

  try {
    // Assuming your model handles auto-increment for id and sets login_time to the current time
    const newUser = await Users.create({ username, personal_code });
    
    res.json({ message: 'User added successfully!', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);

    // Check if the error is related to Sequelize validation
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => ({
        message: err.message,
        type: err.type,
        path: err.path,
      }));
      res.status(400).json({ error: 'Validation Error', details: validationErrors });
    } else {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
});


// Route to get all users from the 'users' table
app.get('/api/users', async (req, res) => {
  try {
    // Assuming you have a model named 'User' for the 'users' table
    const allUsers = await Users.findAll({ tableName: 'users' });
    res.json(allUsers);
  } catch (error) {
    console.error('Error getting all users from the "users" table:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


app.get('/api/user_data', async (req, res) => {
  try {
    // Assuming you have a model named 'User' for the 'user_data' table
    const allUsers = await User.findAll({ tableName: 'user_data' });
    res.json(allUsers);
  } catch (error) {
    console.error('Error getting all users from the "user_data" table:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.delete('/api/user_data/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Decode the username
    const decodedUsername = decodeURIComponent(username);

    const deletedUsers = await User.destroy({
      where: {
        username: decodedUsername,
      },
    });

    if (deletedUsers > 0) {
      res.json({ message: `${deletedUsers} user(s) deleted successfully` });
    } else {
      res.status(404).json({ error: 'User(s) not found' });
    }
  } catch (error) {
    console.error('Error deleting user(s):', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Update a user's username in user_data table
app.put('/api/user_data/:userId', async (req, res) => {
  const { userId } = req.params;
  const { newUsername } = req.body;

  try {
    // Update the user data in the database
    const [updatedRowsCount] = await User.update(
      { username: newUsername },
      { where: { id: userId } }
    );

    if (updatedRowsCount === 1) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
