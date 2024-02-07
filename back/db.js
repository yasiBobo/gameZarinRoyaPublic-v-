const mysql = require('mysql');

// Database connection for 'users' database
const usersConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'mydb',
});

// Database connection for 'users_data' database
const usersDataConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'user_data',
});

// Connect to 'users' database
usersConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL (users database):', err);
    throw err;
  }
  console.log('Connected to MySQL (users database)');
});

// Connect to 'users_data' database
usersDataConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL (users_data database):', err);
    throw err;
  }
  console.log('Connected to MySQL (users_data database)');
});

module.exports = {
  users: usersConnection,
  usersData: usersDataConnection,
};
