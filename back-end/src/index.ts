import express from "express";
import cors from "cors";
import Tasks from "./routes/tasks.js";
const PORT = process.env.PORT || 3001;
const api = express();

api.use(
  cors({
    origin: true,
  })
);

api.use(express.json());

api.use("/api/tasks", Tasks);

api.listen(PORT, () => {
  console.log("escuchando en el puerto " + PORT);
});
