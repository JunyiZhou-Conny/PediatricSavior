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

   // /api/users endpoint for creating new user records in the database
let User;
   try {
       User = require('./models/users'); // Attempt to import the User model
   } catch (error) {
       console.error("Failed to load the User model:", error);
       // Handle errors
       process.exit(1); 
   }
   
   // POST Endpoint (Create Users)
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
  
///api/conversations endpoint for creating new conversation records in the database
  const Conversation = require('./models/conversation'); 

  // POST Endpoint for creating a new conversation entry
  app.post('/api/conversation', async (req, res) => {
    // Assuming Conversation is a model like User
    const conversation = new Conversation({
      userId: req.body.userId,
      messages: req.body.messages,
      sessionDetails: req.body.sessionDetails
    });
    try {
      await conversation.save();
      res.send(conversation);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // GET Endpoint (Retrieve all conversations for a specific user)
  app.get('/api/conversation/:userId', async (req, res) => {
    try {
      const conversations = await Conversation.find({ userId: req.params.userId });
      res.send(conversations);
    } catch (error) {
      res.status(500).send(error);
    }
  });


const Response = require('./models/response'); // Adjust the path as needed

// response validation
app.post('/api/responses/validate', async (req, res) => {
  const response = new Response({
    conversationId: req.body.conversationId,
    text: req.body.text,
    isCorrect: req.body.isCorrect,
    feedback: req.body.feedback
  });
  try {
    await response.save();
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

  
  
