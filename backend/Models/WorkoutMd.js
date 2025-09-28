import mongoose from "mongoose";
const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  exercises: {
    type:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Exercise",
        }
    ],
    default: []
  }
},{timestamps: true});
const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
