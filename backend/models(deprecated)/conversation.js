const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  messages: [{
    type: String,
    required: true
  }],
  sessionDetails: {
    type: Object, 
    required: true
  }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
