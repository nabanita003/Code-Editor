const mongoose = require('mongoose');

// Replace with your connection string
const mongoURI = 'mongodb+srv://rimi:codeide123@cluster0.7fouzhv.mongodb.net/?appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// CommonJS export
module.exports = mongoose;