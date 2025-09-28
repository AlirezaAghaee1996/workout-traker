import { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import { sendAuthCode, verifyCode } from "../Utils/SmsHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const auth = catchAsync(async (req, res, next) => {
  const { phoneNumber } = req.body;
  const user = await User.findOne({ phoneNumber });
  if (!user || !user?.password) {
    const smsResult = await sendAuthCode(phoneNumber);
    if (smsResult?.success) {
      return res.status(200).json({
        message: "SMS sent successfully",
        success: true,
        data: {
          userExist: user?._id ? true : false,
          passwordExist: false,
        },
      });
    } else {
      return res.status(400).json({
        message: smsResult.message,
        success: false,
      });
    }
  }
  return res.status(200).json({
    success: true,
    data: {
      userExist: true,
      passwordExist: true,
    },
  });
});

export const loginWithPassword = catchAsync(async (req, res, next) => {
  const { phoneNumber = null, password = null } = req.body;
  if (!phoneNumber || !password) {
    return next(new HandleERROR("Phone number and password are required", 400));
  }
  const user = await User.findOne({ phoneNumber })
  if (!user || !user?.password) {
    return next(
      new HandleERROR(!user ? "User not found" : "Password not found", 400)
    );
  }
  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch) {
    return next(new HandleERROR("Invalid password", 400));
  }
  const token = jwt.sign(
    { id: user._id},
    process.env.JWT_SECRET
  );
  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        fullName: user?.fullName,
      },
      token,
    },
  });
});

export const loginWithOtp = catchAsync(async (req, res, next) => {
  const { phoneNumber = null, code = null } = req.body;
  if (!phoneNumber || !code) {
    return next(new HandleERROR("Phone number and Code are required", 400));
  }
  const user = await User.findOne({ phoneNumber });
  let newUser;
  const smsResult = await verifyCode(phoneNumber, code);
  if (!smsResult?.success) {
    return next(new HandleERROR(smsResult.message, 400));
  }
  if (user?._id) {
    newUser = user;
  } else {
    newUser = await User.create({ phoneNumber });
  }
  const token = jwt.sign(
    { id: newUser._id },
    process.env.JWT_SECRET
  );
  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: newUser._id,
        phoneNumber: newUser.phoneNumber,
        fullName: newUser?.fullName,
      },
      token,
    },
  });
});

export const resendCode = catchAsync(async (req, res, next) => {
  const { phoneNumber = null } = req.body;
  if (!phoneNumber) {
    return next(new HandleERROR("Phone number is required", 400));
  }
  const smsResult = await sendAuthCode(phoneNumber);
  if (!smsResult?.success) {
    return next(new HandleERROR(smsResult.message, 400));
  }
  return res.status(200).json({
    success: true,
    message: "SMS sent successfully",
  });
});
export const forgetPass = catchAsync(async (req, res, next) => {
  const { phoneNumber = null, password = null, code = null } = req.body;
  if (!phoneNumber || !password || !code) {
    return next(
      new HandleERROR("Phone number, password and code are required", 400)
    );
  }
  const passRegex=new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
  if (!passRegex.test(password)) {
    return next(
      new HandleERROR("Password must be at least 8 characters long and contain uppercase, lowercase letters and numbers", 400)
    );
  }
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    return next(new HandleERROR("User not found", 404));
  }
  const smsResult = await verifyCode(phoneNumber, code);
  if (!smsResult?.success) {
    return next(new HandleERROR(smsResult.message, 400));
  }
  user.password = bcryptjs.hashSync(password, 10);
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});
