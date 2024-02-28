//Import Express and set up a basic server
const express = require('express');
const app = express();
app.use(express.json()); // for parsing application/json
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:DYf8nEKeYqFOECKo@cluster0.p2u4qxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connected to MongoDB...')) // This line confirms that the connection was successful.
   .catch(err => console.error('Could not connect to MongoDB...', err)); // error in connection

let User;
   try {
       User = require('./models/users'); // Attempt to import the User model
   } catch (error) {
       console.error("Failed to load the User model:", error);
       // Handle the error appropriately
       // For example, you might want to exit the process if this is a critical failure
       process.exit(1); 
   }
   
   // POST Endpoint
   app.post('/api/users', async (req, res) => {
     const user = new User({
       name: req.body.name,
       email: req.body.email,
       // Populate other fields
     });
     try {
       await user.save();
       res.send(user);
     } catch (error) {
       res.status(500).send(error);
     }
   });
   //GET Endpoint (Retrieve Users):
   app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //PUT Endpoint (Update User):
  app.put('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).send('The user with the given ID was not found.');
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //DELETE Endpoint (Remove User):
  app.delete('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send('The user with the given ID was not found.');
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  
  
