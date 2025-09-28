import jwt from "jsonwebtoken";
const exportValidation = (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      req.userId = null;
    }
    const { id = null } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id;
  } catch (error) {
    req.userId = null;
  }
  next();
};

export default exportValidation;
