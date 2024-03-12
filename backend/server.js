const express = require('express');
require('dotenv').config();

// console.log(`API Key: ${process.env.MONGODB_DATA_API_KEY}`);
// console.log(`Cluster Name: ${process.env.CLUSTER_NAME}`);
// console.log(`Database Name: ${process.env.DATABASE_NAME}`);

const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// MongoDB Data API request function
const mongoDBDataAPIRequest = async (action, collectionName, body) => {
  const apiKey = process.env.MONGODB_DATA_API_KEY; 
  const baseUrl = `https://us-east-2.aws.data.mongodb-api.com/app/data-vxfib/endpoint/data/v1`;
  const url = `${baseUrl}/action/${action}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': apiKey
    },
    body: JSON.stringify({
      dataSource: process.env.CLUSTER_NAME,
      database: process.env.DATABASE_NAME,
      collection: collectionName,
      ...body
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`MongoDB Data API Error: ${response.status} ${errorBody}`);
  }

  return await response.json();
};

// POST Endpoint (Create User)
// Example of basic validation in your endpoint
app.post('/api/users', async (req, res) => {
  try {
    // Basic validation
    if (!req.body.name || !req.body.email) {
      return res.status(400).send("Missing required fields: 'name' and 'email'");
    }

    // Further validations can be added here...

    const userData = {
      document: {
        name: req.body.name,
        email: req.body.email,
        affiliation: req.body.affiliation 
        // Add other fields as necessary, following the structure you expect.
      }
    };

    const response = await mongoDBDataAPIRequest('insertOne', 'users', userData);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// GET Endpoint (Retrieve Users)
app.get('/api/users', async (req, res) => {
  try {
    const response = await mongoDBDataAPIRequest('find', 'users', {});
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT Endpoint (Update User)
app.put('/api/users/:id', async (req, res) => {
  try {
    const updateData = {
      filter: { _id: req.params.id },
      update: { $set: req.body }
    };
    const response = await mongoDBDataAPIRequest('updateOne', 'users', updateData);
    if (response.matchedCount === 0) {
      return res.status(404).send('The user with the given ID was not found.');
    }
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE Endpoint (Remove User)
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deleteData = {
      filter: { _id: req.params.id }
    };
    const response = await mongoDBDataAPIRequest('deleteOne', 'users', deleteData);
    if (response.deletedCount === 0) {
      return res.status(404).send('The user with the given ID was not found.');
    }
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
