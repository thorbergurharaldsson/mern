import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: String,
  phone: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});

// Export Contact model
export const Contact = mongoose.model("Contact", contactSchema);
Contact.get = (callback, limit) => {
  Contact.find(callback).limit(limit);
};
