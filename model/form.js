const  mongoose = require('mongoose');


const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inspectionDate: { type: Date, default: Date.now },
  inspectorName: { type: String, required: true }, // Doctor/Nurse name
  bloodPressure: { type: String, required: true }, // Example: "120/80 mmHg"
  heartRate: { type: Number, required: true }, // Beats per minute
  temperature: { type: Number, required: true }, // Body temperature in °C or °F
  respiratoryRate: { type: Number, required: true }, // Breaths per minute
  bloodSugar: { type: Number }, // Optional - mg/dL
  weight: { type: Number, required: true }, // Kilograms
  height: { type: Number, required: true }, // Centimeters
  bmi: { type: Number }, // Body Mass Index (auto-calculated)
  allergies: [{ type: String }], // Example: ["Peanuts", "Dust"]
  chronicConditions: [{ type: String }], // Example: ["Diabetes", "Hypertension"]
  medications: [{ type: String }], // Example: ["Metformin", "Lisinopril"]
  smoking: { type: Boolean, default: false }, // Smoker or not
  alcoholConsumption: { type: Boolean, default: false }, // Drinks alcohol or not
  notes: { type: String } // Additional medical comments
}, { timestamps: true });

// Automatically calculate BMI before saving
formSchema.pre('save', function (next) {
  if (this.weight && this.height) {
    const heightInMeters = this.height / 100;
    this.bmi = (this.weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
  next();
});

module.exports = mongoose.model('Form', formSchema);

