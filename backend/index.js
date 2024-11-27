import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utlis/db.js";
import userRoute from "./routes/user.route.js";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 4000;

// Connecting Database
connectDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// yha pr apni api <ayengi
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/post", postRoute);
// app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "I Am Coming from backend",
    success: true,
  });
});

app.listen(PORT, () => {
  // connectDb();
  console.log(`Server is Listening at Port:${PORT}`);
});
