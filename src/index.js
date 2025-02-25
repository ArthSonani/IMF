import dotenv from "dotenv";
import express  from "express";
import authRoutes from "./routes/authRoutes.js";
import gadgetRoutes  from "./routes/gadgetRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("heheheee!!!!!");
})

app.use("/auth", authRoutes);
app.use("/gadgets", gadgetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
