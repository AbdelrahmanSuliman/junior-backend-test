import mongoose, { InferSchemaType } from "mongoose";
const { Schema } = mongoose;


const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"] as const,
    default: "user",
    required: true,
  },
}, {timestamps: true});



export type UserType = InferSchemaType<typeof userSchema>;

const User = mongoose.model('User', userSchema)
export default User