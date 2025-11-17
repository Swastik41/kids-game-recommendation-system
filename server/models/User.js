import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, minlength: 2, maxlength: 60 },
    email: { type: String, trim: true, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
   role: {
  type: String,
  enum: ['Admin', 'Parent', 'Teacher', 'Kid'], // ✅ include exact capitalizations you send
  default: 'Admin'
},

  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);