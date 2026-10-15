import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => res.json({ status: "ok" }));
// router.use("/auth", authRoutes);   <- added in later steps

export default router;