// Loading environment variables in a Node.js application, 
// especially when using the dotenv package, 
// allows you to manage your configuration options and sensitive information (like API keys) securely and outside of your codebase
require('dotenv').config();


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
