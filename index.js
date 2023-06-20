// // Required dependencies
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const config = require('./config');


// // Create the Express app
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// const mongoURI = 'mongodb+srv://indrajitkopnar:8390259966@cluster0.g8pbnni.mongodb.net/designway?retryWrites=true&w=majority';
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((error) => {
//   console.log('Error connecting to MongoDB:', error);
// });

// // User model
// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model('User', UserSchema);

// // Register route
// app.post('/api/register', async (req, res) => {
//   // ... existing code ...
// });

// // Login route
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the email exists in the database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Compare the password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       '9067290380',
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({ token });
//   } catch (error) {
//     console.log('Error in login:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Protected routes
// app.use('/api/notes', (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, config.secret);
//     req.userData = decodedToken;
//     next();
//   } catch (error) {
//     console.error('Invalid token:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// // Notes route
// app.get('/api/notes', (req, res) => {
//   // Fetch the user's notes from the database based on the user ID in req.userData.userId
//   // Replace the following code with your logic to fetch the notes

//   const userId = req.userData.userId;

//   // Fetch the user's notes from the database
//   User.findById(userId, 'notes', (error, user) => {
//     if (error) {
//       console.error('Error fetching notes:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Send the user's notes as the response
//     res.status(200).json(user.notes);
//   });
// });

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });







//Required dependencies
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb+srv://indrajitkopnar:8390259966@cluster0.g8pbnni.mongodb.net/designway?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

// User model
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email or username already exists in the database
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log('Error in registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      '9067290380',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log('Error in login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
