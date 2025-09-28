import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import bcryptjs from "bcryptjs";

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.role)
    .addManualFilters(
       { _id: req.userId }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { fullName = null, password = null} = req.body;
  if (id != req.userId) {
    return next(new HandleERROR("Unauthorized", 401));
  }

  const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  if (password && !passReg.test(password)) {
    return next(
      new HandleERROR(
        "Password must be at least 8 characters long and contain uppercase, lowercase letters and numbers",
        400
      )
    );
  }
  const user = await User.findById(id);
  user.fullName = fullName || user.fullName;
  user.password = password ? bcryptjs.hashSync(password, 10) : user?.password;
  const newUser = await user.save();
  return res.status(200).json({
    message: "User updated successfully",
    data: newUser,
    success: true,
  });
});
