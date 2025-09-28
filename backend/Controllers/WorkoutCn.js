import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Workout from "../Models/WorkoutMd.js";
export const create = catchAsync(async (req, res, next) => {
  const workout = await Workout.create({ ...req.body, userId: req.userId });
  res.status(201).json({
    success: true,
    data: workout,
    message: "Workout created successfully",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Workout, req.query, req?.role)
    .addManualFilters({ userId: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: "exercises" });
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Workout, req.query, req?.role)
    .addManualFilters({
      $and: [{ _id: req.params.id }, { userId: req.userId }],
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: "exercises" });
  const result = await features.execute();
  return res.status(200).json(result);
});
export const update = catchAsync(async (req, res, next) => {
  const { userId = null, ...otherData } = req.body;
  const wk = await Workout.findById(req.params.id);
  if (wk.userId !== req.userId) {
    return next(
      new HandleERROR("You are not authorized to update this workout", 401)
    );
  }
  const workout = await Workout.findByIdAndUpdate(req.params.id, otherData, {
    new: true,
  });
  res.status(200).json({
    success: true,
    data: workout,
    message: "Workout updated successfully",
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const wk = await Workout.findById(req.params.id);
  if (wk.userId !== req.userId) {
    return next(
      new HandleERROR("You are not authorized to delete this workout", 401)
    );
  }
  await Workout.findByIdAndDelete(req.params.id);
  res.status(204).json({
    success: true,
    message: "Workout deleted successfully",
  });
});
