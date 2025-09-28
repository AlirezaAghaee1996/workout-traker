const IsAdmin = (req, res, next) => {
  if (req.role !== "admin" && req.role !== "superAdmin") {
    return res
      .status(403)
      .json({
        message: "you are not authorized to access this resource",
        success: false,
      });
  }
  next();
};

export default IsAdmin;
