import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    name: {
      type: String,
      required: [true, "Exercise name is required"],
    },
    description: {
      type: String,
      required: [true, "Exercise description is required"],
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },
    category: {
      type: String,
      enum: ["strength", "cardio", "flexibility"],
      required: [true, "Exercise category is required"],
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;
