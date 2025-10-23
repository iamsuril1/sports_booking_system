// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import routes from "./routes.js";

dotenv.config();
await connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => res.send("Sports Booking API Running"));
app.use("/api", routes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
