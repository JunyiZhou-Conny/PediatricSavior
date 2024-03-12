const mongoose = require('mongoose');

// Define the schema for the responses
const ResponseSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId, // conversations are stored and have an ObjectId
    required: true,
    ref: 'Conversation' // This associates each response with a conversation
  },
  text: {
    type: String,
    required: true // Assuming every response needs to have some text
  },
  isCorrect: {
    type: Boolean,
    required: true // Whether the response is correct or not
  },
  feedback: {
    type: String,
    required: false // Feedback is optional
  }
  // other fields
});

// Create the model from the schema and export it
const Response = mongoose.model('Response', ResponseSchema);
module.exports = Response;
