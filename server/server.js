import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import exitHook from "async-exit-hook";
import { connectDB, closeDB } from "~/config/mongodb.js";
import { env } from "~/config/environment.js";
import routes from "~/routes/index.js";
import { errorHandler } from "~/middlewares/errorHandler.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

const PORT = env.APP_PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Thực hiện các tác vụ cleanup trước khi thoát server
exitHook(() => {
  closeDB();
});
