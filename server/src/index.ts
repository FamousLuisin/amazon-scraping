import express from "express";
import route from "./routes/routes";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(route);
app.listen(port, () => console.log(`server running on port ${port}`));
