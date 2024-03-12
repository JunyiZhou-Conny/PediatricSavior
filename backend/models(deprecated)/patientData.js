const mongoose = require('mongoose');

const patientDataSchema = new mongoose.Schema({
  objective: String,
  name: String,
  age: Number,
  sex: String,
  weight: String,
  diagnosis: String,
  scenario: String,
  medicalHistory: String,
  scenarios: String,
  phaseData: {
    hr: String,
    rr: String,
    temp: String,
    nibp: String,
    o2: String,
    additionalInfo: String,
    hardStop: String,
    softStop: String
  }
  // other fields
});

module.exports = mongoose.model('PatientData', patientDataSchema);
