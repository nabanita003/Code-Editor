const express = require('express');
const cors = require('cors');
const executeRoutes = require("./routes/execute");
const app = express();
const PORT = 5000;

// DB connection
require('./connection/db');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use("/api/execute", executeRoutes);
app.use("/api/contact", require("./routes/contactRoutes"));

app.get('/hello', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});