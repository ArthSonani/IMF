import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { getAllGadgets, addGadget, updateGadget, decommissionGadget, selfDestructGadget } from "../controllers/gadgetControllers.js";

const router = express.Router();

router.get("/", authenticate, getAllGadgets);
router.post("/", authenticate, authorize(["admin"]), addGadget);
router.patch("/:id", authenticate, authorize(["admin"]), updateGadget);
router.delete("/:id", authenticate, authorize(["admin"]), decommissionGadget);
router.post("/:id/self-destruct", authenticate, selfDestructGadget);

export default router;

