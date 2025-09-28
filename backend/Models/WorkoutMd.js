import mongoose from "mongoose";
const exercisesSchema = new mongoose.Schema(
  {
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: [true, "Exercise ID is required"],
    },
    sets: {
      type: Number,
      required: [true, "Number of sets is required"],
    },
    weight: {
      type: Number,
    },
    restTime: {
      type: Number,
      required: [true, "Rest time is required"],
    },
  },
  { _id: false }
);
const workoutSchema = new mongoose.Schema(
  {
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
      type: [exercisesSchema],
      default: [],
    },
  },
  { timestamps: true }
);
const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
