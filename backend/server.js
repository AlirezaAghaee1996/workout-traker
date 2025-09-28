import app,{__dirname} from "./app.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config({path:`${__dirname}/config.env`})

mongoose.connect(process.env.DATA_BASE).then(() => {
  console.log("Database connected successfully");
}).catch((error) => {
  console.error("Database connection failed:", error);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});