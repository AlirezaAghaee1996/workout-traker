import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Workout from "../Models/WorkoutMd.js";
import Exercise from "../Models/ExerciseMd.js";
export const create = catchAsync(async (req, res, next) => {
  const Exercise = await Exercise.create({ ...req.body, userId: req.userId });
  res.status(201).json({
    success: true,
    data: Exercise,
    message: "Exercise created successfully",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Exercise, req.query, req?.role)
    .addManualFilters({ userId: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Exercise, req.query, req?.role)
    .addManualFilters({
      $and: [{ _id: req.params.id }, { userId: req.userId }],
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const update = catchAsync(async (req, res, next) => {
  const { userId = null, ...otherData } = req.body;
  const ex = await Exercise.findById(req.params.id);
  if (ex.userId !== req.userId) {
    return next(
      new HandleERROR("You are not authorized to update this exercise", 401)
    );
  }
  const exercise = await Exercise.findByIdAndUpdate(req.params.id, otherData, {
    new: true,
  });
  res.status(200).json({
    success: true,
    data: exercise,
    message: "Exercise updated successfully",
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const ex = await Exercise.findById(req.params.id);
  if (ex.userId !== req.userId) {
    return next(
      new HandleERROR("You are not authorized to delete this exercise", 401)
    );
  }
  await Exercise.findByIdAndDelete(req.params.id);
  res.status(204).json({
    success: true,
    message: "Exercise deleted successfully",
  });
});
