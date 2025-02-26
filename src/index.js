import express  from "express";
import authRoutes from "./routes/authRoutes.js";
import gadgetRoutes  from "./routes/gadgetRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/gadgets", gadgetRoutes);

app.listen(3000, () => {
  console.log(`Server running on port ${PORT}`);
});
